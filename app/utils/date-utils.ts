/**
 * Formats a date into a readable string
 * @param date The date to format
 * @returns A formatted date string
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

/**
 * Returns a relative time string (e.g., "2 hours ago", "yesterday")
 * @param date The date to format
 * @returns A relative time string
 */
export function getRelativeTimeString(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInSecs = Math.floor(diffInMs / 1000);
  const diffInMins = Math.floor(diffInSecs / 60);
  const diffInHours = Math.floor(diffInMins / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSecs < 60) {
    return "agora mesmo";
  } else if (diffInMins < 60) {
    return `${diffInMins} ${diffInMins === 1 ? "minuto" : "minutos"} atrás`;
  } else if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? "hora" : "horas"} atrás`;
  } else if (diffInDays === 1) {
    return "ontem";
  } else if (diffInDays < 30) {
    return `${diffInDays} dias atrás`;
  } else {
    return formatDate(date);
  }
}
