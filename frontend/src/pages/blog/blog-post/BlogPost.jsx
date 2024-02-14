import styles from "./BlogPost.module.css";
import { Link } from "react-router-dom";

function BlogPost({ blog }) {
  return (
    <Link  to="/blog/24432">
      <div className={styles["blog-post"]}>
        <p>{blog.date}</p>
        <title>{blog.title}</title>
        <p>{blog.post}</p>
        <span>{blog.topic}</span>
      </div>
    </Link>
  );
}

export default BlogPost;
