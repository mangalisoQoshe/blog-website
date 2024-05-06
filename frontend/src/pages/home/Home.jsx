import styles from "./Home.module.css";
import { useEffect } from "react";

function Home() {
  useEffect(() => {
    document.title = "Samkelisiwe Mathangana"; // Set title based on pathname
  }, []);
  return (
    <div className={styles.home}>
      <div className={styles["containter-1"]}>
        <h1 className={styles.greetings}>
          Hi, I&apos;m Samke <span>👋🏼</span>
        </h1>
        <p className={styles.welcome}>Welcome to my personal website!</p>
        <p className={styles.intro}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas
          similique provident dolorem quisquam beatae architecto corrupti,
          nesciunt, impedit, quasi ex ipsa error quaerat dolore voluptatibus
          maxime! Sit quod aut distinctio!
        </p>
      </div>

      <div className={styles["container-2"]}>
        <div className={styles.qualification}>
          Hons. in Business Managemt Science
        </div>

        <div className={`${styles["profile-pic-containter"]}`}>
          <img
            src="potrait1.jpg"
            alt="My picture"
            className={styles["profile-pic"]}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
