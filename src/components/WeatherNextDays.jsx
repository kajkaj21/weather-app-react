import classes from "./WeatherNextDays.module.scss";
import WeatherDaysList from "./WeatherDaysList";

const WeatherNextDays = (props) => {
  return (
    <section className={classes["section-weather-next-days"]}>
      <WeatherDaysList nextDaysWeather={props.nextDaysWeather} />
    </section>
  );
};

export default WeatherNextDays;
