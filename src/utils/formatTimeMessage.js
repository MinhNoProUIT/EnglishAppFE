export default function formatTimeMessage(time) {
  if (!time) return "";
  const date = typeof time === "string" ? new Date(time) : time;

  if (isNaN(date.getTime())) return "";

  const formattedDate = date.toLocaleDateString("vi-VN"); 
  const formattedTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${formattedDate} ${formattedTime}`; 
}
