import { useState,useEffect } from "react";
import styles from "./Blog.module.css"
import axios from "axios"


import BlogPost from "./blog-post/BlogPost";

function Blog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(()=>{
    axios.get("/api/posts")
    .then((response)=>setBlogs(response.data))
  })
  return (
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
         return <BlogPost key={blog.id} blog={blog} />;
        })}
      </div>
    </div>
  );
}

export default Blog;
