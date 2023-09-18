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
export const convertDateForIinput = (date, timeNow, extraTime, timeAfter) => {
  const convertedDate = date;
  const convertedTimeNow = date + " " + timeNow;
  const convertedTimeAfter =
    date + " " + convertTimewithExtra(timeNow, extraTime);
  const convertedTimeAfter2 = date + " " + timeAfter;

  return {
    tanggal: convertedDate,
    jamMasuk: convertedTimeNow,
    jamBatas: convertedTimeAfter,
    jamKeluar: convertedTimeAfter2,
  };
};
export const convertTimewithExtra = (timeNow, timeAfter) => {
  let [hours, minutes] = timeNow.split(":");
  let hoursAfter = parseInt(hours) + parseInt(timeAfter);

  return `${hoursAfter}:${minutes}`;
};
export const convertTimewithReducer = (timeNow, timeAfter) => {
  let [hours, minutes] = timeNow.split(":");
  let hoursAfter = parseInt(hours) + parseInt(timeAfter);

  if (hoursAfter >= 24) {
    hoursAfter = hoursAfter - 24;
  }

  const ampm = parseInt(hoursAfter) >= 12 ? "PM" : "AM";
  let ampmHours = parseInt(hoursAfter) % 12;
  if (parseInt(ampmHours) < 10) {
    ampmHours = `0${ampmHours}`;
  }

  return `${ampmHours}:${minutes} ${ampm}`;
};
export const compareTime = (timeNow, extraTime, timeThen) => {
  let [hours, minutes] = timeNow.split(":");
  let hoursAfter = parseInt(hours) + parseInt(extraTime);
  let [hoursThen, minutesThen] = timeThen.split(":");
  if (parseInt(hoursThen) >= parseInt(hoursAfter)) {
    return true;
  } else {
    return false;
  }
};
