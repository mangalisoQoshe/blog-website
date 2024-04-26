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
import CreateBlog from "./pages/create-blog/CreateBlog";
import RequireAuth from "./components/require-auth/RequireAuth";
import EditBlog from "./pages/edit-blog/EditBlog";
import useAuth from "./context/authContext/useAuth";
import Notification from "./components/notification/Notification";

function App() {
  const [blogs, setBlogs] = useState([]);
  const { currentUser } = useAuth();
  const [errorMessage, setErrorMessage] = useState(null); //handles error message display for the blog component
  const [notify, setNotify] = useState({ message: "", level: "" });

  useEffect(() => {
    blogService
      .getAll()
      .then((blogList) => {
        setBlogs(blogList.blogs);
        setErrorMessage(null);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("Ooops! Something went wrong. Please try again later.");
      });
  }, []);

  const deleteBlog = async (id) => {
    try {
      const response = await blogService.deleteBlog(id, currentUser.uid);
      setBlogs((prevState) => prevState.filter((t) => t.id != id));
      setNotify({ message: response.message, level: "success" });
      setTimeout(() => {
        setNotify({ message: "", level: "" });
      }, 5000);
    } catch (error) {
      setNotify({ message: error.error, level: "error" });
      setTimeout(() => {
        setNotify({ message: "", level: "" });
      }, 5000);
    }
  };

  const addBlog = async (blog) => {
    try {
      const response = await blogService.create(blog, currentUser.uid);
      setBlogs((prevState) => [...prevState, response.blog]);
      setNotify({ message: "Blog created successfully", level: "success" });
      setTimeout(() => {
        setNotify({ message: "", level: "" });
      }, 5000);
    } catch (error) {
      setNotify({ message: error.error, level: "error" });
      setTimeout(() => {
        setNotify({ message: "", level: "" });
      }, 5000);
    }
  };

  const updateBlog = async (blog) => {
    try {
      const response = await blogService.update(blog, currentUser.uid);
      setBlogs((prevState) =>
        prevState.map((b) => (b.id === blog.id ? response.blog : b))
      );
      setNotify({ message: "Blog updated successfully", level: "success" });
      setTimeout(() => {
        setNotify({ message: "", level: "" });
      }, 5000);
    } catch (error) {
      setNotify({ message: error.error, level: "error" });
      setTimeout(() => {
        setNotify({ message: "", level: "" });
      }, 5000);
    }
  };

  return (
    <div className="container">
      <Router>
        <Nav />
        <Notification notify={notify} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/blog"
            element={
              <Blog
                blogs={blogs}
                deleteBlog={deleteBlog}
                errorMessage={errorMessage}
              />
            }
          />
          <Route
            path="/create-blog"
            element={
              <RequireAuth>
                <CreateBlog insertBlog={addBlog} />
              </RequireAuth>
            }
          />

          <Route
            path="/edit-blog"
            element={
              <RequireAuth>
                <EditBlog updateBlog={updateBlog} />
              </RequireAuth>
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
