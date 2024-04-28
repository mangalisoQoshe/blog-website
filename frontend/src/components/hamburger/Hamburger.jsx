import  { useState, useEffect } from "react";
import styles from "./Hamburger.module.css"; // Import CSS for styling hamburger button

const HamburgerButton = ({children}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 490);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 490);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  if (!isMobile) {
    return null; // Hides the hamburger button on screens wider than 490px
  }

  return (
    <div className={styles["hamburger-menu"]}>
      <button className={styles["hamburger-button"]} onClick={toggleMenu}>
        <div className={`${styles.line} ${isOpen ? "open" : ""}`} />
        <div className={`${styles.line} ${isOpen ? "open" : ""}`} />
        <div className={`${styles.line} ${isOpen ? "open" : ""}`} />
      </button>
      {/* Your menu or navigation component */}
      {isOpen && <div className={styles.menu}>{children}</div>}
    </div>
  );
};

export default HamburgerButton;
