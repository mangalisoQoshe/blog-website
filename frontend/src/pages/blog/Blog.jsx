import styles from "./Blog.module.css";
import Post from "../../components/post/Post";
import ErrorMsg from "./ErrorMsg";
import Spinner from "../../components/spinner/Spinner";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function Blog({ blogs, deleteBlog, errorMessage }) {
  const [filteredText, setFilteredText] = useState("");
  const [blogList, setBlogList] = useState([]);

  useEffect(() => {
    document.title = "Samke's Blog"; 
  }, []);

  useEffect(() => {
    // Filter the blog list based on the filtered text
    const filteredItems = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(filteredText.toLowerCase())
    );
    setBlogList(filteredItems);
  }, [blogs, filteredText]); 

  if (blogs.length === 0 && errorMessage === null) {
    return <Spinner />;
  }

  return (
    <div className={styles.container}>
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
              value={filteredText}
              onChange={(e) => setFilteredText(e.target.value)}
              className={styles["search-bar"]}
            />
          </form>
          <div className={styles.blogs}>
            {blogList.length > 0 ? (
              blogList.map((blog) => (
                <Post key={blog.id} blog={blog} deleteBlog={deleteBlog} />
              ))
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "4rem",
                }}
              >
                Oh no.. we{"'"}re encountering issues while loading blog posts.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

Blog.propTypes = {
  blogs: PropTypes.array.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  errorMessage:PropTypes.string
};

export default Blog;
