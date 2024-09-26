import { format } from 'date-fns';

/**
 * 格式化日期时间戳为字符串
 * @param date 要格式化的日期或时间戳
 * @param formatStr 格式化字符串，默认为 'yyyy-MM-dd HH:mm'
 * @returns 格式化后的日期字符串
 */
export const formatDate = (date: number | Date, formatStr = 'yyyy-MM-dd HH:mm'): string => {
  const isUnixTimestamp = (date: number | Date): date is number => typeof date === 'number' && date.toString().length === 10;

  const timestamp = isUnixTimestamp(date) ? date * 1000 : date;

  return format(timestamp, formatStr);
};

/**
 * 将秒数转换为小时和分钟\天、年表示
 * @param seconds 要转换的秒数
 * @returns 小时和分钟表示的字符串
 */
export function formatSeconds(seconds: number): string {
  if (!seconds) {
    return '0分钟';
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours >= 24) {
    const days = Math.floor(hours / 24);
    if (days >= 365) {
      const years = Math.floor(days / 365);
      return `${years}年`;
    } else {
      return `${days}天`;
    }
  } else {
    const hoursDisplay = hours > 0 ? `${hours}小时 ` : '';
    const minutesDisplay = minutes > 0 ? `${minutes}分` : '';
    return hoursDisplay + minutesDisplay;
  }
}

/**
 * 将时间戳或Date对象转换为距今多少时间
 * @param time 要转换的时间戳或Date对象
 * @returns 距今多少时间的字符串
 */
export function formatTimeAgo(time: number | Date): string {
  const now = new Date().getTime();
  const targetTime = time instanceof Date ? time.getTime() : padTimestamp(time);
  const seconds = Math.floor((now - targetTime) / 1000);

  if (seconds < 0) {
    return '未来的时间';
  }
  if (seconds < 60) {
    return '刚刚';
  }

  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    const remainingMonths = Math.floor((days % 365) / 30);
    if (years === 1 && remainingMonths > 0) {
      return `1年${remainingMonths}月`;
    }
    return `${years}年`;
  } else if (months > 0) {
    return `${months}个月`;
  } else if (days > 0) {
    return `${days}天`;
  } else if (hours > 0) {
    return `${hours}小时`;
  } else {
    return `${minutes}分钟`;
  }
}
/**
 * 将毫秒数转换为秒数
 * @param milliseconds 要转换的毫秒数
 * @returns 转换后的秒数
 */
export function convertMillisecondsToSeconds(milliseconds: number): number {
  return Math.round(milliseconds / 100) / 10;
}


/**
 * 将秒级时间戳补齐为毫秒级时间戳
 * @param timestamp 秒级时间戳
 * @returns 毫秒级时间戳
 */
export function padTimestamp(timestamp: number): number {
  return timestamp * 1000;
}