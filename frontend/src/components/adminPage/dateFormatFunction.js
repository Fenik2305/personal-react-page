export function convertDateFormat(inputTime) {
    const currentDate = new Date();
    const inputDate = new Date(inputTime);
  
    const timeDifference = currentDate - inputDate;
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // 1 day in ms
  
    if (timeDifference < oneDayInMilliseconds * 2) {
      if (currentDate.getDate() === inputDate.getDate()) {
        return `Today ${formatDate(inputDate)} ${format12HourTime(inputDate)}`;
      } else if (
        currentDate.getDate() - inputDate.getDate() === 1 &&
        currentDate.getMonth() === inputDate.getMonth() &&
        currentDate.getFullYear() === inputDate.getFullYear()
      ) {
        return `Yesterday ${formatDate(inputDate)} ${format12HourTime(inputDate)}`;
      }
    }
  
    // More than 2 days or other cases
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayOfWeek = daysOfWeek[inputDate.getDay()];
    return `${dayOfWeek} ${formatDate(inputDate)} ${format12HourTime(inputDate)}`;
  }
  
  function formatDate(date) {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
  
  function format12HourTime(date) {
    const hours = date.getHours() % 12 || 12; // Convert to 12-hour format
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = date.getHours() >= 12 ? "PM" : "AM";
    return `${hours}:${minutes} ${ampm}`;
  }