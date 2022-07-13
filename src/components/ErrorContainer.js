import ReactDOM from "react-dom";
import classes from "./ErrorContainer.module.scss";

const ErrorContainer = (props) => {
  return ReactDOM.createPortal(
    <div className={classes["error-wrapper"]}>
      <div className={classes["error-container"]}>
        <p>{props.hasError}</p>
        <button onClick={props.closeError}>Try Again</button>
      </div>
    </div>,
    document.body
  );
};

export default ErrorContainer;
