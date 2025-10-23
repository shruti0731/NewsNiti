import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';


import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Login from './components/Login';
import Register from './components/Register';
import AllNews from './components/AllNews';
import TopHeadlines from './components/TopHeadlines'; 
import NotesPage from './components/NotesPage';
import CountryNews from './components/CountryNews'; 
import TopicsPage from './components/TopicsPage';
import Navbar from './components/Navbar'; 
import Header from './components/Header'; 
import Footer from './components/Footer'; 
import Contact from './components/contact'; 

function AppContent() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light-theme');
  const [noteToPass, setNoteToPass] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light-theme' ? 'dark-theme' : 'light-theme');
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleAddNoteAndNavigate = (note) => {
    setNoteToPass(note);
    navigate('/notes');
  };

  const clearPassedNote = () => {
    setNoteToPass(null);
  };
  
  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
    navigate('/login');
  };
  const pageProps = {
    user,
    theme,
    toggleTheme,
    onAddNote: handleAddNoteAndNavigate,
  };

  return (
    <>
      {user ? (
        <Header 
          user={user} 
          onLogout={handleLogout} 
          theme={theme} 
          toggleTheme={toggleTheme} 
        />
      ) : (
        <Navbar />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route 
          path="/login" 
          element={<Login onLogin={handleLogin} />} 
        />
        <Route path="/register" element={<Register />} />
        <Route path="/allnews" element={<AllNews {...pageProps} />} />
        <Route path="/top-headlines/:category" element={<TopHeadlines {...pageProps} />} />
        <Route path="/country/:iso" element={<CountryNews {...pageProps} />} /> 
        <Route path="/topics" element={<TopicsPage/>}/>
        <Route path="/contact" element={<Contact/>}/>
        
        <Route 
          path="/notes" 
          element={
            <NotesPage 
              {...pageProps} 
              initialNote={noteToPass} 
              onPageLoad={clearPassedNote}
            />
          } 
        />
      </Routes>
      <Footer />
    </>
  );
}
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;