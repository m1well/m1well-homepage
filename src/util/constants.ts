export const PAGE_TITLE: string = 'm1well';

export const MAVERICK_WAVE_VERSION = '2.33.0';

export const CURRENT_YEAR: number = new Date().getFullYear();
export const CURRENT_DATE: string = new Date().toISOString().split('T')[0];

export const AGE: number = getAge(1987, 6, 1);

function getAge(year: number, month: number, day: number) {
  const birth = new Date(year, month - 1, day + 1);
  console.log(birth);
  const diff = new Date(new Date().valueOf() - birth.valueOf());
  return Math.abs(diff.getFullYear() - 1970);
}
