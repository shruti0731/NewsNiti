import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowDown, faGlobe, faUserCircle, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import ClearIcon from '@mui/icons-material/Clear';
import NotesIcon from '@mui/icons-material/Notes';
import countries from "./countries";

function Header({ user = {}, onLogout, theme, toggleTheme, selectedCategory = "Top Headlines" }) {
  const [active, setActive] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [counts, setCounts] = useState({ saved: 0, notes: 0, alerts: 0 });

  const profilePopupRef = useRef(null);
  const categoryDropdownRef = useRef(null);
  const countryDropdownRef = useRef(null);

  const categories = ["business", "entertainment", "general", "health", "science", "sports", "technology", "politics"];
  const navigate = useNavigate();
  const location = useLocation();

  const getInitials = (name = "") => {
    const parts = name.trim().split(" ").filter(Boolean);
    if (parts.length === 0) return "U";
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  const isActive = (type) => {
    const path = location.pathname || "";
    if (type === 'allnews') return path.startsWith("/allnews") || path === "/" || path === "";
    if (type === 'topheadlines') return path.startsWith("/top-headlines") || (selectedCategory.toLowerCase() !== "top headlines" && path.includes("/top-headlines"));
    if (type === 'country') return path.startsWith("/country");
    return false;
  };

  const readCounts = () => {
    const saved = (user.saved && Array.isArray(user.saved)) ? user.saved.length : null;
    const notes = (user.notes && Array.isArray(user.notes)) ? user.notes.length : null;
    const alerts = (typeof user.alerts === "number") ? user.alerts : null;

    const lsSaved = window.localStorage.getItem("savedArticles");
    const lsNotes = window.localStorage.getItem("userNotes");
    const lsAlerts = window.localStorage.getItem("alertsCount");

    return {
      saved: saved ?? (lsSaved ? JSON.parse(lsSaved).length : 0),
      notes: notes ?? (lsNotes ? JSON.parse(lsNotes).length : 0),
      alerts: alerts ?? (lsAlerts ? Number(lsAlerts) : 0)
    };
  };

  useEffect(() => {
    setCounts(readCounts());
    const onStorage = (e) => {
      if (!e.key || ["savedArticles", "userNotes", "alertsCount"].includes(e.key)) {
        setCounts(readCounts());
      }
    };
    window.addEventListener("storage", onStorage);
    const interval = setInterval(() => {
      setCounts(prev => {
        const next = readCounts();
        if (next.saved !== prev.saved || next.notes !== prev.notes || next.alerts !== prev.alerts) return next;
        return prev;
      });
    }, 1500);
    return () => { window.removeEventListener("storage", onStorage); clearInterval(interval); };
  }, [user, location.pathname]);

  const handleNotes = () => {
    navigate('/notes');
    setActive(false);
    setShowProfilePopup(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profilePopupRef.current && !profilePopupRef.current.contains(event.target)) setShowProfilePopup(false);
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) setShowCategoryDropdown(false);
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target)) setShowCountryDropdown(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const bgFrom = theme === 'light-theme' ? 'from-indigo-600' : 'from-indigo-700';
  const bgTo = theme === 'light-theme' ? 'to-purple-700' : 'to-purple-800';
  const menuBase = "font-medium px-3 py-2 rounded inline-flex items-center text-white hover:bg-white/20 transition-colors";

  return (
    <nav className={`w-full p-4 flex justify-between items-center sticky top-0 z-50 bg-gradient-to-r ${bgFrom} ${bgTo} shadow-md`}>
      <Link to="/allnews" className="text-3xl font-prata font-bold tracking-tight text-white">NewsNiti</Link>

      <div className="hidden md:flex items-center space-x-4">
        <Link to="/allnews" className={`${menuBase} ${isActive('allnews') ? "bg-white/20" : ""}`}>All News</Link>

        {/* Category Dropdown */}
        <div className="relative" ref={categoryDropdownRef}>
          <button onClick={() => { setShowCategoryDropdown(!showCategoryDropdown); setShowCountryDropdown(false); setShowProfilePopup(false); }} className={`${menuBase} ${isActive('topheadlines') ? "bg-white/20" : ""}`}>
            {selectedCategory} <FontAwesomeIcon className={`ml-2 transition-transform ${showCategoryDropdown ? "rotate-180" : ""}`} icon={faCircleArrowDown} size="sm" />
          </button>
          {showCategoryDropdown && (
            <ul className="absolute left-0 mt-2 w-48 rounded-lg shadow-lg z-50 overflow-hidden bg-white text-gray-900 border">
              {categories.map((el, i) => (
                <li key={i} onClick={() => setShowCategoryDropdown(false)}>
                  <Link to={"/top-headlines/" + el} className="block px-4 py-2 capitalize hover:bg-indigo-100">{el}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Country Dropdown */}
        <div className="relative" ref={countryDropdownRef}>
          <button onClick={() => { setShowCountryDropdown(!showCountryDropdown); setShowCategoryDropdown(false); setShowProfilePopup(false); }} className={`${menuBase} ${isActive('country') ? "bg-white/20" : ""}`}>
            <FontAwesomeIcon icon={faGlobe} size="sm" className="mr-1 text-white" /> Country <FontAwesomeIcon className={`ml-2 transition-transform ${showCountryDropdown ? "rotate-180" : ""}`} icon={faCircleArrowDown} size="sm" />
          </button>
          {showCountryDropdown && (
            <ul className="absolute left-0 mt-2 w-64 rounded-lg shadow-lg z-50 overflow-hidden max-h-80 overflow-y-auto bg-white text-gray-900 border">
              {countries.map((el, idx) => (
                <li key={idx} onClick={() => setShowCountryDropdown(false)}>
                  <Link to={"/country/" + el.iso_2_alpha} className="flex items-center gap-3 px-4 py-2 hover:bg-indigo-100">
                    <img src={el.png} alt={el.countryName} className="w-6 h-auto rounded-sm" /> {el.countryName}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-white/20 transition-colors">
          {theme === 'light-theme' ? <FontAwesomeIcon icon={faMoon} className="text-xl text-white" /> : <FontAwesomeIcon icon={faSun} className="text-xl text-white" />}
        </button>

        {/* Profile Popup */}
        <div className="relative" ref={profilePopupRef}>
          <button onClick={() => { setShowProfilePopup(!showProfilePopup); setShowCategoryDropdown(false); setShowCountryDropdown(false); }} className="cursor-pointer flex items-center gap-2 p-1 rounded-full">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white text-lg">{user && user.name ? getInitials(user.name) : <FontAwesomeIcon icon={faUserCircle} className="text-white" />}</div>
          </button>
          {showProfilePopup && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl shadow-2xl p-4 border ring-1 ring-offset-2 z-50 bg-gradient-to-r from-blue-320 via-purple-120 to-blue-120 text-white">
              <button className="absolute top-3 right-3 hover:text-red-400" onClick={() => setShowProfilePopup(false)}><ClearIcon fontSize="small" sx={{ color: 'white' }} /></button>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-xl font-semibold">{getInitials(user.name || "")}</div>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold truncate text-white">{user.name ?? "Guest User"}</h3>
                  <p className="text-sm truncate">{user.email ?? "guest@example.com"}</p>
                  <p className="text-xs mt-1">{user.role ?? 'Student • Learner'}</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                {["Saved", "Notes", "Alerts"].map((label, idx) => (
                  <div key={idx} className="py-2 rounded bg-white/20">
                    <div className="text-sm font-semibold">{label}</div>
                    <div className="text-xs mt-1">{counts[label.toLowerCase()]}</div>
                  </div>
                ))}
              </div>

              <hr className="my-4 border-white/30" />
              <div className="space-y-2">
                <button onClick={handleNotes} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium justify-center bg-white/20 hover:bg-white/30 text-white transition-colors">
                  <NotesIcon sx={{ color: 'white' }} /> Your Notes
                </button>
                <button onClick={() => { onLogout && onLogout(); setShowProfilePopup(false); }} className="w-full px-3 py-2 rounded-lg font-medium bg-red-500 hover:bg-red-600 text-white transition-colors">Logout</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;