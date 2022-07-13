import WeatherDayContainer from "./WeatherDayContainer";
import classes from "./WeatherDaysList.module.scss";

const WeatherDaysList = (props) => {
  const nextDaysWeather = props.nextDaysWeather.map((day, id) => (
    <li key={id + 1}>
      <WeatherDayContainer
        min={day.temp.min}
        max={day.temp.max}
        icon={day.weather[0].icon}
        id={id + 1}
      />
    </li>
  ));

  return (
    <ul className={classes.list}>
      {/* <li>
        <WeatherDayContainer />
      </li>
      <li>
        <WeatherDayContainer />
      </li>
      <li>
        <WeatherDayContainer />
      </li>
      <li>
        <WeatherDayContainer />
      </li>
      <li>
        <WeatherDayContainer />
      </li> */}
      {nextDaysWeather}
    </ul>
  );
};

export default WeatherDaysList;
