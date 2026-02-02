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
      'Build stunning, responsive websites effortlessly with a modern, lightweight CSS framework crafted for speed, style, and flexibility.',
    image: '/images/maverick_wave_logo.png',
    imageAlt: 'MaverickWave image',
    lastUpdated: '2026-02-24',
    githubLink: 'https://github.com/m1well/maverick-wave',
    tags: ['CSS', 'SCSS', 'JavaScript', 'Gulp', 'CDN'],
    ribbon: 'flagship project',
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
