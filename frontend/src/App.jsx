import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


//pages

import Home from './pages/home/Home'
import Blog from './pages/blog/Blog';
import NotFound from "./pages/notFound/NotFound";

// components import
import Nav from "./components/shared/nav/Nav";
import PostDetails from './components/post-details/PostDetails';
import Login from './pages/login/Login';



function App() {
 

  return (
    <div className="container">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<PostDetails />} />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App
