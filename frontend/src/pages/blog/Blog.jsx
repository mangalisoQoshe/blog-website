import { useState } from "react";
import BlogPost from "./blog-post/BlogPost";

function Blog() {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      blog: "Hashnode provides us with it's fun to mess around with. I've experimented with it a lot as you may have noticed so here are all of the tricks I use",
    },
    {
      id: 2,
      blog: "Now I'll preface all of this by saying that you need to be a Hashnode ambassador to",
    },
    {
      id: 3,
      blog: "be able to do a lot of what I'm about to talk about (namely anything using custom",
    },
    {
      id: 4,
      blog: "CSS). If you don't know how to become an ambassador they explain it here - it's pretty easy.",
    },
    { id: 5, blog: "Strap in, it's a little longer of a read but it's well worth it!" },
  
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
      <div>
        {blogs.map((blog) => {
         return <BlogPost key={blog.id} blog={blog.blog} />;
        })}
      </div>
    </div>
  );
}

export default Blog;
