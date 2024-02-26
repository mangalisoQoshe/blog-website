import styles from "./Post.module.css";
import { Link } from "react-router-dom";

function Post({ blog }) {
  return (
    <Link to={"/blog/" + blog.id} className={styles["blog-post"]}>
     
        <div className={styles.content}>
          <h2>{blog.title}</h2>
          <p className={styles.date}>{blog.pulishDate}</p>
          <span>{blog.tag}</span>
          <p>{blog.brief}</p>
        </div>
  
    
    </Link>
  );
}

export default Post;
