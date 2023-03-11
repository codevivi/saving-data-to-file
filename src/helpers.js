export function rand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
export function birthDayFormat(date) {
  // const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "October", "December"];
  return date.getFullYear() + "-" + pad0(date.getMonth() + 1) + "-" + pad0(date.getDate());
}
function pad0(num) {
  let numStr = num.toString();
  if (numStr.length < 2) {
    return "0" + numStr;
  }
  return numStr;
}
