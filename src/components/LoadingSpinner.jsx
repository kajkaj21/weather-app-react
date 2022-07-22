import ReactDOM from "react-dom";
import classes from "./LoadingSpinner.module.scss";

const LoadingSpinner = () => {
  return ReactDOM.createPortal(
    <div className={classes["spinner-container"]}>
      <div className={classes["loading-spinner"]}></div>
    </div>,
    document.body
  );
};

export default LoadingSpinner;
