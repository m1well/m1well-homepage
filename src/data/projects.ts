type ProjectItem = {
  title: string;
  description1: string;
  description2: string;
  image: string;
  imageAlt: string;
  lastUpdated: string;
  githubLink: string;
  tags: string[];
  ribbon?: string;
};

export const projects: ProjectItem[] = [
  {
    title: 'MaverickWave',
    description1:
      'A lightweight, modern CSS framework for building responsive websites with elegance and speed.',
    description2:
      'After copy-pasting the same CSS into every side project for years, I finally built the framework I actually wanted to use.',
    image: '/images/maverick_wave_logo.png',
    imageAlt: 'MaverickWave image',
    lastUpdated: '2026-08-31',
    githubLink: 'https://github.com/m1well/maverick-wave',
    tags: ['CSS', 'SCSS', 'JavaScript', 'Gulp', 'NPM', 'CDN', 'Claude Code'],
    ribbon: 'flagship project',
  },
  {
    title: 'TopoMap',
    description1:
      'Two agent skills scan your Spring Boot or Angular repo and write a model.json, the viewer at topomap.m1well.com draws it as a map you can click your way through.',
    description2:
      'Every codebase has a map in it - it just lives in the heads of the people who were there from the start.',
    image: '/images/topomap_logo.png',
    imageAlt: 'TopoMap image',
    lastUpdated: '2026-08-27',
    githubLink: 'https://github.com/m1well/topomap-skills',
    tags: ['Claude Code', 'Agent Skills', 'JavaScript', 'CSS', 'JSON'],
  },
  {
    title: 'Idently',
    description1:
      'A tiny, stateless, code-based Deno identity server with code login and a JSON client-user store.',
    description2:
      "Sometimes you don't need OAuth, Firebase, or Keycloak. You just want a damn code and a JWT.",
    image: '/images/idently_logo.png',
    imageAlt: 'Idently image',
    lastUpdated: '2025-09-26',
    githubLink: 'https://github.com/m1well/idently',
    tags: ['Deno', 'TypeScript', 'JWT'],
  },
  {
    title: 'versions',
    description1: 'A bash script to display the version numbers of your tools.',
    description2:
      'I just want to see the version numbers of all my used tools with one command.',
    image: '/images/versions_logo.png',
    imageAlt: 'versions image',
    lastUpdated: '2025-11-29',
    githubLink: 'https://github.com/m1well/versions',
    tags: ['bash'],
  },
];
