import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import'react-toastify/dist/ReactToastify.min.css';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Compose from './pages/Compose';
import SingleBlogPost from './pages/SingleBlogPost';
import ContactUs from './pages/ContactUs';
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';
import Navigation from './components/navigation/Navigation';
import { auth } from './firebase/firebase';
import { signOut } from 'firebase/auth';

function App() {
  const [active, setActive] = useState("home");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect (() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      }else {
        setUser(null);
      }
    });
  }, []);

  const handelLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setActive("login");
      navigate("/auth");
    });
  };

  return (
    <div className="App">
      <Navigation setActive={setActive} active={active} user={user} handleLogout={handelLogout} />
      <ToastContainer position='top-center'/>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/compose" element={<Compose />} />
        <Route path="/about" element={<About />} />
        <Route path="/update" element={<SingleBlogPost />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/auth" element={<Auth setActive={setActive}/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>    
    </div>
  );
}

export default App;
