import styles from "./Notification.module.css";
import PropTypes from "prop-types";

function Notification({ notify }) {
  switch (notify.level) {
    case "success":
      return <div className={styles.success}>{notify.message}</div>;

    case "error":
      return <div className={styles.error}>{notify.message}</div>;

    default:
      return null;
  }
}

Notification.propTypes ={
  notify:PropTypes.object.isRequired
} 

export default Notification;
