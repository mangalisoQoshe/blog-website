import styles from "./Blog.module.css";

import Post from "../../components/post/Post";
import ErrorMsg from "./ErrorMsg";

function Blog({ blogs, deleteBlog, errorMessage }) {
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
