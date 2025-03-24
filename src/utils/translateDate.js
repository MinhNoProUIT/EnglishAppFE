
export default function translateDate(date) {
    const now = new Date();
    const targetDate = new Date(date);

    // now.setHours(0, 0, 0, 0);
    // targetDate.setHours(0, 0, 0, 0);

    const diffInMs = targetDate - now;

    const diffInDays = Math.abs(Math.floor(diffInMs / (1000 * 60 * 60 * 24)));

    if (diffInDays < 7) {
        return `${diffInDays} ngày`;
    } else if (diffInDays < 30) {
        const weeks = Math.floor(diffInDays / 7);
        return `${weeks} tuần`;
    } else if (diffInDays < 365) {
        const months = Math.floor(diffInDays / 30);
        return `${months} tháng`;
    } else {
        const years = Math.floor(diffInDays / 365);
        return `${years} năm`;
    }
} 