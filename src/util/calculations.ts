import { parseIsoDate } from 'maverick-wave-astro/date';

// count a month as reached 6 days before the calendar month ends
const MONTH_ROUND_UP_DAYS = 6;

export function calculateMonthsSince(startDate: string): string {
  const start = parseIsoDate(startDate);
  const now = new Date();
  now.setDate(now.getDate() + MONTH_ROUND_UP_DAYS);

  const months =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) {
    return `${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
  } else if (remainingMonths === 0) {
    return `${years} ${years === 1 ? 'year' : 'years'}`;
  } else {
    return `${years} ${years === 1 ? 'year' : 'years'} ${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
  }
}
