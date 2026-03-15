// Coding ideas: software / website / app — overview, coding steps, flowchart (Mermaid), research
//
// Optional API: set PLIGHT_IDEAS_API_URL to a URL that returns a JSON array of ideas.
// Each idea: { id, title, keywords[], overview, steps[], flowchart (Mermaid string), research }.
// API ideas are merged with local ideas (same id = overwrite). Leave undefined to use only local ideas.
// Example: const PLIGHT_IDEAS_API_URL = 'https://your-api.com/ideas';
const PLIGHT_IDEAS_API_URL = undefined;

const PLIGHT_IDEAS = [
  {
    id: 'task-management-app',
    title: 'Task management web app',
    keywords: ['task', 'todo', 'web app', 'productivity', 'CRUD', 'full-stack', 'React', 'Node'],
    overview: 'A full-stack web app where users create boards, add tasks with due dates and labels, and drag-and-drop between columns. Stack: React or Next.js frontend, Node/Express or FastAPI backend, PostgreSQL or SQLite, JWT auth.',
    steps: [
      'Set up project: create repo, backend (Node/Express or FastAPI), frontend (React/Next), and a simple DB (e.g. SQLite for dev).',
      'Define data model: User, Board, Task (title, status, dueDate, labels). Add migrations or schema scripts.',
      'Build REST API: CRUD for boards and tasks, nested routes (e.g. /boards/:id/tasks). Add validation (e.g. Zod/Joi).',
      'Implement auth: register/login endpoints, hash passwords (bcrypt), issue JWT. Protect API routes with middleware.',
      'Build frontend: list boards, board view with columns, add/edit/delete tasks, drag-and-drop (e.g. dnd-kit or react-beautiful-dnd).',
      'Connect frontend to API (fetch or axios), store token, handle refresh. Deploy backend and frontend (e.g. Vercel + Railway).'
    ],
    flowchart: `flowchart LR
    A[Setup project] --> B[Data model & DB]
    B --> C[REST API]
    C --> D[Auth middleware]
    D --> E[Frontend UI]
    E --> F[Deploy]`,
    research: 'Research: REST API design, JWT auth best practices, React state management patterns.'
  },
  {
    id: 'expense-tracker-app',
    title: 'Expense tracker app',
    keywords: ['expense', 'budget', 'app', 'finance', 'charts', 'mobile', 'web'],
    overview: 'An app (web or mobile) to log income and expenses by category, view monthly summaries, and see simple charts. Tech: React or React Native frontend, Node or serverless API, SQL or Firebase.',
    steps: [
      'Initialize app: React (Vite) or React Native, choose backend (Node + DB or Firebase/Supabase).',
      'Define schema: User, Transaction (amount, type, category, date, note). Categories as enum or table.',
      'Build API: add transaction, list with filters (date range, category), aggregate by month/category.',
      'Build UI: form to add transaction, list with filters, summary cards (total income, expense, balance).',
      'Add charts: use Chart.js or Recharts to show spending by category and trend over time.',
      'Add auth (email/password or OAuth), then deploy (Vercel/Netlify for web, Expo for mobile).'
    ],
    flowchart: `flowchart TB
    A[Setup app & DB] --> B[Transaction API]
    B --> C[Auth]
    C --> D[UI: list & form]
    D --> E[Charts & summary]
    E --> F[Deploy]`,
    research: 'Research: Personal finance UX, chart libraries comparison, serverless vs traditional backend.'
  },
  {
    id: 'blog-cms-website',
    title: 'Blog / CMS website',
    keywords: ['blog', 'CMS', 'website', 'content', 'markdown', 'admin', 'full-stack'],
    overview: 'A content-driven website with a public blog and an admin panel to create and edit posts (e.g. Markdown). Stack: Next.js or Nuxt for SSR, headless CMS or custom admin API, PostgreSQL or file-based content.',
    steps: [
      'Scaffold project: Next.js (or Nuxt) with app router, set up Tailwind or similar for styling.',
      'Design content model: Post (title, slug, body markdown, publishedAt, author). Optional: Category, Tag.',
      'Build admin API: create/update/delete posts, upload images. Restrict to authenticated admin (e.g. simple password or OAuth).',
      'Build public API/pages: get post by slug, list posts with pagination. Use getStaticProps or server components for SSG/SSR.',
      'Build admin UI: list posts, editor (textarea or rich editor) for markdown, preview, publish toggle.',
      'Add markdown rendering (e.g. remark/rehype), SEO meta tags, then deploy (Vercel/Netlify).'
    ],
    flowchart: `flowchart LR
    A[Setup Next/Nuxt] --> B[Content model]
    B --> C[Admin API]
    C --> D[Public pages]
    D --> E[Admin editor UI]
    E --> F[Deploy]`,
    research: 'Research: Headless CMS patterns, Markdown parsing, SSG/SSR trade-offs.'
  },
  {
    id: 'realtime-chat-app',
    title: 'Real-time chat app',
    keywords: ['chat', 'realtime', 'WebSocket', 'messaging', 'app', 'Node', 'React'],
    overview: 'A real-time chat app with rooms and direct messages. Backend: Node + Socket.io (or similar), frontend: React with Socket.io client. Optional: message persistence in Redis or PostgreSQL.',
    steps: [
      'Set up Node server with Socket.io. Define events: join_room, leave_room, send_message, typing_start, typing_stop.',
      'Implement room logic: create/join room by ID or name, broadcast messages to room, store recent messages in memory or DB.',
      'Add simple auth: pass user id/name on connect (e.g. JWT in handshake). Map socket id to user in server state.',
      'Build React app: room list, current room view, message list (auto-scroll), input with send and optional typing indicator.',
      'Connect React to Socket.io: emit join/send/typing, listen for new messages and typing, update UI state (useState or store).',
      'Optional: persist messages in DB and load history on join. Deploy server (Railway/Fly) and frontend (Vercel).'
    ],
    flowchart: `flowchart TB
    A[Socket.io server] --> B[Room & events]
    B --> C[Auth handshake]
    C --> D[Message persistence]
    D --> E[React client]
    E --> F[Deploy]`,
    research: 'Research: WebSocket vs Socket.io, real-time patterns, scaling chat backends.'
  },
  {
    id: 'recipe-finder-app',
    title: 'Recipe finder app',
    keywords: ['recipe', 'food', 'search', 'app', 'API', 'website', 'React'],
    overview: 'A web app to search recipes by ingredients or name, display results with images and steps, and save favorites. Use a public recipe API (e.g. Spoonacular/Edamam) or scrape/custom DB.',
    steps: [
      'Set up frontend (React/Vite) and optional backend (Node) to proxy API calls and hide API key.',
      'Integrate recipe API: search by query/ingredients, get recipe by ID. Handle rate limits and errors.',
      'Design UI: search bar, filters (cuisine, diet), results grid with image, title, short description.',
      'Build recipe detail page: ingredients list, instructions, image. Add “save to favorites” (localStorage or backend).',
      'Implement favorites: store IDs in backend or localStorage, show favorites list and remove option.',
      'Add responsive layout and loading states. Deploy frontend (and backend if used).'
    ],
    flowchart: `flowchart LR
    A[Setup & API proxy] --> B[Search API]
    B --> C[Results UI]
    C --> D[Detail page]
    D --> E[Favorites]
    E --> F[Deploy]`,
    research: 'Research: Third-party API integration, recipe API comparison, UX for search results.'
  },
  {
    id: 'weather-dashboard',
    title: 'Weather dashboard website',
    keywords: ['weather', 'dashboard', 'API', 'website', 'charts', 'forecast'],
    overview: 'A dashboard that shows current weather and forecast for a city (search or geolocation), with charts for temperature and conditions. Frontend fetches from OpenWeatherMap or similar API.',
    steps: [
      'Create React/Vite app. Get API key from OpenWeatherMap (or similar); use backend proxy or env var to hide key in production.',
      'Implement API calls: current weather by city/coordinates, 5-day or hourly forecast. Parse and type response data.',
      'Build search: input for city name, debounce, call geocoding then weather API. Optional: use browser geolocation for “current location”.',
      'Design dashboard: current conditions card (temp, icon, description), forecast list or chart (e.g. Recharts) for next days.',
      'Add loading and error states, optional caching (e.g. cache in state for 10 min). Style with CSS or Tailwind.',
      'Deploy to Vercel/Netlify; ensure API key is in env and proxy is used if needed.'
    ],
    flowchart: `flowchart TB
    A[Setup & API key] --> B[Weather API calls]
    B --> C[Search / geolocation]
    C --> D[Dashboard UI]
    D --> E[Charts & cache]
    E --> F[Deploy]`,
    research: 'Research: Weather API comparison, dashboard UX, front-end caching strategies.'
  },
  {
    id: 'portfolio-website-builder',
    title: 'Portfolio website builder',
    keywords: ['portfolio', 'builder', 'website', 'templates', 'static', 'generator'],
    overview: 'A simple tool where users pick a template, fill in content (bio, projects, links), and export a static site or get a hosted URL. Stack: React for editor, static HTML/CSS export or serverless deploy.',
    steps: [
      'Define 2–3 portfolio templates: single HTML/CSS files or React components with placeholder content (name, bio, projects array, links).',
      'Build editor UI: form fields for name, bio, project titles/descriptions/URLs, social links. Map fields to template props.',
      'Implement preview: render selected template with current form data in an iframe or separate route. Update on change (debounced).',
      'Add export: generate static HTML/CSS from template + data (e.g. ReactDOMServer or custom string replacement). Offer download as ZIP.',
      'Optional: add simple backend to save projects and deploy to Vercel/Netlify via API (serverless function that runs deploy).',
      'Polish: template selector, responsive preview, basic validation. Deploy builder app (static or serverless).'
    ],
    flowchart: `flowchart LR
    A[Templates] --> B[Editor form]
    B --> C[Preview]
    C --> D[Export static]
    D --> E[Optional deploy API]
    E --> F[Deploy builder]`,
    research: 'Research: Static site generation, resume/portfolio UX, deploy APIs (Vercel/Netlify).'
  },
  {
    id: 'api-dashboard-dev-tools',
    title: 'API dashboard / dev tools',
    keywords: ['API', 'dashboard', 'dev tools', 'testing', 'REST', 'Postman', 'website'],
    overview: 'A web-based tool to send HTTP requests (GET, POST, etc.), set headers and body, view response (status, headers, body with syntax highlight). Optional: save request collections and env variables.',
    steps: [
      'Set up React app. Build request form: method dropdown, URL input, headers (key-value list), body (raw JSON/text).',
      'Implement request execution: use fetch or axios from backend (to avoid CORS) or allow CORS for demo. Display loading state.',
      'Build response panel: status code, response headers table, body with syntax highlighting (e.g. Prism or highlight.js). Handle large responses (truncate or virtualize).',
      'Add history: store last N requests in localStorage, show list and allow replay. Optional: backend to save collections per user.',
      'Optional: environment variables (base URL, API key) with substitution in URL/headers. Add simple auth if saving to backend.',
      'Deploy; if calling APIs from browser, document CORS. If using proxy backend, deploy backend as well.'
    ],
    flowchart: `flowchart TB
    A[Request form UI] --> B[Send request]
    B --> C[Response viewer]
    C --> D[History / collections]
    D --> E[Env variables]
    E --> F[Deploy]`,
    research: 'Research: REST client design (Postman/Insomnia), CORS, syntax highlighting libraries.'
  },
  {
    id: 'url-shortener',
    title: 'URL shortener',
    keywords: ['URL', 'shortener', 'link', 'redirect', 'API', 'full-stack', 'Node'],
    overview: 'A service that shortens long URLs to a short code and redirects visitors to the original URL. Stack: Node/Express or FastAPI, SQL or Redis for code→URL mapping, optional analytics.',
    steps: [
      'Set up backend: Node/Express or FastAPI. Define route POST /shorten (body: longUrl) and GET /:code (redirect).',
      'Create data model: ShortLink (code, longUrl, createdAt). Generate short code (nanoid or base62 of id). Ensure code is unique.',
      'Implement POST /shorten: validate URL, generate code, save to DB, return short URL (e.g. https://yoursite.com/abc12).',
      'Implement GET /:code: look up longUrl, redirect with 302. If not found, 404. Optional: count visits and store in DB.',
      'Build minimal frontend: input for long URL, button to shorten, display short link and copy button. Call API with fetch.',
      'Deploy backend and frontend. Optional: custom domains, expiry, API key for programmatic use.'
    ],
    flowchart: `flowchart LR
    A[POST /shorten] --> B[Generate code]
    B --> C[Save to DB]
    C --> D[Return short URL]
    E[GET /:code] --> F[Lookup DB]
    F --> G[302 redirect]`,
    research: 'Research: Short URL algorithms, redirect best practices, analytics without cookies.'
  },
  {
    id: 'pomodoro-timer-app',
    title: 'Pomodoro timer app',
    keywords: ['pomodoro', 'timer', 'productivity', 'app', 'web', 'React'],
    overview: 'A web or mobile app that runs 25-min work and 5-min break intervals, with optional task labels and session history. Tech: React or React Native, localStorage or backend for history.',
    steps: [
      'Create React app (Vite). Build timer UI: display MM:SS, Start/Pause/Reset, and optional task name input.',
      'Implement timer logic: use setInterval or requestAnimationFrame to decrement seconds. State: remaining seconds, isRunning, phase (work/break).',
      'Add phases: 25 min work, 5 min short break, after 4 work sessions 15 min long break. Switch phase automatically when timer hits 0.',
      'Optional: persist sessions (start time, duration, task) in localStorage or send to backend. Show simple history list or stats.',
      'Add sound or notification when timer ends (e.g. Web Audio or browser Notification API). Style with CSS or Tailwind.',
      'Deploy (Vercel/Netlify). Optional: PWA for install and offline.'
    ],
    flowchart: `flowchart TB
    A[Timer UI] --> B[Countdown logic]
    B --> C[Phase: work/break]
    C --> D[Auto switch phase]
    D --> E[Optional history]
    E --> F[Deploy]`,
    research: 'Research: Pomodoro technique, Web Notifications, PWA for timers.'
  },
  {
    id: 'bookmark-manager',
    title: 'Bookmark manager',
    keywords: ['bookmark', 'save', 'links', 'manager', 'web app', 'full-stack'],
    overview: 'A web app to save, tag, and search bookmarks. Users add URL, title, and tags; list and filter by tag. Stack: React frontend, Node or serverless API, PostgreSQL or SQLite.',
    steps: [
      'Set up project: React frontend, backend (Node/Express or serverless). DB: Bookmark (url, title, tags[], userId), User if multi-user.',
      'Build API: POST /bookmarks (add), GET /bookmarks (list with ?tag=), PATCH/DELETE by id. Optional: fetch page title/metadata on add.',
      'Implement auth if multi-user: JWT, protect routes. Single-user can skip auth and use localStorage for bookmarks.',
      'Build UI: form (URL, title, tags), list of bookmarks with edit/delete. Filter by tag (buttons or dropdown). Search by title/URL.',
      'Optional: import/export (JSON or HTML bookmarks). Open link in new tab, show favicon if available.',
      'Deploy frontend and backend.'
    ],
    flowchart: `flowchart LR
    A[Setup & DB] --> B[Bookmark API]
    B --> C[Auth optional]
    C --> D[Add/list UI]
    D --> E[Filter & search]
    E --> F[Deploy]`,
    research: 'Research: Bookmark metadata fetching, tag-based filtering UX.'
  },
  {
    id: 'habit-tracker-app',
    title: 'Habit tracker app',
    keywords: ['habit', 'tracker', 'streak', 'app', 'mobile', 'web', 'React'],
    overview: 'An app to define habits and log daily completion, with streak counts and simple charts. Tech: React or React Native, backend or localStorage, optional push reminders.',
    steps: [
      'Set up app: React (Vite) or React Native. Data: Habit (name, goal e.g. daily), Log (habitId, date, done).',
      'Build data layer: add habit, log completion for today, list habits with current streak. Store in localStorage or API + DB.',
      'Implement streak logic: for each habit, compute current streak (consecutive days up to today) and longest streak.',
      'Build UI: list habits with checkmark for today, calendar or history view. Show streak number and optional simple chart (e.g. last 7 days).',
      'Optional: reminders (browser Notification or push). Optional: goals (e.g. 3x per week) and progress.',
      'Deploy; optional PWA or Expo for mobile.'
    ],
    flowchart: `flowchart TB
    A[Setup & data] --> B[Log completion]
    B --> C[Streak logic]
    C --> D[UI: list & calendar]
    D --> E[Charts & reminders]
    E --> F[Deploy]`,
    research: 'Research: Habit formation UX, streak algorithms, reminder APIs.'
  },
  {
    id: 'quiz-app',
    title: 'Quiz app',
    keywords: ['quiz', 'trivia', 'app', 'questions', 'API', 'React', 'web'],
    overview: 'A quiz app that fetches questions from an API (e.g. Open Trivia), shows one question at a time, and displays score at the end. Good for learning React state and API integration.',
    steps: [
      'Set up React app. Find a quiz API (e.g. Open Trivia DB) and document endpoint (e.g. amount, category, difficulty).',
      'Fetch questions on start: call API, store array of questions (question text, correct answer, incorrect answers). Shuffle options per question.',
      'Build quiz flow: state (current index, score, answers). Show one question, 4 options (or true/false). On click, record answer and move to next.',
      'At end of quiz: show total score (e.g. 5/10) and optional “Play again”. Optionally persist high scores in localStorage.',
      'Add loading and error states. Optional: category selector before starting. Style for clarity and accessibility.',
      'Deploy to Vercel/Netlify.'
    ],
    flowchart: `flowchart LR
    A[Fetch questions API] --> B[Quiz state]
    B --> C[Show question]
    C --> D[Record answer]
    D --> E[Score & replay]
    E --> F[Deploy]`,
    research: 'Research: Open Trivia DB API, quiz UX patterns, accessibility for forms.'
  },
  {
    id: 'notes-app',
    title: 'Notes app',
    keywords: ['notes', 'markdown', 'app', 'editor', 'web', 'full-stack'],
    overview: 'A simple notes app: create, edit, and delete notes with optional Markdown. List notes in sidebar; main area for editor. Stack: React, optional Node backend + DB or localStorage.',
    steps: [
      'Set up React app. Data: Note (id, title, body, updatedAt). Start with localStorage; later add API and DB.',
      'Build layout: sidebar with note list (title + date), main area with title input and body textarea or Markdown editor.',
      'Implement CRUD: create new note, select note to edit, auto-save on change (debounce), delete note. Update list on change.',
      'Optional: Markdown preview (e.g. marked or react-markdown). Optional: search in title/body.',
      'If backend: sync to server on save, load list from API. Conflict handling: last-write-wins or show conflict UI.',
      'Deploy; optional PWA for offline.'
    ],
    flowchart: `flowchart TB
    A[Data model] --> B[Sidebar list]
    B --> C[Editor]
    C --> D[Auto-save]
    D --> E[Optional sync]
    E --> F[Deploy]`,
    research: 'Research: Rich text vs Markdown, debounced save, offline-first sync.'
  },
  {
    id: 'link-in-bio-page',
    title: 'Link-in-bio page',
    keywords: ['link', 'bio', 'social', 'landing', 'website', 'React'],
    overview: 'A single page that lists a user’s links (social, shop, etc.) with optional theme and analytics. Stack: React or plain HTML/CSS, optional backend to edit links and track clicks.',
    steps: [
      'Create single-page layout: header (name, avatar, bio), list of link cards (title, URL, optional icon). Style with CSS or Tailwind.',
      'Data: links array (title, url, order). Start static in code; later move to JSON file or backend.',
      'Build link cards: clickable blocks that open URL in new tab. Optional: track click (backend endpoint or analytics).',
      'Optional backend: CRUD for links, auth for one user. Store in DB; serve JSON for GET and render same page with fetched links.',
      'Optional: theme (colors, fonts) selector and save in backend or localStorage. Responsive and fast load.',
      'Deploy (static on Vercel/Netlify, or with small backend).'
    ],
    flowchart: `flowchart LR
    A[Layout & style] --> B[Links data]
    B --> C[Link cards]
    C --> D[Optional backend]
    D --> E[Theme & analytics]
    E --> F[Deploy]`,
    research: 'Research: Link-in-bio UX, click tracking privacy, static vs dynamic.'
  },
  {
    id: 'password-manager-lite',
    title: 'Password manager (lite)',
    keywords: ['password', 'manager', 'vault', 'encrypt', 'app', 'security'],
    overview: 'A simple encrypted vault to store site + username + password. One master password; data encrypted in browser or on server. Educational project; use established tools in production.',
    steps: [
      'Define data: Entry (site, username, password). Store as encrypted JSON. Use Web Crypto API (AES-GCM) with key derived from master password (PBKDF2).',
      'Build unlock flow: user enters master password, derive key, try to decrypt stored blob. If fail, show error. If success, load entries into memory.',
      'Build UI: list entries (masked password), add/edit/delete. Never log or send plaintext passwords. Copy-to-clipboard for password.',
      'Persistence: encrypted blob in localStorage or backend. On save, encrypt current entries with derived key and store.',
      'Optional: auto-lock after idle, optional 2FA. Emphasize in README: for learning only; recommend Bitwarden/1Password for real use.',
      'Deploy as static or with minimal backend for blob storage.'
    ],
    flowchart: `flowchart TB
    A[Master password] --> B[Derive key]
    B --> C[Decrypt blob]
    C --> D[CRUD entries]
    D --> E[Encrypt & save]
    E --> F[Deploy]`,
    research: 'Research: Web Crypto API, PBKDF2 and AES-GCM, password manager security.'
  },
  {
    id: 'movie-search-app',
    title: 'Movie search app',
    keywords: ['movie', 'film', 'search', 'API', 'React', 'website', 'TMDB'],
    overview: 'Search movies by title, see details and cast. Uses a movie API (e.g. TMDB). Good for practicing API integration, search, and responsive cards.',
    steps: [
      'Get API key from TMDB (or similar). Set up React app; proxy API through backend or use env var for key in serverless.',
      'Implement search: GET search/movie?query=... Debounce input, show loading, display results as cards (poster, title, year).',
      'Build movie detail: GET movie/:id for overview, release date, rating. Optional: GET credits for cast. Dedicated route or modal.',
      'Design UI: search bar, grid of result cards, detail view. Handle no results and API errors.',
      'Optional: favorites (localStorage or backend), “trending” or “now playing” list from API.',
      'Deploy; keep API key server-side or in env.'
    ],
    flowchart: `flowchart LR
    A[API key & proxy] --> B[Search API]
    B --> C[Results grid]
    C --> D[Detail API]
    D --> E[Favorites optional]
    E --> F[Deploy]`,
    research: 'Research: TMDB API, debounced search, responsive card grids.'
  },
  {
    id: 'countdown-event-app',
    title: 'Countdown to event app',
    keywords: ['countdown', 'event', 'date', 'app', 'web', 'React'],
    overview: 'A simple app where users set a target date (e.g. wedding, launch) and see a live countdown (days, hours, minutes, seconds). Optional: multiple events and themes.',
    steps: [
      'Create React app. State: target date (Date or ISO string). Input for date (and optional time); store in state or localStorage.',
      'Implement countdown: compute diff between now and target every second (setInterval). Format as days, hours, minutes, seconds. Handle past date (show “Event passed” or zero).',
      'Build UI: date picker or inputs, large countdown display. Optional: multiple events in list, select one to show.',
      'Optional: theme (background, font) and shareable URL (e.g. ?date=2025-12-31).',
      'Ensure timezone handling is clear (UTC or local). Deploy as static site.'
    ],
    flowchart: `flowchart LR
    A[Target date input] --> B[Countdown calc]
    B --> C[Update every second]
    C --> D[Display D/H/M/S]
    D --> E[Optional multi-event]
    E --> F[Deploy]`,
    research: 'Research: Date/time in JavaScript, timezone handling, countdown UX.'
  },
  // ——— Previous innovation ideas (hardware / physical) ———
  {
    id: 'solar-water-purifier',
    title: 'Solar-powered water purifier',
    keywords: ['solar', 'water', 'purifier', 'clean', 'sustainability', 'UV', 'filtration'],
    overview: 'A portable device that uses solar energy to purify water through UV sterilization and basic filtration, suitable for off-grid and emergency use. Backed by research on solar disinfection (SODIS) and low-cost filtration.',
    steps: [
      'Design a compact chamber with UV-transparent material and a small solar panel.',
      'Integrate a pre-filter (e.g., activated carbon or cloth) to remove sediments and large particles.',
      'Add a UV-C LED or solar-concentrated UV exposure zone with sufficient dwell time.',
      'Include a simple flow control and collection outlet; test with contaminated water samples.',
      'Validate microbial kill rates and document performance in different light conditions.'
    ],
    flowchart: `flowchart LR
    A[Water input] --> B[Pre-filter]
    B --> C[UV chamber]
    C --> D[Collection]
    subgraph Solar
      E[Solar panel] --> F[UV LED / exposure]
    end
    F --> C`,
    research: 'Research: "Solar water disinfection" (SODIS), WHO guidelines; UV water treatment papers.'
  },
  {
    id: 'smart-crop-monitor',
    title: 'Smart crop health monitor',
    keywords: ['crop', 'agriculture', 'IoT', 'sensor', 'monitoring', 'farm', 'plant', 'health'],
    overview: 'An IoT-based system that uses soil moisture, temperature, and simple image or NDVI-style sensors to monitor crop health and suggest irrigation or pest alerts. Tied to precision agriculture and remote sensing research.',
    steps: [
      'Select low-cost sensors: soil moisture, temperature, humidity, optional camera or multispectral.',
      'Set up a microcontroller (e.g., ESP32) with WiFi and a simple dashboard or mobile app.',
      'Define thresholds and rules for irrigation and anomaly alerts from literature or trials.',
      'Deploy nodes in the field with solar or battery power and weatherproof enclosures.',
      'Compare readings with ground truth and refine models; link to research on precision ag.'
    ],
    flowchart: `flowchart TB
    A[Sensors in field] --> B[Microcontroller]
    B --> C[Cloud / Local server]
    C --> D[Analytics & rules]
    D --> E[Alerts & dashboard]
    E --> F[Farmer action]`,
    research: 'Research: Precision agriculture, IoT in farming, remote sensing for crop stress.'
  },
  {
    id: 'plastic-to-fuel',
    title: 'Plastic waste to fuel (pyrolysis)',
    keywords: ['plastic', 'recycling', 'fuel', 'pyrolysis', 'waste', 'energy', 'sustainability'],
    overview: 'A small-scale pyrolysis unit that converts certain plastic wastes into liquid fuel or feedstock, reducing plastic pollution and recovering energy. Supported by pyrolysis and waste-to-energy research.',
    steps: [
      'Design a sealed reactor that can reach 400–500°C safely, with temperature control.',
      'Add a condenser to capture vapors as liquid fuel; separate non-condensables for flaring or reuse.',
      'Define feed stock (e.g., PE, PP) and exclude PVC and mixed plastics in early versions.',
      'Implement safety: pressure release, inert atmosphere, and proper ventilation.',
      'Test output quality and compare with literature; document emissions and efficiency.'
    ],
    flowchart: `flowchart LR
    A[Plastic feed] --> B[Reactor]
    B --> C[Vapors]
    C --> D[Condenser]
    D --> E[Liquid fuel]
    B --> F[Char residue]`,
    research: 'Research: Plastic pyrolysis, waste-to-fuel, catalytic pyrolysis papers.'
  },
  {
    id: 'wearable-stress-monitor',
    title: 'Wearable stress & wellness monitor',
    keywords: ['wearable', 'stress', 'health', 'HRV', 'heart rate', 'wellness', 'monitoring'],
    overview: 'A wearable that estimates stress and recovery using heart rate variability (HRV) and activity, with a simple app that suggests breaks or breathing exercises. Aligned with psychophysiology and HRV research.',
    steps: [
      'Use a PPG-based heart rate sensor (e.g., wrist or chest) with sufficient sampling rate for HRV.',
      'Compute time-domain or frequency-domain HRV indices (e.g., RMSSD, LF/HF) in firmware or app.',
      'Correlate with activity and sleep if available; define stress vs. recovery states from literature.',
      'Build a minimal app with notifications for "stress high" and optional guided breathing.',
      'Validate against gold-standard ECG/HRV in a small study and cite research benchmarks.'
    ],
    flowchart: `flowchart TB
    A[Wearable sensor] --> B[HR/HRV computation]
    B --> C[Stress index]
    C --> D[App logic]
    D --> E[Notifications / suggestions]`,
    research: 'Research: HRV and stress, wearable health, psychophysiological monitoring.'
  },
  {
    id: 'low-cost-prosthetic-hand',
    title: 'Low-cost 3D-printed prosthetic hand',
    keywords: ['prosthetic', '3D print', 'accessibility', 'hand', 'assistive', 'low cost'],
    overview: 'An open-source, 3D-printed mechanical or body-powered prosthetic hand that can be customized and produced at low cost for underserved regions. Linked to assistive technology and open-source prosthesis research.',
    steps: [
      'Choose or adapt an open-source design (e.g., e-NABLE style) for printability and strength.',
      'Select durable, low-cost filament and print settings; add optional cable-driven or simple myoelectric input.',
      'Design sizing and fitting process (measurements, printable sizes) for different users.',
      'Conduct fit and function tests with users or proxies; document grip types and limitations.',
      'Publish build guide and link to research on outcomes and accessibility.'
    ],
    flowchart: `flowchart LR
    A[Measure & size] --> B[3D model]
    B --> C[Print parts]
    C --> D[Assembly]
    D --> E[Fitting & training]`,
    research: 'Research: Open-source prosthetics, e-NABLE, assistive device outcomes.'
  },
  {
    id: 'air-quality-tracker',
    title: 'Personal air quality tracker',
    keywords: ['air quality', 'PM2.5', 'pollution', 'sensor', 'health', 'indoor', 'tracker'],
    overview: 'A portable or home device that measures PM2.5, CO2, and optionally VOCs, with an app that logs exposure and suggests ventilation or avoidance. Based on indoor air quality and exposure research.',
    steps: [
      'Integrate PM2.5 (e.g., laser or optical) and CO2 (NDIR) sensors with a microcontroller.',
      'Add WiFi/BLE and send data to a phone or cloud for logging and simple calibration.',
      'Display real-time AQI-style index and historical trends in a minimal app.',
      'Implement basic recommendations (open window, reduce sources) from guidelines.',
      'Compare with reference instruments and cite WHO or EPA standards in documentation.'
    ],
    flowchart: `flowchart TB
    A[PM2.5 / CO2 sensors] --> B[MCU]
    B --> C[App / Cloud]
    C --> D[AQI & history]
    D --> E[Recommendations]`,
    research: 'Research: Indoor air quality, PM2.5 health effects, sensor calibration studies.'
  },
  {
    id: 'bike-powered-charger',
    title: 'Bike-powered phone & device charger',
    keywords: ['bike', 'charger', 'human power', 'energy', 'sustainability', 'pedal'],
    overview: 'A dynamo or generator attached to a bicycle that charges a power bank or phone while riding, promoting green energy and utility for cyclists. Supported by human-powered energy and small-scale generation research.',
    steps: [
      'Select or build a hub dynamo or friction-based generator with suitable voltage/current output.',
      'Add a rectifier and voltage regulator to get stable 5V USB or battery-charging profile.',
      'Include a small buffer battery or supercap for when the bike is stopped.',
      'Mount securely on the frame; ensure waterproofing and safe wiring.',
      'Measure efficiency and usability; reference human power output literature.'
    ],
    flowchart: `flowchart LR
    A[Pedal] --> B[Generator]
    B --> C[Rectifier / regulator]
    C --> D[Buffer battery]
    D --> E[USB out]`,
    research: 'Research: Human-powered generation, bicycle dynamos, small-scale renewables.'
  },
  {
    id: 'food-waste-composter',
    title: 'Smart indoor food waste composter',
    keywords: ['compost', 'food waste', 'indoor', 'smart', 'sustainability', 'recycling'],
    overview: 'An indoor composter with temperature and moisture sensors that optimizes decomposition and reduces odor through aeration and simple biofilter design. Aligned with composting science and odor control research.',
    steps: [
      'Design a sealed bin with aeration (fan or manual mix) and optional heating for faster breakdown.',
      'Add moisture and temperature sensors; use rules from composting literature for ideal ranges.',
      'Implement a simple biofilter (e.g., wood chips, activated carbon) on the exhaust to reduce odor.',
      'Provide a mobile or LED feedback for "add browns," "mix," or "ready" based on sensor data.',
      'Test with typical kitchen waste and compare maturity and emissions with published data.'
    ],
    flowchart: `flowchart TB
    A[Food waste in] --> B[Bin + sensors]
    B --> C[Control: aeration / heat]
    C --> B
    B --> D[Biofilter]
    D --> E[Odor-free exhaust]`,
    research: 'Research: Composting parameters, indoor composting, odor control in biowaste.'
  }
];
