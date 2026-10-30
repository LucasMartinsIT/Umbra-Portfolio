# Project Context: Umbra-Portfolio

## 1. Overview & Goal
Personal developer portfolio for **Lucas Martins** (Computer Engineering student in his final year at UniFACENS, transitioning from IT Support/Customer Success to Junior Software/Backend/Game Developer).
- **Language:** The site is bilingual: English (default) and Brazilian Portuguese, switched in the navbar. All visible text lives in `src/i18n/en.js` and `src/i18n/pt.js`, which must keep the same structure (a test enforces it); `src/data/portfolio.js` holds only language-neutral data. Code comments stay in English.
- **Design Theme:** "UMBRA." branding with an art direction inspired by Persona 3 Reload: moonlit ocean blues, slanted UI, heavy condensed type. Colors and fonts are tokens in `src/index.css` (abyss, ocean, tide, aqua, mist, foam). Inspired only: never use Atlus logos or game art. The one exception is the soundtrack, added at Lucas's explicit request. Keep section titles plain and recruiter-friendly; game references stay in small kickers.
- **Dark Hour Mode:** Acid green theme (backgrounds `#040803`/`#081206`, surfaces `#0c1a0a`, borders `#1e4616`, glow `#26ff00`/`#39ff14`, secondary text `#73a968`) with a vignette and pulsing fog. It turns on from the navbar button, from 00:00 to 00:59 local time, or while the 3D Gallery is on screen; a manual choice always wins. The 3D stage switches to green lights (`stageLighting.js`). It is a `data-theme="dark-hour"` attribute on `<html>` that swaps tokens registered with `@property`, so colors transition smoothly. Palette changes go through tokens, never hard-coded colors.
- **Deployment Target:** Vercel.

## 2. Tech Stack & Environment Rules
- **Framework:** React (Vite)
- **Styling:** Tailwind CSS v4 via `@tailwindcss/vite`. 
  - *CRITICAL:* Do NOT create `tailwind.config.js` or `postcss.config.js`. Tailwind v4 is loaded via `@import "tailwindcss";` inside `src/index.css`.
- **3D Rendering:** `three`, `@react-three/fiber`, `@react-three/drei`.
- **Tests:** Vitest + Testing Library (`npm test`). New behavior ships with tests, written next to the code it covers.
- **Blender:** 5.2. Export scripts live in `scripts/blender/`.

## 3. Site Architecture (Single-Page / Smooth Scroll)
The layout in `src/App.jsx` is a single-page vertical scroll divided into 6 sections:

1. **Home (`#home`):** Hero section introducing Lucas Martins (Back-End Developer / Software Engineer) with the summary from his resume. Links to GitHub, LinkedIn, and CV download (the file follows the selected language). Atmosphere: pulsing moon glow, drifting particles and waves.
2. **Technical Skills (`#skills`):** Categorized showcase:
   - *Languages:* C++, C#, Python, JavaScript, TypeScript, SQL (Firebird/SQLite), HLSL, Java.
   - *Engines & Graphics:* OpenGL 3.3, Unity 6 (URP, Shader Graph, UI Toolkit, AR Foundation, Multiplayer), Three.js/R3F.
   - *Web & Tools:* React, Node.js, Tailwind CSS, Git, CMake, AWS (Cloud Practitioner), Linux/Windows Server.
   - *3D & Art:* Blender 5.2 (Low-poly modeling, Rigify rigging, sculpting), Substance Painter, Pixel Art.
3. **Professional Experience (`#experience`):** Timeline highlighting transferable engineering skills:
   - **IT Support Analyst @ DP Automação (Apr 2025 – Present):** Web development, infrastructure automation (PowerShell, Windows Firewall, Windows Defender), database administration (Firebird, IBExpert), Level 3 support.
   - **Customer Success @ Deeliv (Mar 2023 – Mar 2025):** Internal JavaScript tool development for the support team, client onboarding, technical training, customer base monitoring and retention analysis.
4. **Featured Projects (`#projects`):** Showcase cards with a 16:9 media header (zoom on hover, styled placeholder when a file is missing), tech tags and links:
   - **UmbraCore-Engine:** Custom 3D Game Engine built from scratch in C++ and OpenGL 3.3 (Undergraduate Thesis/TCC). Features GLTF loading, custom shaders, Bullet Physics, miniaudio, JSON scene serialization, and procedural dungeon generation (Golden Path random walks).
   - **Capybara Zoo Break:** 3D mobile endless runner in Unity 6 (URP) & C# with custom HLSL inverted-hull toon outline shaders, universal object pooling, procedural obstacles, and custom Blender assets.
   - **GastoJá Desktop:** Personal finance desktop app in Python, CustomTkinter, Matplotlib, and SQLite featuring an RPG-inspired HUD.
   - **Picscreen:** Ref & Palette Extractor browser extension, published on the Chrome Web Store.
   - **Gaia Protector:** Educational sustainability game that won 1st place in Facens Code, playable on Code.org.
   - **RocketBuilder-AR** and **Crossy Road Like:** Unity AR and mobile game projects.
   - Removed on purpose: Fiscal Audit Tools, Substation Semantic Vision, OpenGL Render Lab, Subway Runner, Cloud Infrastructure & Automation.
5. **3D Gallery (`#gallery-3d`):** 
   - **Core Feature:** An interactive 3D carousel built with `@react-three/fiber` and `@react-three/drei`.
   - **Behavior:** Displays low-poly 3D models and characters created by Lucas in Blender (`.glb`/`.gltf`). The active model continuously rotates on its vertical axis in the center of the canvas, with Left/Right navigation arrows allowing the user to cycle through different models, viewing model stats/descriptions. Rocket and Traffic Cone were removed on purpose.
6. **Academic Background (`#education`):**
   - **B.S. in Computer Engineering** @ Centro Universitário Facens (UniFACENS) – Feb 2022 to Present (Final Year).
   - **Highlight:** "Academic Merit Scholarship" recipient (1st place in the *Facens Code* programming competition before starting the degree, with the educational game Gaia Protector). Never state a percentage for the scholarship.
   - **Languages:** Portuguese (Native), English (Advanced).

## 4. Current State
- All 6 sections are implemented as components in `src/components/`, with their text in `src/i18n/` and neutral data in `src/data/portfolio.js`.
- The R3F carousel lives in `src/components/gallery/`. `ModelCanvas` is lazy-loaded so three.js only downloads when the gallery nears the viewport.
- GLBs in `public/models/` are exported from the `.blend` sources in `../LowPolyBlender` and `../GumRoadLowPoly`; each needs a matching entry in `MODELS`. Models without materials are left out until textured.
- `src/data/assets.test.js` reads every GLB and fails on missing textures, wrong stats, unknown animation clips or orphan files, so update `MODELS` together with any export.
- The resume in `public/cv/` is the source of truth for skills and languages, and GitHub READMEs back the project cards. The Professional Experience split between DP Automação and Deeliv was confirmed by Lucas and overrides any automatic PDF extraction: the internal JavaScript tool belongs to Deeliv.
- Never export a Rigify rig directly: the exporter tears constrained bones (the capybara's front legs). `export_capybara.py` bakes evaluated poses onto a flat skeleton and refits weights to 4 influences; run `verify_skinning.py` after any re-export. Layered Ucupaint paint must be baked first.
- Intro: `IntroSequence` must stay at or under 1.8s, skips on click and is disabled for reduced motion.
- Welcome dialog: `WelcomeDialog` is a Persona-style HUD with Lucas's portrait (`public/lucas-suit.png`), a "Lucas Martins / DEVELOPER" nameplate and two choices. Music (`public/ambient-jazz.mp3`, "No More What Ifs - Instrumental", volume 0.18, looped) starts only from the click on the first choice, because of browser autoplay policies.
- Contact: `+55 (15) 98178-2217`, with `tel:` and WhatsApp links in the footer and hero.
- Deploy: Vercel (`vercel.json`). GitHub: `LucasMartinsIT/Umbra-Portfolio`.
- Pending files from Lucas: `public/projects/capybara-zoo-break.gif`, `public/projects/gastoja-desktop.png` (listed in `PENDING_MEDIA` in `assets.test.js`; remove entries as they arrive).
