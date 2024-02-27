import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import blogService from "./services/blog-service/Blog";

//pages

import Home from "./pages/home/Home";
import Blog from "./pages/blog/Blog";
import NotFound from "./pages/not-found/NotFound";

// components import
import Nav from "./components/nav/Nav";
import PostDetails from "./components/post-details/PostDetails";
import Login from "./pages/login/Login";
import CreatePost from "./pages/create-post/CreatePost";

function App() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService
      .getAll()
      .then((blogList) => setBlogs(blogList))
      .catch((err) => {
        console.log("Server offline", err);
      });
  }, []);

  const deletePost = (id) => {
    setBlogs((prevState) => prevState.filter((t) => t.id != id));
  };

  const addBlog=(blog)=>{
     setBlogs((prevState) => [...prevState, blog]);
  }

  return (
    <div className="container">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/blog"
            element={<Blog blogs={blogs} deletePost={deletePost} />}
          />
          <Route
            path="/create-post"
            element={
              <CreatePost
                initialInput={{ title: "", brief: "", content: "", tag: "" }}
                addBlog={addBlog}
              />
            }
          />
          <Route path="/blog/:id" element={<PostDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
