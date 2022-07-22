import classes from "./WeatherDayContainer.module.scss";

const WeatherDayContainer = (props) => {
  const daysArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthsArr = [
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

  const todayDate = new Date(
    new Date().getTime() + props.id * 24 * 60 * 60 * 1000
  );
  const todayDayOfTheWeek = daysArray[todayDate.getDay()];
  const todayMonth = monthsArr[todayDate.getMonth()];
  const dayOfTheMonth = todayDate.getDate();

  const date = `${todayDayOfTheWeek}, ${dayOfTheMonth} ${todayMonth}`;

  return (
    <div className={classes.container}>
      <p>{date}</p>
      <div className={classes["img-container"]}>
        <img
          src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`}
          alt="weather icon"
        />
      </div>
      <div className={classes.temperatures}>
        <span>{Math.round(props.max)} &#176;C</span>
        <span>{Math.round(props.min)} &#176;C</span>
      </div>
    </div>
  );
};

export default WeatherDayContainer;
