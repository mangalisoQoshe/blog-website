import styles from "./Notification.module.css";

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

export default Notification;
