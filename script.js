(function () {
  'use strict';

  mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    securityLevel: 'loose',
    flowchart: {
      useMaxWidth: true,
      htmlLabels: true,
      curve: 'basis'
    }
  });

  const cardsGrid = document.getElementById('cardsGrid');
  const resultsGrid = document.getElementById('resultsGrid');
  const resultsSection = document.getElementById('resultsSection');
  const noResults = document.getElementById('noResults');
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');
  const ideaModal = document.getElementById('ideaModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalClose = document.getElementById('modalClose');
  const modalTitle = document.getElementById('modalTitle');
  const modalOverview = document.getElementById('modalOverview');
  const modalResearch = document.getElementById('modalResearch');
  const modalSteps = document.getElementById('modalSteps');
  const modalFlowchart = document.getElementById('modalFlowchart');

  const isResultsPage = !!resultsGrid;

  const RECOMMEND_COUNT = 4;

  // Single source of ideas: local + optional API merge
  var allIdeas = (typeof PLIGHT_IDEAS !== 'undefined' && Array.isArray(PLIGHT_IDEAS)) ? PLIGHT_IDEAS.slice() : [];

  function mergeApiIdeas(apiIdeas) {
    if (!Array.isArray(apiIdeas)) return;
    var byId = {};
    allIdeas.forEach(function (idea) { byId[idea.id] = idea; });
    apiIdeas.forEach(function (idea) {
      if (idea && idea.id && idea.title) {
        byId[idea.id] = {
          id: idea.id,
          title: idea.title,
          keywords: idea.keywords || [],
          overview: idea.overview || '',
          steps: idea.steps || [],
          flowchart: idea.flowchart || '',
          research: idea.research || ''
        };
      }
    });
    allIdeas = Object.keys(byId).map(function (id) { return byId[id]; });
  }

  function refreshIdeasUI() {
    if (cardsGrid && !isResultsPage) {
      renderRecommendations();
      setupRecommendationsDots();
    }
    if (resultsGrid && isResultsPage) {
      var params = new URLSearchParams(window.location.search);
      var query = params.get('q') || '';
      renderResults(searchIdeas(query));
    }
  }

  function getRecommendations() {
    return allIdeas.slice(0, RECOMMEND_COUNT);
  }

  function searchIdeas(query) {
    if (!query || !query.trim()) return allIdeas;
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return allIdeas.filter(function (idea) {
      const searchable = [
        idea.title,
        idea.overview,
        idea.keywords ? idea.keywords.join(' ') : ''
      ].join(' ').toLowerCase();
      return terms.every(function (term) {
        return searchable.includes(term);
      });
    });
  }

  function renderCard(idea) {
    const card = document.createElement('a');
    card.href = '#';
    card.className = 'card';
    card.setAttribute('data-id', idea.id);
    card.innerHTML =
      '<h3 class="card-title">' + escapeHtml(idea.title) + '</h3>' +
      '<p class="card-preview">' + escapeHtml(idea.overview) + '</p>';
    card.addEventListener('click', function (e) {
      e.preventDefault();
      openIdea(idea);
    });
    return card;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function renderRecommendations() {
    cardsGrid.innerHTML = '';
    getRecommendations().forEach(function (idea) {
      cardsGrid.appendChild(renderCard(idea));
    });
  }

  function renderResults(ideas) {
    if (!resultsGrid) return;
    resultsGrid.innerHTML = '';
    if (noResults) noResults.classList.add('hidden');
    if (ideas.length === 0) {
      if (noResults) noResults.classList.remove('hidden');
      return;
    }
    ideas.forEach(function (idea) {
      resultsGrid.appendChild(renderCard(idea));
    });
  }

  function openIdea(idea) {
    modalTitle.textContent = idea.title;
    modalOverview.textContent = idea.overview;
    modalResearch.textContent = idea.research || '—';
    modalSteps.innerHTML = '';
    (idea.steps || []).forEach(function (step) {
      const li = document.createElement('li');
      li.textContent = step;
      modalSteps.appendChild(li);
    });

    modalFlowchart.innerHTML = '';
    if (idea.flowchart) {
      var chartId = 'flowchart-' + idea.id;
      mermaid.render(chartId, idea.flowchart).then(function (result) {
        var wrap = document.createElement('div');
        wrap.className = 'mermaid-wrap-inner';
        wrap.innerHTML = result.svg;
        modalFlowchart.appendChild(wrap);
        if (result.bindFunctions) result.bindFunctions(wrap);
      }).catch(function () {
        var fallback = document.createElement('p');
        fallback.className = 'text-muted';
        fallback.textContent = 'Flowchart could not be rendered.';
        modalFlowchart.appendChild(fallback);
      });
    }

    ideaModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  }

  function closeModal() {
    ideaModal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (ideaModal) {
    ideaModal.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });
  }

  if (searchForm) {
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var query = (searchInput && searchInput.value ? searchInput.value : '').trim();
      if (isResultsPage) {
        location.href = 'results.html?q=' + encodeURIComponent(query);
      } else {
        if (query) {
          location.href = 'results.html?q=' + encodeURIComponent(query);
        } else {
          location.href = 'results.html';
        }
      }
    });
  }

  if (isResultsPage) {
    var params = new URLSearchParams(window.location.search);
    var query = params.get('q') || '';
    if (searchInput) searchInput.value = query;
    renderResults(searchIdeas(query));
  } else if (cardsGrid) {
    renderRecommendations();
    setupRecommendationsDots();
    startRecommendationsAutoScroll();
  }

  if (typeof PLIGHT_IDEAS_API_URL !== 'undefined' && PLIGHT_IDEAS_API_URL) {
    fetch(PLIGHT_IDEAS_API_URL)
      .then(function (res) { return res.ok ? res.json() : Promise.reject(); })
      .then(function (apiIdeas) {
        mergeApiIdeas(apiIdeas);
        refreshIdeasUI();
      })
      .catch(function () {});
  }

  function setupRecommendationsDots() {
    var scroller = cardsGrid && cardsGrid.closest('.recommendations-scroller');
    var dotsContainer = document.getElementById('recommendationsDots');
    if (!scroller || !dotsContainer || !cardsGrid) return;
    var cards = cardsGrid.querySelectorAll('.card');
    dotsContainer.innerHTML = '';
    if (cards.length <= 1) return;
    for (var i = 0; i < cards.length; i++) {
      (function (index) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'recommendations-dot' + (index === 0 ? ' is-active' : '');
        dot.setAttribute('aria-label', 'Go to recommendation ' + (index + 1));
        dot.addEventListener('click', function () {
          var card = cards[index];
          if (card) {
            var left = card.offsetLeft - scroller.offsetLeft;
            scroller.scrollTo({ left: left, behavior: 'smooth' });
          }
        });
        dotsContainer.appendChild(dot);
      })(i);
    }
    function updateActiveDot() {
      var scrollLeft = scroller.scrollLeft;
      var dots = dotsContainer.querySelectorAll('.recommendations-dot');
      var maxScroll = scroller.scrollWidth - scroller.clientWidth;
      if (maxScroll <= 0) return;
      var activeIndex = 0;
      for (var j = 0; j < cards.length; j++) {
        var cardLeft = cards[j].offsetLeft - scroller.offsetLeft;
        if (scrollLeft >= cardLeft - 20) activeIndex = j;
      }
      dots.forEach(function (d, k) {
        d.classList.toggle('is-active', k === activeIndex);
      });
    }
    scroller.addEventListener('scroll', updateActiveDot);
    updateActiveDot();
  }

  function startRecommendationsAutoScroll() {
    var scroller = cardsGrid && cardsGrid.closest('.recommendations-scroller');
    if (!scroller) return;
    var step = 320;
    var interval = 3500;
    setTimeout(function run() {
      var maxScroll = scroller.scrollWidth - scroller.clientWidth;
      if (maxScroll <= 0) return;
      if (scroller.scrollLeft >= maxScroll - 10) {
        scroller.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scroller.scrollBy({ left: step, behavior: 'smooth' });
      }
      setTimeout(run, interval);
    }, 500);
  }
})();
