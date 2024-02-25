import {
  InstagramIcon,
  LinkedinIcon,
} from "../../components/icons/Icons";
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.intro}>
        <h1>
          Hi, I&apos;m Samke <span>👋🏼</span>
        </h1>
        <p>Welcome to my personal website!</p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas
          similique provident dolorem quisquam beatae architecto corrupti,
          nesciunt, impedit, quasi ex ipsa error quaerat dolore voluptatibus
          maxime! Sit quod aut distinctio!
        </p>
      </div>
      <img src="sam1.jpg" alt="My picture" className={styles["profile-pic"]} />
      <div className={styles.icons}>
        <a href="http://">
          <LinkedinIcon />
        </a>
        <a href="http://">
          <InstagramIcon />
        </a>
      </div>
    </div>
  );
}

export default Home;
