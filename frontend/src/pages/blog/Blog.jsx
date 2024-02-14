import { useState } from "react";
import styles from "./Blog.module.css"


import BlogPost from "./blog-post/BlogPost";

function Blog() {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      date: "May 04 2013",
      title: "Hashnode Benefits",
      topic: "hosting",
      post: "Hashnode provides us with it's fun to mess around with. I've experimented with it a lot as you may have noticed so here are all of the tricks I use",
    },
    {
      id: 2,
      date: "May 04 2023",
      title: "Hashnode ambassador",
      topic: "hosting",
      post: "Now I'll preface all of this by saying that you need to be a Hashnode ambassador to",
    },
    {
      id: 3,
      date: "June 04 2013",
      title: " Benefits",
      topic: "lifestyle",
      post: "be able to do a lot of what I'm about to talk about (namely anything using custom",
    },
    {
      id: 4,
      date: "July 04 2013",
      title: "CSS Benefits",
      topic: "styling",
      post: "CSS. If you don't know how to become an ambassador they explain it here - it's pretty easy.",
    },
    {
      id: 5,
      date: "March 04 2023",
      title: "Netflix vs Amazon prime",
      topic: "tv",
      post: "Strap in, it's a little longer of a read but it's well worth it!",
    },
  ]);
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
