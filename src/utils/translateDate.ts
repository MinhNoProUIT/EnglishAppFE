export default function translateDate(date: string | Date): string {
  const now = new Date();
  const targetDate = new Date(date);

  const diffInMs = now.getTime() - targetDate.getTime(); // bỏ Abs, để phân biệt quá khứ/tương lai
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  const isPast = diffInMs >= 0;

  let result = "";

  if (diffInSeconds < 60) {
    result = `${diffInSeconds} giây`;
  } else if (diffInMinutes < 60) {
    result = `${diffInMinutes} phút`;
  } else if (diffInHours < 24) {
    result = `${diffInHours} giờ`;
  } else if (diffInDays < 7) {
    result = `${diffInDays} ngày`;
  } else if (diffInDays < 30) {
    result = `${diffInWeeks} tuần`;
  } else if (diffInDays < 365) {
    result = `${diffInMonths} tháng`;
  } else {
    result = `${diffInYears} năm`;
  }

  return isPast ? `${result} trước` : `sau ${result}`;
}
