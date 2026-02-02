import { calculateAge } from '@/util/calculations';

// PAGE_TITLE is the brand suffix, SITE_TITLE the full <title> of the landing
// page
export const PAGE_TITLE: string = 'm1well';
export const SITE_TITLE: string =
  'm1well - Michael Wellner | Fullstack Software Developer';
export const SITE_DESCRIPTION: string =
  'Michael Wellner (m1well), Fullstack Software Developer from Stuttgart - Spring Boot with Java and Kotlin, Angular frontends, and everything around clean, testable code.';

const buildDate = new Date();
const pad = (value: number): string => String(value).padStart(2, '0');

export const CURRENT_YEAR: number = buildDate.getFullYear();
export const CURRENT_DATE: string = `${buildDate.getFullYear()}-${pad(buildDate.getMonth() + 1)}-${pad(buildDate.getDate())}`;

export const BIRTH_DATE = '1987-06-01';
export const AGE_AT_BUILD = calculateAge(BIRTH_DATE);
