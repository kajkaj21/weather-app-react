import WeatherDayContainer from "./WeatherDayContainer";
import classes from "./WeatherDaysList.module.scss";

const WeatherDaysList = (props) => {
  return (
    <ul className={classes.list}>
      {props.nextDaysWeather.map((day, id) => (
        <li key={id + 1}>
          <WeatherDayContainer
            min={day.temp.min}
            max={day.temp.max}
            icon={day.weather[0].icon}
            id={id + 1}
          />
        </li>
      ))}
    </ul>
  );
};

export default WeatherDaysList;
