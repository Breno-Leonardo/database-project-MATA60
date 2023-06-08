export function convertDateToBD(date: Date): Date {
  return new Date(date.getMonth(), date.getDay(), date.getFullYear());
}
