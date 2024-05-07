import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Login from './pages/Login';
import Profile from './pages/Profile';
import JobPage from './pages/JobPage';


function App() {
 

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path = "/register" element = {<SignIn/>}/>
      <Route path = "/login" element = {<Login/>}/>
      <Route path='/profile' element = {<Profile/>}/>
      <Route path='/job' element = {<JobPage/>}/>

    </Routes>
    </BrowserRouter>
  )
}

export default App
