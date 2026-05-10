const MONTHS: Record<string, number> = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
};

function parseMonthYear(str: string): Date {
  const [monthStr, yearStr] = str.trim().split(" ");
  const month = MONTHS[monthStr.toLowerCase().slice(0, 3)];
  const year = Number(yearStr);

  if (month === undefined || isNaN(year)) {
    throw new Error(`Invalid date string: "${str}"`);
  }

  return new Date(year, month, 1);
}

export function formatDuration(startStr: string, endStr: string): string {
  const start = parseMonthYear(startStr);
  const end =
    endStr.toLowerCase() === "present" ? new Date() : parseMonthYear(endStr);

  // Include the end month as a full month
  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth()) +
    1;

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) return `${remainingMonths} mos`;
  if (remainingMonths === 0) return `${years} yr${years > 1 ? "s" : ""}`;
  return `${years} yr${years > 1 ? "s" : ""} ${remainingMonths} mos`;
}
