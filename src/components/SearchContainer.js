import { useRef } from "react";

import classes from "./SearchContainer.module.scss";

const citiesArray = [
  "Warsaw, PL",
  "Paris, FR",
  "London, GB",
  "Madrid, ES",
  "Los Angeles, US",
  "New York, US",
  "Rome, IT",
  "Tokyo, JP",
  "Berlin, DE",
];

const randomCities = [];

while (randomCities.length < 5) {
  const randomId = Math.floor(Math.random() * citiesArray.length);
  const randomCity = citiesArray[randomId];
  if (randomCities.includes(randomCity)) continue;
  else randomCities.push(randomCity);
}

const SearchContainer = (props) => {
  const inputRef = useRef();

  const isVisible = !props.showSearchContainer
    ? `${classes.container} ${classes["is-visible"]}`
    : `${classes.container}`;

  const getLocationWeather = async () => {
    try {
      const query = inputRef.current.value;
      const res = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${props.API_KEY}`
      );
      const data = await res.json();

      const { lat, lon, name } = data[0];

      console.log(data[0]);
      props.searchLocationWeather(lat, lon, name);
      props.hideSearchContainer();
      inputRef.current.value = "";
    } catch (error) {
      console.log(error);
      props.setError("Could not find your location");
    }
    inputRef.current.blur();
  };

  const searchEnter = (event) => {
    if (event.key === "Enter") {
      getLocationWeather();
    }
  };

  const selectCity = (event) => {
    const city = event.target.innerText.slice(0, -2);
    inputRef.current.value = city;
    getLocationWeather();
    props.hideSearchContainer();
  };

  const cities = randomCities.map((city) => (
    <li key={city} onClick={selectCity}>
      {city} <span>&gt;</span>
    </li>
  ));

  return (
    <div className={isVisible}>
      <button
        className={classes["close-btn"]}
        onClick={props.hideSearchContainer}
      >
        <span className="material-symbols-outlined">close</span>
      </button>
      <div className={classes.searchbox}>
        <input
          ref={inputRef}
          type="text"
          placeholder="search location"
          onKeyUp={searchEnter}
        />
        <button onClick={getLocationWeather}>Search</button>
      </div>
      <p>
        To make it more precise put the city's name, comma, 2-letter country
        code (ISO3166). The order is important - the first is city name then
        comma then country. Example - London, GB or New York, US.
      </p>
      <ul>{cities}</ul>
    </div>
  );
};

export default SearchContainer;
