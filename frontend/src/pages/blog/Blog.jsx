import { useState,useEffect } from "react";
import styles from "./Blog.module.css"



import Post from "../../components/post/Post";
import EditorComponent from "../../components/txt-editor/EditorComponent";

function Blog({ blogs, deletePost }) {
  const [edit, setEdit] = useState({ isEdit: false, blogToEdit: "" });



  return (
    <div>
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
            return <Post key={blog.id} blog={blog} deletePost={deletePost} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Blog;
