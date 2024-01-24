import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";

dayjs.extend(isToday);
dayjs.extend(isYesterday);

export function formatDate(date: string | number | Date | dayjs.Dayjs | null | undefined): string {
  const DATE_FORMAT = "DD MMMM YYYY";
  const TIME_FORMAT = "H:mm";
  if (dayjs(date).isToday()) {
    return "Today, " + dayjs(date).format(TIME_FORMAT);
  }
  if (dayjs(date).isYesterday()) {
    return "Yesterday, " + dayjs(date).format(TIME_FORMAT);
  }
  return dayjs(date).format([DATE_FORMAT, TIME_FORMAT].join(", "));
}
