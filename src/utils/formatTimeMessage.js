export default function formatTimeMessage(time) {
  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return formattedTime;
}
