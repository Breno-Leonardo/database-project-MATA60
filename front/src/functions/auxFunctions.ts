export function formatDateRequestTopic(): string {
  const width = window.innerWidth;
  if (width < 768) {
    return "Data";
  }
  return "Data Solicitação";
}

export function formatNameForMobile(name: string): string {
  const width = window.innerWidth;
  const names = name.split(" ");
  if (width < 768) {
    if (names.length >= 2) {
      return names[0] + " " + names[names.length - 1];
    }
  }
  return name;
}

export function formatName(name: string): string {
  const names = name.split(" ");
  if (names.length >= 2) {
    return names[0] + " " + names[names.length - 1];
  }

  return name;
}

export function formatDate(date: string | undefined): string {
  if (date == undefined) return "undefined";
  const dateConvert = new Date(date);
  const width = window.innerWidth;

  let day = dateConvert.getUTCDate().toString();
  let month = (dateConvert.getUTCMonth() + 1).toString();
  let year = dateConvert.getUTCFullYear().toString();
  if (width < 768) {
    year = year.substring(2, 4);
  }
  if (month.length == 1) {
    month = "0" + month;
  }
  if (day.length == 1) {
    day = "0" + day;
  }
  return day + "/" + month + "/" + year;
}

export function formatDateForUTC(date: Date): string {
  const width = window.innerWidth;

  let day = date.getUTCDate().toString();
  let month = (date.getUTCMonth() + 1).toString();
  let year = date.getUTCFullYear().toString();
  if (width < 768) {
    year = year.substring(2, 4);
  }
  if (month.length == 1) {
    month = "0" + month;
  }
  if (day.length == 1) {
    day = "0" + day;
  }
  return year + "-" + month + "-" + day;
}

export function isAttentionFlag(limitConcessive: string): boolean {
  const limitConcessiveDate = new Date(limitConcessive);
  const dateNow = new Date(Date.now());
  var diffMonth =
    (limitConcessiveDate.getUTCFullYear() - dateNow.getUTCFullYear()) * 12 +
    (limitConcessiveDate.getUTCMonth() - dateNow.getUTCMonth());
  if (
    (diffMonth == 1 &&
      dateNow.getUTCDate() < limitConcessiveDate.getUTCDate()) ||
    diffMonth > 1
  ) {
    return false;
  }
  return true;
}

export function isMoreThanYear(admissionDate: string): boolean {
  const admission = new Date(admissionDate);
  const dateNow = new Date(Date.now());
  var diff =
    (dateNow.getUTCFullYear() - admission.getUTCFullYear()) * 12 +
    (dateNow.getUTCMonth() - admission.getUTCMonth());
  if (diff > 12||(diff == 12 && dateNow.getUTCDate() >= admission.getUTCDate())) {
    return true;
  }
  return false;
}
