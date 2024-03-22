import useAuth from "../../context/authContext/useAuth";
import styles from "./Post.module.css";
import { Link, useNavigate } from "react-router-dom";

function Post({ blog, deletePost, editBlog }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleEditBtn = () => {
    editBlog(blog);
    navigate("/create-post");
  };
  return (
    <div className={styles["blog-post"]}>
      <Link to={"/blog/" + blog.id}>
        <div className={styles.content}>
          <h2>{blog.title}</h2>
          <p className={styles.date}>{blog.pulishDate}</p>
          <div>{blog.tags.map((tag) => tag)}</div>
          <p>{blog.brief}</p>
        </div>
      </Link>
      {user ? (
        <span>
          <button onClick={() => deletePost(blog.id)}>delete</button>
          <button onClick={handleEditBtn}>edit</button>
        </span>
      ) : null}
    </div>
  );
}

export default Post;
