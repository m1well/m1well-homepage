import { isoDate, yearsSince } from 'maverick-wave-astro/date';

// PAGE_TITLE is the brand suffix, SITE_TITLE the full <title> of the landing
// page
export const PAGE_TITLE: string = 'm1well';
export const SITE_TITLE: string =
  'm1well - Michael Wellner | Fullstack Software Developer';
export const SITE_DESCRIPTION: string =
  'Michael Wellner (m1well), fullstack developer from Stuttgart - Spring Boot with Java and Kotlin, Angular frontends and everything around clean, testable code.';

export const CURRENT_DATE: string = isoDate(new Date());

export const BIRTH_DATE = '1987-06-01';
export const AGE_AT_BUILD = yearsSince(BIRTH_DATE);
