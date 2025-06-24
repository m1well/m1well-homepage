import dailyDevIcon from '/images/icon_dailydev.svg?raw';

type NavItem = {
  href: string;
  external: boolean;
  icon?: string;
  svg?: string;
  title: string;
};

export const sections: NavItem[] = [
  {
    href: '#about',
    external: false,
    title: 'About',
  },
  {
    href: '#journey',
    external: false,
    title: 'Journey',
  },
  {
    href: '#skills',
    external: false,
    title: 'Skills',
  },
  {
    href: '#projects',
    external: false,
    title: 'Projects',
  },
  {
    href: '#blog',
    external: false,
    title: 'Blog',
  },
];

export const socialLinks: NavItem[] = [
  {
    href: 'https://www.linkedin.com/in/michael-wellner',
    external: true,
    icon: 'fab fa-linkedin',
    title: 'LinkedIn',
  },
  {
    href: 'https://www.xing.com/profile/Michael_Wellner5/',
    external: true,
    icon: 'fab fa-xing',
    title: 'Xing',
  },
  {
    href: 'https://github.com/m1well',
    external: true,
    icon: 'fab fa-github',
    title: 'GitHub',
  },
  {
    href: 'https://app.daily.dev/m1well',
    external: true,
    svg: dailyDevIcon,
    title: 'daily.dev',
  },
  {
    href: 'https://dev.to/m1well',
    external: true,
    icon: 'fab fa-dev',
    title: 'dev.to',
  },
  {
    href: 'mailto:info@m1well.com',
    external: true,
    icon: 'fa fa-envelope',
    title: 'Mail',
  },
];
