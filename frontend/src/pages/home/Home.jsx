
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.intro}>
        <div>
          <h1 className={styles.greetings}>
            Hi, I&apos;m Samke <span>👋🏼</span>
          </h1>
          <p className={styles.welcome}>Welcome to my personal website!</p>
          <p style={{"padding-right":"1rem"}}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas
            similique provident dolorem quisquam beatae architecto corrupti,
            nesciunt, impedit, quasi ex ipsa error quaerat dolore voluptatibus
            maxime! Sit quod aut distinctio!
          </p>
        </div>
      
        <div className={styles.qualification}>
          Hons. in Business Managemt Science
        </div>
      </div>
      <div className={`${styles["profile-pic-containter"]}`}>
        <img
          src="potrait1.jpg"
          alt="My picture"
          className={styles["profile-pic"]}
        />
      </div>
    </div>
  );
}

export default Home;
