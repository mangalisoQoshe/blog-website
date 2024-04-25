import useAuth from "../../context/authContext/useAuth";
import styles from "./Post.module.css";
import { Link, useNavigate } from "react-router-dom";

function Post({ blog, deletePost }) {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleEditBtn = () => {
  
    navigate("/edit-blog", { state: blog });
  };
  return (
    <div className={styles["blog-post"]}>
      <Link to={"/blog/" + blog.id}>
        <div className={styles.content}>
          <h2>{blog.title}</h2>
          <p className={styles.date}>{(new Date(blog.createdAt.slice(0,10))).toDateString()}</p>
          <div>{blog.tags.map((tag) => tag)}</div>
          <p>{blog.brief}</p>
        </div>
      </Link>
      {currentUser ? (
        <span>
          <button onClick={() => deletePost(blog.id,currentUser.uid)}>delete</button>
          <button onClick={handleEditBtn}>edit</button>
        </span>
      ) : null}
    </div>
  );
}

export default Post;
