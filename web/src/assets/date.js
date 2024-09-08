const dateString = new Date();
const options = {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
};
const today = dateString.toLocaleDateString("ar-EG-u-nu-latn", options);
console.log(dateString);
export default today;
