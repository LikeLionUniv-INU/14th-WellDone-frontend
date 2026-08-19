import dayjs from "dayjs";

export const getMonthWeek = (targetDate = dayjs()) => {
  const date = dayjs(targetDate);
  const month = date.month() + 1; // 1~12월

  // 해당 월의 1일과 1일의 요일(0:일, 1:월 ~ 6:토)
  const firstDayOfMonth = date.startOf("month");
  const firstDayOfWeek = firstDayOfMonth.day();

  // (현재 날짜 + 1일의 요일 오프셋) / 7 올림
  const weekNumber = Math.ceil((date.date() + firstDayOfWeek) / 7);

  return `${month}월 ${weekNumber}째주`;
};
