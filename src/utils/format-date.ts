export function formatDate(dateStr: string): string {
  // ISO tarihini UTC gece yarısı olarak parse etmek bazı saat dilimlerinde günü kaydırabilir.
  const [year, month, day] = dateStr.split("-").map(Number);
  if (!year || !month || !day) return dateStr;
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
