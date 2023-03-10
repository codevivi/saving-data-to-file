export function monthToStr(ind) {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "October", "December"];
  return months[ind];
}
export function rand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
