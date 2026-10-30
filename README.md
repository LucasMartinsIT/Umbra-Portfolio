# UMBRA. Portfolio

[English](#english) · [Português](#português)

Interactive developer portfolio of **Lucas Martins**, with an art direction inspired by Persona 3 Reload.

![React](https://img.shields.io/badge/React_19-20232A?style=flat&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-0F172A?style=flat&logo=tailwindcss&logoColor=38BDF8)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=flat&logo=threedotjs&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=flat&logo=vitest&logoColor=white)

---

## English

### Features

- **3D Carousel:** low-poly models made in Blender, rendered with React Three Fiber. Includes a rigged capybara with Idle, Run, Jump and Slide animations and a hand-painted watermelon slice.
- **Dark Hour Mode:** an acid green theme with vignette, pulsing fog and green stage lighting. It turns on from the navbar, from 00:00 to 00:59 local time, or while the 3D Gallery is on screen.
- **Dialogue HUD:** a Persona-style welcome dialog with portrait, typewriter text and JRPG choices that start the music or keep the page silent.
- **Bilingual:** instant English and Brazilian Portuguese toggle, including resumes, dates and moon phases.
- **Live moon HUD:** the navbar calendar shows the real moon phase of the day.
- **Performance:** three.js is lazy-loaded when the gallery nears the viewport, and project media only loads near the screen.
- **Accessibility:** keyboard support, screen reader text and `prefers-reduced-motion` support.

### Stack

| Area | Technology |
| --- | --- |
| Framework | React 19, Vite |
| Styling | Tailwind CSS v4 |
| 3D | Three.js, React Three Fiber, Drei |
| Tests | Vitest, Testing Library |
| 3D pipeline | Blender 5.2 with Python export scripts |
| Hosting | Vercel |

### Running locally

Requires Node.js 20 or newer.

```bash
git clone https://github.com/LucasMartinsIT/Umbra-Portfolio.git
cd Umbra-Portfolio
npm install
npm run dev
```

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the development server |
| `npm run build` | Creates the production build in `dist/` |
| `npm run preview` | Serves the production build |
| `npm test` | Runs the test suite |
| `npm run lint` | Runs ESLint |

### Project structure

```text
public/          3D models, resumes, media and audio
scripts/blender/ GLB export and skinning verification scripts
src/components/  Page sections and interface
src/data/        Language-neutral data (links, models, projects)
src/i18n/        English and Portuguese dictionaries
src/theme/       Dark Hour logic
```

---

## Português

### Funcionalidades

- **Carrossel 3D:** modelos low-poly feitos no Blender e renderizados com React Three Fiber. Inclui uma capivara com rig e animações de parada, corrida, pulo e deslize, além de uma fatia de melancia pintada à mão.
- **Modo Dark Hour:** tema verde ácido com vinheta, névoa pulsante e iluminação verde no palco 3D. Liga pela navbar, das 00:00 às 00:59 no horário local, ou enquanto a Galeria 3D está na tela.
- **HUD de diálogo:** caixa de boas-vindas no estilo Persona, com retrato, texto digitado e escolhas de JRPG que iniciam a música ou mantêm o silêncio.
- **Bilíngue:** troca instantânea entre inglês e português do Brasil, incluindo currículos, datas e fases da lua.
- **HUD lunar real:** o calendário da navbar mostra a fase da lua do dia.
- **Desempenho:** o three.js só carrega quando a galeria se aproxima, e as mídias dos projetos só carregam perto da tela.
- **Acessibilidade:** suporte a teclado, texto para leitores de tela e respeito a `prefers-reduced-motion`.

### Stack

| Área | Tecnologia |
| --- | --- |
| Framework | React 19, Vite |
| Estilo | Tailwind CSS v4 |
| 3D | Three.js, React Three Fiber, Drei |
| Testes | Vitest, Testing Library |
| Pipeline 3D | Blender 5.2 com scripts de exportação em Python |
| Hospedagem | Vercel |

### Como rodar localmente

Requer Node.js 20 ou superior.

```bash
git clone https://github.com/LucasMartinsIT/Umbra-Portfolio.git
cd Umbra-Portfolio
npm install
npm run dev
```

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção em `dist/` |
| `npm run preview` | Serve o build de produção |
| `npm test` | Roda os testes |
| `npm run lint` | Roda o ESLint |

### Estrutura do projeto

```text
public/          Modelos 3D, currículos, mídias e áudio
scripts/blender/ Scripts de exportação de GLB e verificação de skinning
src/components/  Seções da página e interface
src/data/        Dados neutros de idioma (links, modelos, projetos)
src/i18n/        Dicionários em inglês e português
src/theme/       Lógica da Dark Hour
```

---

## Credits / Créditos

Fan-inspired art direction. Persona is a trademark of ATLUS/SEGA, and this project is not affiliated with them. "No More What Ifs" belongs to its rights holders. Code and 3D models by Lucas Martins.

Direção de arte inspirada por fã. Persona é marca da ATLUS/SEGA, e este projeto não tem vínculo com elas. "No More What Ifs" pertence aos seus detentores de direitos. Código e modelos 3D por Lucas Martins.
