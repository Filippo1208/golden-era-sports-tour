import type { TourEvent } from "@/types/content";

const monthNames = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
];

function dateParts(date: string) {
  const [year, month, day] = date.split("-").map(Number);

  return {
    year,
    month,
    day,
    monthName: monthNames[month - 1],
  };
}

function getEventEndTime(event: TourEvent) {
  const finalDate = event.endDate ?? event.startDate;

  return new Date(`${finalDate}T23:59:59`).getTime();
}

function getEventStartTime(event: TourEvent) {
  return new Date(event.countdownTarget ?? `${event.startDate}T00:00:00`).getTime();
}

export function getNextEvent(events: TourEvent[], now = new Date()) {
  const nowTime = now.getTime();

  return (
    events
      .filter((event) => event.status === "upcoming")
      .filter((event) => getEventEndTime(event) >= nowTime)
      .sort((a, b) => getEventStartTime(a) - getEventStartTime(b))[0] ?? null
  );
}

export function formatEventDateRange(event: TourEvent) {
  const start = dateParts(event.startDate);
  const end = event.endDate ? dateParts(event.endDate) : start;

  if (
    start.year === end.year &&
    start.month === end.month &&
    start.day === end.day
  ) {
    return `${start.day} ${start.monthName} ${start.year}`;
  }

  if (start.year === end.year && start.month === end.month) {
    return `${start.day}-${end.day} ${start.monthName} ${start.year}`;
  }

  return `${start.day} ${start.monthName} ${start.year} - ${end.day} ${end.monthName} ${end.year}`;
}
