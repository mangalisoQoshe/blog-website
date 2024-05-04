import styles from "./HamburgerButton.module.css"; // Import CSS for styling hamburger button


const HamburgerButton = ({isOpen,toggleMenu}) => {


  return (
    <div className={styles["hamburger-menu"]}>
      <button
        className={`${styles["hamburger-button"]} ${isOpen ? styles.open : ''}`} // Apply conditional class from styles object
        onClick={toggleMenu}
      >
        <div className={styles.line} />
        <div className={styles.line} />
        <div className={styles.line} />
      </button>
    </div>
  );
};

export default HamburgerButton;

