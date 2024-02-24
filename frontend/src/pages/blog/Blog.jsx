import { useState,useEffect } from "react";
import styles from "./Blog.module.css"
import blogService from "../../services/blog-service/Blog";


import Post from "../../components/post/Post";

function Blog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(()=>{
   blogService
   .getAll()
   .then(blogList=>setBlogs(blogList))
   .catch((err)=>{console.log("Server offline",err)})
  },[])
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
         
         return <Post key={blog.id} blog={blog} />;
        })}
      </div>
    </div>
  );
}

export default Blog;
