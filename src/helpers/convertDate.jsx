export const convertDate = (date) => {
  const dateObj = new Date(date).toLocaleDateString("id-ID");
  return dateObj;
};
export const convertTime = (date) => {
  const dateObj = new Date(date).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return dateObj;
};
export const convertTimeForIinput = (date, time) => {
  const dateConverted = new Date(date).toISOString().split("T")[0];
  let timeConverted = new Date(`${dateConverted}:${time}`).toISOString();
  console.log(timeConverted);
};
