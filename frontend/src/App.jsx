import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


//pages

import Home from './pages/home/Home'
import Blog from './pages/blog/Blog';
import NotFound from "./pages/not-found/NotFound";

// components import
import Nav from "./components/nav/Nav";
import PostDetails from './components/post-details/PostDetails';
import Login from './pages/login/Login';
import CreatePost from './pages/create-post/CreatePost';



function App() {
 

  return (
    <div className="container">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/blog" element={<Blog />} />
          <Route path="/create-post" element={<CreatePost/>}/>
          <Route path="/blog/:id" element={<PostDetails />} />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App
