import classes from "./TodayHighlights.module.scss";
import HighlightContainer from "./HighlightContainer";

const TodayHighlights = (props) => {
  return (
    <section className={classes["today-highlight-section"]}>
      <div>
        <h2>Today's Highlights</h2>
        <ul>
          <li>
            <HighlightContainer
              title="Wind status"
              value={props.todayWindSpeed}
              unit="m/s"
            />
          </li>
          <li>
            <HighlightContainer
              title="Humidity"
              value={props.todayHumidity}
              unit="%"
            />
          </li>
          <li>
            <HighlightContainer
              title="Visibility"
              value={props.todayVisibility}
              unit="km"
            />
          </li>
          <li>
            <HighlightContainer
              title="Air Pressure"
              value={props.todayPressure}
              unit="hPa"
            />
          </li>
        </ul>
      </div>
    </section>
  );
};

export default TodayHighlights;
