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

export function formatTipoCarga(name: string): string {
  
  if (name=="G") {
    return "Geral";
  }
  else if (name=="E") {
    return "Extensão";
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

export function formatDate(date: string | undefined| Date): string {
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

