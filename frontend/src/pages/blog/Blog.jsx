import styles from "./Blog.module.css";

import Post from "../../components/post/Post";
import ErrorMsg from "./ErrorMsg";
import Spinner from "../../components/spinner/Spinner";

function Blog({ blogs, deleteBlog, errorMessage }) {
  if (blogs.length === 0 && errorMessage === null) {
    return <Spinner />;
  }

  return (
    <div>
      {errorMessage !== null ? (
        <ErrorMsg message={errorMessage} />
      ) : (
        <div>
          <h1>Welcome</h1>
          <form>
            <input
              type="text"
              name="searchBar"
              id="searchBar"
              placeholder="Search Posts"
              className={styles["search-bar"]}
            />
          </form>
          <div className={styles.blogs}>
            {blogs.map((blog) => {
              return <Post key={blog.id} blog={blog} deleteBlog={deleteBlog} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Blog;
