import classes from "./HighlightContainer.module.scss";

const HighlightContainer = (props) => {
  return (
    <div className={classes.container}>
      <h3>{props.title}</h3>
      <div>
        <span>{props.value} </span>
        <span>{props.unit}</span>
      </div>
    </div>
  );
};

export default HighlightContainer;
