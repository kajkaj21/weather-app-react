import { useState } from "react";

import classes from "./WeatherToday.module.scss";
import SearchContainer from "./SearchContainer";

const WeatherToday = (props) => {
  const [showSearchContainer, setShowSearchContainer] = useState(false);

  const getLocation = () => {
    const success = (position) => {
      // setCurrentLatitude(position.coords.latitude);
      // setCurrentLongitude(position.coords.longitude);
      const currentLat = position.coords.latitude.toFixed(2);
      const currentLon = position.coords.longitude.toFixed(2);
      const name = `Latitude: ${currentLat} Longitude: ${currentLon}`;
      props.searchLocationWeather(currentLat, currentLon, name);
    };

    const error = () => {
      props.setError(
        "Could not get your location. Enable your GPS location in your browser."
      );
    };

    navigator.geolocation.getCurrentPosition(success, error);
  };

  const showSearchContainerHandler = () => setShowSearchContainer(true);
  const hideSearchContainerHandler = () => setShowSearchContainer(false);

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

  const todayDate = new Date();
  const todayDayOfTheWeek = daysArray[todayDate.getDay()];
  const todayMonth = monthsArr[todayDate.getMonth()];
  const dayOfTheMonth = todayDate.getDate();

  return (
    <section className={classes["section-weather-today"]}>
      <SearchContainer
        API_KEY={props.API_KEY}
        showSearchContainer={showSearchContainer}
        hideSearchContainer={hideSearchContainerHandler}
        searchLocationWeather={props.searchLocationWeather}
        setError={props.setError}
        selectCity={props.selectCity}
      />
      <div className={classes.buttons}>
        <button onClick={showSearchContainerHandler}>Search for places</button>
        <button onClick={getLocation}>
          <span className="material-symbols-outlined">my_location</span>
        </button>
      </div>
      <div className={classes["weather-icon-container"]}>
        <img src={props.weatherIconLink} alt="weather icon" />
      </div>
      <div className={classes["weather-data"]}>
        <p>
          <span>{props.todayTemp}</span> &#176;C
        </p>
        <p>{props.weatherDescription}</p>
        <p>
          Today <span>&#9679;</span>
          {`${todayDayOfTheWeek}, ${dayOfTheMonth} ${todayMonth}`}
        </p>
        <p>{props.location}</p>
      </div>
    </section>
  );
};

export default WeatherToday;

// const [currentLatitude, setCurrentLatitude] = useState();
// const [currentLongitude, setCurrentLongitude] = useState();

// const getCurrentLocationWeather = useCallback(async (lat, lon, API_KEY) => {
//   const result = await fetch(
//     `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=${API_KEY}`
//   );
//   const data = await result.json();
//   console.log(data);
// });

// const getLocation = () => {
//   const success = (position) => {
//     setCurrentLatitude(position.coords.latitude);
//     setCurrentLongitude(position.coords.longitude);
//   };

//   const error = () => {
//     console.log("error");
//   };

//   navigator.geolocation.getCurrentPosition(success, error);
// };

// useEffect(() => {
//   getCurrentLocationWeather(currentLatitude, currentLongitude, props.API_KEY);
// }, [
//   currentLatitude,
//   currentLongitude,
//   props.API_KEY,
//   getCurrentLocationWeather,
// ]);
