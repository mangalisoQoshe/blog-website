import styles from "./BlogPost.module.css";
import { Link } from "react-router-dom";

function BlogPost({ blog }) {
  return (
    <Link  to={"/blog/"+blog.id}>
      <div className={styles["blog-post"]}>
        <p>{blog.date}</p>
        <h2>{blog.title}</h2>
       
        <span>{blog.topic}</span>
      </div>
    </Link>
  );
}

export default BlogPost;
