import moment from "moment";
export function tConvert(time) {
  const timeString = time.substring(0, 5);
  let hours = parseInt(timeString.substring(0, 2));
  let minutes = parseInt(timeString.substring(3, 5));
  let timeSuffix = " AM ";
  if (hours === 0) {
    hours = 12;
  }
  if (hours > 12) {
    hours = hours % 12;
    timeSuffix = " PM ";
  }
  if (minutes === 0) {
    return hours.toString() + timeSuffix;
  } else if (minutes < 10) {
    return hours.toString() + ":0" + minutes.toString() + timeSuffix;
  }
  return hours.toString() + ":" + minutes.toString() + timeSuffix;
}
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function dateConvert(dateInput) {
  const day = moment(dateInput, ["YYYY-MM-DD"]).format("DD");
  const month = moment(dateInput, ["YYYY-MM-DD"]).format("MM");
  const monthInt = parseInt(month);
  return day.toString() + " " + monthNames[monthInt - 1];
}

export function compareTime(time1, time2) {
  const date = moment(Date.now()).format("MM/DD/YYYY");
  const date1 = new Date(date + " " + time1);
  const date2 = new Date(date + " " + time2);
  if (date1 > date2) return false;
  else return true;
}
