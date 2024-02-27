import styles from "./Post.module.css";
import { Link } from "react-router-dom";

function Post({ blog,deletePost }) {
  return (
    <div className={styles["blog-post"]}>
      <Link to={"/blog/" + blog.id}>
        <div className={styles.content}>
          <h2>{blog.title}</h2>
          <p className={styles.date}>{blog.pulishDate}</p>
          <span>{blog.tag}</span>
          <p>{blog.brief}</p>
        </div>
      </Link>
      <span>
        <button onClick={()=>deletePost(blog.id)}>delete</button>
        <button>edit</button>
      </span>
    </div>
  );
}

export default Post;
