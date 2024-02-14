import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// components import
import Nav from "./components/shared/nav/Nav"
import Home from './pages/home/Home'
import Blog from './pages/blog/Blog';
import Post from './pages/blog/blog-post/post/Post';


function App() {
 

  return (
    <div className="container">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<Post />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App
