import { useState, useEffect } from "react";

import classes from "./App.module.scss";
import WeatherToday from "./components/WeatherToday";
import WeatherNextDays from "./components/WeatherNextDays";
import TodayHighlights from "./components/TodayHighlights";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorContainer from "./components/ErrorContainer";

function App() {
  const API_KEY = "29d7452941f82c3116568b1ab6be5723";
  const [hasError, setHasError] = useState(false);
  const [loadingSpinnerIsVisible, setLoadingSpinnerIsVisible] = useState(true);
  const [lat, setLat] = useState(52);
  const [long, setLong] = useState(21);
  const [location, setLocation] = useState("Warsaw");
  const [weatherIconLink, setWeatherIconLink] = useState();
  const [weatherDescription, setWeatherDescription] = useState();
  const [todayTemp, setTodayTemp] = useState();

  // Today's highlights
  const [todayHumidity, setTodayHumidity] = useState();
  const [todayPressure, setTodayPressure] = useState();
  const [todayVisibility, setTodayVisibility] = useState();
  const [todayWindSpeed, setTodayWindSpeed] = useState();
  const [todayWindDegree, setTodayWindDegree] = useState();

  // Next days weather
  const [nextDaysWeather, setNextDaysWeather] = useState([]);

  const searchLocationWeather = (lat, lon, name) => {
    setLat(lat);
    setLong(lon);
    setLocation(name);
  };

  const errorHandler = (message) => {
    setHasError(message);
  };

  const closeErrorHandler = () => {
    setHasError(null);
  };

  const selectCityHandler = (city) => setLocation(city);

  useEffect(() => {
    // Fetch data
    const fetchWeatherData = async (lat, long) => {
      try {
        setLoadingSpinnerIsVisible(true);

        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`
        );

        if (!res.ok) {
          throw new Error(res.statusText);
        }

        const data = await res.json();
        const { current } = data;

        // setting today's temperature, description and weather's icon
        setWeatherDescription(current.weather[0].main);
        setWeatherIconLink(
          `http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`
        );
        setTodayTemp(Math.round(current.feels_like));

        // setting today's highlights
        const { humidity, pressure, visibility, wind_speed, wind_deg } =
          current;
        setTodayHumidity(humidity);
        setTodayPressure(pressure);
        setTodayVisibility(Math.round(visibility / 1000));
        setTodayWindSpeed(Math.round(wind_speed));
        setTodayWindDegree(wind_deg);

        // setting next 5 days weather
        setNextDaysWeather(data.daily.slice(0, 5));
      } catch (error) {
        console.log(error);
        setHasError(error.message);
      }
      setLoadingSpinnerIsVisible(false);
    };

    fetchWeatherData(lat, long);
  }, [lat, long]);

  return (
    <main className={classes.main}>
      <>
        {hasError && (
          <ErrorContainer hasError={hasError} closeError={closeErrorHandler} />
        )}
        {loadingSpinnerIsVisible && <LoadingSpinner />}
        <WeatherToday
          API_KEY={API_KEY}
          location={location}
          weatherDescription={weatherDescription}
          weatherIconLink={weatherIconLink}
          todayTemp={todayTemp}
          searchLocationWeather={searchLocationWeather}
          setError={errorHandler}
          selectCity={selectCityHandler}
        />
        <div className={classes.wrapper}>
          <WeatherNextDays nextDaysWeather={nextDaysWeather} />
          <TodayHighlights
            todayHumidity={todayHumidity}
            todayPressure={todayPressure}
            todayVisibility={todayVisibility}
            todayWindSpeed={todayWindSpeed}
            todayWindDegree={todayWindDegree}
          />
        </div>
      </>
    </main>
  );
}

export default App;
