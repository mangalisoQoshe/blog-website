import useAuth from "../../context/authContext/useAuth";
import styles from "./Post.module.css";
import { Link, useNavigate } from "react-router-dom";
import { CalenderIcon,TagIcon } from "../icons/Icons";

function Post({ blog, deleteBlog }) {
  const navigate = useNavigate();
  const { currentUser } = useAuth();



  const handleEditBtn = () => {
    navigate("/edit-blog", { state: blog });
  };



  return (
    <div className={styles["blog-post"]}>
      <Link to={"/blog/" + blog.id}>
        <div className={styles.content}>
          <h1 className={styles.title}>{blog.title}</h1>
          <div className={styles.description}>
            <p className={styles.date}>
              <CalenderIcon />{" "}
              {new Date(blog.createdAt.slice(0, 10)).toDateString()}
            </p>
            { blog.tags.length > 0 ?
              (<div>
                <TagIcon />
                {blog.tags.map((tag) => tag.concat(" "))}
              </div>) :""
            }
          </div>

          <div>
            <p
              className={styles.brief}
              dangerouslySetInnerHTML={{ __html: blog.brief }}
            />
          </div>
        </div>
      </Link>
      {currentUser ? (
        <span>
          <button className={`btn`} onClick={() => deleteBlog(blog.id)}>delete</button>
          <button className={`btn`} onClick={handleEditBtn}>edit</button>
        </span>
      ) : null}
    </div>
  );
}

export default Post;
