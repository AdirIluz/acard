import { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { getUserByEmail } from './services/usersService';
import './App.css';
import Favorites from './components/Favorites';
import About from './components/About';
import MyCards from './components/MyCards';
import Sandbox from './components/Sandbox';
import AddCard from './components/AddCard';
import UpdateCard from './components/UpdateCard';
import CardDetails from './components/CardDetails';
import store from './redux/store';
import Footer from './components/Footer';
import UpdateUser from './components/UpdateUser';

const theme = {
  light: {
    color: "light-mode-color",
    background: "light-mode-bgc"
  },
  dark: {
    color: "dark-mode-color",
    background: "dark-mode-bgc"
  }
}
export const SiteTheme = createContext(theme.light);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(sessionStorage.getItem("isLoggedIn") === "true");
  const [user, setUser] = useState({});
  const [isDarkMode, setDarkMode] = useState<boolean>(false);


  useEffect(() => {
    if (isLoggedIn) {
      const userEmail = sessionStorage.getItem("userEmail") as string;
      getUserByEmail(userEmail)
        .then((res) =>
          setUser(res.data[0])
        ).catch((err) => console.log(err));
    } else {
      setUser({});
    }
    if (sessionStorage.getItem("darkMode") === "true") {
      setDarkMode(true)
    }
  }, [isLoggedIn, isDarkMode]);

  return (
    <SiteTheme.Provider value={isDarkMode ? theme.dark : theme.light}>
      <div className="App">
        <ToastContainer />
        <Provider store={store}>
          <Router>
            <Navbar user={user} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isDarkMode={isDarkMode} setDarkMode={setDarkMode} />
            <Routes>
              <Route path='/' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
              <Route path='/register' element={<Register />} />
              <Route path="/home" element={<Home user={user} />} />
              <Route path="/favorites/:id" element={<Favorites user={user} />} />
              <Route path="/about" element={<About />} />
              <Route path="/my-cards/:userId" element={<MyCards user={user} />} />
              <Route path="/sandbox" element={<Sandbox user={user} />} />
              <Route path="/add-card" element={<AddCard user={user} />} />
              <Route path="/home/update-card/:id" element={<UpdateCard user={user} />} />
              <Route path="/home/update-user/:id" element={<UpdateUser user={user} setUser={setUser} />} />
              <Route path="/card-details/:id" element={<CardDetails />} />
            </Routes>
            <Footer user={user} isLoggedIn={isLoggedIn} />
          </Router>
        </Provider>
      </div>
    </SiteTheme.Provider>

  );
}

export default App;
