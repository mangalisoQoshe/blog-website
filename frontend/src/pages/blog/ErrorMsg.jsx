import { AlertTriangle } from "../../components/icons/Icons";
import styles from "./ErrorMsg.module.css";
import PropTypes from "prop-types";

function ErrorMsg({ message }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: "3rem",
      }}
    >
      <AlertTriangle />
      <h2
        className={styles.error}
        style={{ textAlign: "center", marginTop: "3rem" }}
      >
        {message}
      </h2>
    </div>
  );
}

ErrorMsg.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMsg;
