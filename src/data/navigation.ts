import type { SocialType } from 'maverick-wave-astro/social';

import { SITE } from '@/config/site';

type NavItem = {
  label: string;
  href: string;
};

type SocialLink = {
  type: SocialType;
  href: string;
  label: string;
};

export const navigation: NavItem[] = [
  { label: 'About', href: '/#about' },
  { label: 'Journey', href: '/#journey' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Blog', href: '/#blog' },
];

export const socialLinks: SocialLink[] = [
  {
    type: 'linkedin',
    href: 'https://www.linkedin.com/in/michael-wellner',
    label: 'LinkedIn',
  },
  {
    type: 'xing',
    href: 'https://www.xing.com/profile/Michael_Wellner5/',
    label: 'Xing',
  },
  {
    type: 'github',
    href: 'https://github.com/m1well',
    label: 'GitHub',
  },
  {
    type: 'dailydev',
    href: 'https://app.daily.dev/m1well',
    label: 'daily.dev',
  },
  {
    type: 'devto',
    href: 'https://dev.to/m1well',
    label: 'dev.to',
  },
  {
    type: 'mail',
    href: `mailto:${SITE.email}`,
    label: 'Mail',
  },
];
