// Language-neutral data only. Every visible text lives in src/i18n.
const GITHUB_URL = 'https://github.com/LucasMartinsIT';

export const LINKS = {
  github: GITHUB_URL,
  linkedin: 'https://www.linkedin.com/in/lucas-martins0/',
  email: 'lucasmartinsti@outlook.com',
  phoneDisplay: '+55 (15) 98178-2217',
  phone: 'tel:+5515981782217',
  whatsapp: 'https://wa.me/5515981782217',
  gaiaProtector: 'https://studio.code.org/br/projects/gamelab/2ggTnZD1Aj1UBwBvhZa1enfWuzynoggYwK8p1efP8aI',
  picscreenStore:
    'https://chromewebstore.google.com/detail/picscreen-ref-palette-ext/khhbokhoiaahdhbjlaegafmcjndlhblo?hl=pt-BR',
};

export const RESUMES = {
  en: {
    backend: '/cv/Lucas_Martins_CV_Backend_Developer.pdf',
    game: '/cv/Lucas_Martins_CV_Game_Programmer.pdf',
  },
  pt: {
    backend: '/cv/Lucas_Martins_Curriculo_Desenvolvedor_Backend.pdf',
    game: '/cv/Lucas_Martins_Curriculo_Game_Programmer.pdf',
  },
};

export const SECTION_IDS = ['home', 'skills', 'experience', 'projects', 'gallery-3d', 'education'];

const repository = (name) => ({ labelKey: 'github', url: `${GITHUB_URL}/${name}` });
const githubAsset = (id) => `https://github.com/user-attachments/assets/${id}`;

export const PROJECTS = [
  {
    id: 'umbracore',
    tags: ['C++', 'OpenGL 3.3', 'CMake', 'GLSL', 'Bullet Physics', 'ImGui'],
    links: [repository('UmbraCore-Engine')],
    media: { type: 'image', src: githubAsset('6fcdc661-3ddc-44c0-b8c0-daefa9bc33f3') },
    featured: true,
  },
  {
    id: 'capybara',
    tags: ['Unity', 'URP', 'C#', 'HLSL', 'Shader Graph'],
    links: [repository('Capybara-Zoo-Break')],
    media: { type: 'image', src: '/projects/capybara-zoo-break.gif' },
  },
  {
    id: 'gastoja',
    tags: ['Python', 'CustomTkinter', 'Matplotlib', 'SQLite', 'PyInstaller'],
    links: [repository('gastoja-app')],
    media: { type: 'image', src: '/projects/gastoja-desktop.png' },
  },
  {
    id: 'picscreen',
    tags: ['JavaScript', 'Manifest V3', 'Canvas API', 'JSZip'],
    links: [{ labelKey: 'chromeWebStore', url: LINKS.picscreenStore }, repository('PicScreen-Chrome-Extension')],
    media: {
      type: 'image',
      src: 'https://raw.githubusercontent.com/LucasMartinsIT/PicScreen-Chrome-Extension/HEAD/icon128.png',
      fit: 'contain',
    },
  },
  {
    id: 'gaiaProtector',
    tags: ['Code.org Game Lab', 'JavaScript'],
    links: [{ labelKey: 'play', url: LINKS.gaiaProtector }],
    media: {
      type: 'image',
      src: 'https://studio.code.org/v3/files-public/2ggTnZD1Aj1UBwBvhZa1enfWuzynoggYwK8p1efP8aI/.metadata/thumbnail.png',
    },
  },
  {
    id: 'rocketBuilder',
    tags: ['Unity', 'AR Foundation', 'C#'],
    links: [repository('RocketBuilder-AR')],
    media: { type: 'video', src: githubAsset('66754214-a49b-481b-89ce-9529e342d05b'), fit: 'contain' },
  },
  {
    id: 'crossyRoad',
    tags: ['Unity', 'C#', 'HLSL'],
    links: [repository('Crossy-Road-Like-Unity')],
    media: { type: 'image', src: '/projects/crossy-road.jpg' },
  },
];

// Stats come from the Blender scenes these GLBs were exported from.
export const MODELS = [
  {
    id: 'capybara',
    file: '/models/capybara.glb',
    tris: 2266,
    verts: 1145,
    rigged: true,
    animations: [
      { clip: 'Capybara_Idle', labelKey: 'idle' },
      { clip: 'Capybara_run', labelKey: 'run' },
      { clip: 'Capybara_Jump', labelKey: 'jump' },
      { clip: 'Capybara_Slide', labelKey: 'slide' },
    ],
  },
  { id: 'watermelon', file: '/models/watermelon.glb', tris: 56, verts: 30, rigged: false },
  { id: 'survivor', file: '/models/survivor.glb', tris: 7326, verts: 3779, rigged: true },
  { id: 'ninja', file: '/models/ninja.glb', tris: 3288, verts: 1673, rigged: true },
  { id: 'loveChan', file: '/models/love-chan.glb', tris: 1250, verts: 730, rigged: true },
  { id: 'rpg', file: '/models/rpg.glb', tris: 3176, verts: 1684, rigged: false },
  { id: 'sword', file: '/models/sword.glb', tris: 352, verts: 195, rigged: false },
];
