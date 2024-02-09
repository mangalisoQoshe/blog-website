import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// components import
import Nav from "./components/shared/nav/Nav"
import Home from './pages/home/Home'
import Blog from './pages/blog/Blog';


function App() {
 

  return (
    <div className='container'>
        <Router>
          <Nav/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/blog' element={<Blog/>}/>
          </Routes>
        </Router>
    </div>
  )
}

export default App
