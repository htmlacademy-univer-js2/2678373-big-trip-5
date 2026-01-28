export function getDuration(point) {
  const diff = point.dateTo - point.dateFrom;
  const totalMinutes = Math.floor(diff / 1000 / 60);

  if (totalMinutes < 60) {
    return `${totalMinutes}M`;
  }

  const days = Math.floor(totalMinutes / 60 / 24);
  const hours = Math.floor((totalMinutes - days * 24 * 60) / 60);
  const minutes = totalMinutes - days * 24 * 60 - hours * 60;

  if (days === 0 && minutes === 0) {
    return `${String(hours).padStart(2, '0')}H 00M`;
  }

  if (days === 0) {
    return `${String(hours).padStart(2, '0')}H ${String(minutes).padStart(2, '0')}M`;
  }

  return `${days}D ${String(hours).padStart(2, '0')}H ${String(minutes).padStart(2, '0')}M`;
}
