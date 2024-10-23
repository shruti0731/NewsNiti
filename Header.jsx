
import React, { useState, useEffect, useRef, useNavigate } from "react"; // Import useRef
import { Link } from 'react-router-dom';
import countries from "./countries";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowDown } from '@fortawesome/free-solid-svg-icons';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ClearIcon from '@mui/icons-material/Clear';
import NotesIcon from '@mui/icons-material/Notes';

function Header({user}) {
  const [active, setActive] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [theme, setTheme] = useState("light-theme");
  const [loadingProfile, setLoadingProfile] = useState(true);
  const profilePopupRef = useRef(null); // Create a ref for the profile popup

  const category = ["business", "entertainment", "general", "health", "science", "sports", "technology", "politics"];

  console.log(user);
  const naviagate = useNavigate();


  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light-theme" ? "dark-theme" : "light-theme");
  };

  // Simulate loading profile data
  useEffect(() => {
    if (showProfilePopup) {
      setLoadingProfile(true);
      const timer = setTimeout(() => {
        setLoadingProfile(false);
      }, 2000); // Simulate loading for 2 seconds

      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [showProfilePopup]);

  // Handle logout
  const handleLogout = () => {
    console.log("Logged out"); // Placeholder for logout action
  };

  // Close profile popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profilePopupRef.current && !profilePopupRef.current.contains(event.target)) {
        setShowProfilePopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  const handleNotes = () => {
    navigate('/notes');
  }

  return (
    <header>
      <nav className="fixed top-0 left-0 w-full h-auto bg-gray-800 z-10 flex items-center justify-around">
        <h3 className="relative heading font-bold md:basis-1/6 text-2xl xs:basis-4/12 z-50 mb-5 mt-5">
          News_Aggregator
        </h3>

        <ul className={active ? "nav-ul flex gap-11 md:gap-14 xs:gap-12 lg:basis-3/6 md:basis-4/6 md:justify-end active" : "nav-ul flex gap-14 lg:basis-3/6 md:basis-4/6 justify-end"}>
          <li>
            <Link className="no-underline font-semibold" to="/" onClick={() => setActive(!active)}>
              All News
            </Link>
          </li>

          {/* Category Dropdown */}
          <li className="dropdown-li">
            <Link className="no-underline font-semibold flex items-center gap-2" onClick={() => { setShowCategoryDropdown(!showCategoryDropdown); setShowCountryDropdown(false); }}>
              Top-Headlines <FontAwesomeIcon className={showCategoryDropdown ? "down-arrow-icon down-arrow-icon-active" : "down-arrow-icon"} icon={faCircleArrowDown} />
            </Link>
            <ul className={showCategoryDropdown ? "dropdown p-2 show-dropdown" : "dropdown p-2"}>
              {category.map((element, index) => (
                <li key={index} onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}>
                  <Link to={"/top-headlines/" + element} className="flex gap-3 capitalize" onClick={() => setActive(!active)}>
                    {element}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          {/* Country Dropdown */}
          <li className="dropdown-li">
            <Link className="no-underline font-semibold flex items-center gap-2" onClick={() => { setShowCountryDropdown(!showCountryDropdown); setShowCategoryDropdown(false); }}>
              Country <FontAwesomeIcon className={showCountryDropdown ? "down-arrow-icon down-arrow-icon-active" : "down-arrow-icon"} icon={faCircleArrowDown} />
            </Link>
            <ul className={showCountryDropdown ? "dropdown p-2 show-dropdown" : "dropdown p-2"}>
              {countries.map((element, index) => (
                <li key={index} onClick={() => setShowCountryDropdown(!showCountryDropdown)}>
                  <Link to={"/country/" + element?.iso_2_alpha} className="flex gap-3" onClick={() => setActive(!active)}>
                    <img src={element?.png} srcSet={`https://flagcdn.com/32x24/${element?.iso_2_alpha}.png 2x`} alt={element?.countryName} />
                    <span>{element?.countryName}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          {/* Theme Toggle */}
          <li>
            <Link className="no-underline font-semibold" to="#" onClick={toggleTheme}>
              <input type="checkbox" className="checkbox" id="checkbox" />
              <label htmlFor="checkbox" className="checkbox-label">
                <i className="fas fa-moon"></i>
                <i className="fas fa-sun"></i>
                <span className="ball"></span>
              </label>
            </Link>
          </li>

          {/* Profile Icon */}
          <li className="relative">
            <AccountCircleIcon
              className="text-white cursor-pointer"
              fontSize="large"
              onClick={() => setShowProfilePopup(!showProfilePopup)}
            />
            {showProfilePopup && (
              <div
                ref={profilePopupRef} // Attach the ref to the popup
                className={`absolute right-0 mt-2 rounded-lg shadow-lg z-50 p-2 
                ${theme === "light-theme" ? "bg-white text-black" : "bg-gray-900 text-white"}`}
                style={{ width: '300px', maxHeight: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflowY: 'auto' }} // Use flexbox and set max height
              >


                {loadingProfile ? (
                  <div className="flex items-center justify-center h-full">
                    <span style={{ color: 'red', fontSize: '25px' }}>Loading.....</span>
                  </div>
                ) : (
                   <div style={{padding: '20px', position: 'relative' }}>
                    <h2 style={{ textAlign: 'center', color: theme === "light-theme" ? 'black' : 'white', fontSize: '30px' }}>
                    <AccountCircleIcon
              className="text-white cursor-pointer"
              fontSize="large"/> {user.name}
                    
  </h2>
  <br></br>
                    <p style={{ textAlign: 'center', color: theme === "light-theme" ? 'black' : 'white', fontSize: '20px' }}>
                      {user.email}
                    </p>
                   </div>
                )}

                {/* Close Button */}
                <button
                style={{
                   position: 'absolute', // Position the button absolutely
            top: '10px', // Adjust this value as needed
            right: '10px', // Adjust this value as needed
            color: 'red',
            height: '10px',
            width: '30px',
            fontSize: '20px',
            border: 'none'
                }}
                  onClick={() => setShowProfilePopup(false)} // Close action
                >
                  <ClearIcon/>
                </button>
                          <div style={{ textAlign: 'center' }}>
                <h3 onClick={handleNotes} style={{color: theme === "light-theme" ? 'black' : 'white'}}><NotesIcon />Your Notes:</h3>
                
</div>

              </div>
            )}
          </li>
        </ul>

        {/* Hamburger Menu */}
        <div className={active ? "ham-burger z-index-100 ham-open" : "ham-burger z-index-100"} onClick={() => setActive(!active)}>
          <span className="lines line-1"></span>
          <span className="lines line-2"></span>
          <span className="lines line-3"></span>
        </div>
      </nav>
    </header>
  );
}

export default Header;
// import React, { useState, useEffect, useRef } from "react"; // Import useRef
// import { Link } from 'react-router-dom';
// import countries from "./countries";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCircleArrowDown } from '@fortawesome/free-solid-svg-icons';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import ClearIcon from '@mui/icons-material/Clear';
// import NotesIcon from '@mui/icons-material/Notes';
// function Header({ user, news =[]}) { // Add 'news' prop to pass the list of news articles
//   const [active, setActive] = useState(false);
//   const [showCountryDropdown, setShowCountryDropdown] = useState(false);
//   const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
//   const [showProfilePopup, setShowProfilePopup] = useState(false);
//   const [theme, setTheme] = useState("light-theme");
//   const [loadingProfile, setLoadingProfile] = useState(true);
//   const profilePopupRef = useRef(null);

//   const category = ["business", "entertainment", "general", "health", "science", "sports", "technology", "politics","education"];

//   console.log(user);

//   useEffect(() => {
//     document.body.className = theme;
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme(theme === "light-theme" ? "dark-theme" : "light-theme");
//   };

//   useEffect(() => {
//     if (showProfilePopup) {
//       setLoadingProfile(true);
//       const timer = setTimeout(() => {
//         setLoadingProfile(false);
//       }, 2000);

//       return () => clearTimeout(timer);
//     }
//   }, [showProfilePopup]);

//   // Close profile popup when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (profilePopupRef.current && !profilePopupRef.current.contains(event.target)) {
//         setShowProfilePopup(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // Filter education-related news
//   const educationNews = news.filter((article) => article.category === "education");
//   console.log("news",educationNews);

//   return (
//     <header>
//       <nav className="fixed top-0 left-0 w-full h-auto bg-gray-800 z-10 flex items-center justify-around">
//         <h3 className="relative heading font-bold md:basis-1/6 text-2xl xs:basis-4/12 z-50 mb-5 mt-5">
//           News_Aggregator
//         </h3>

//         <ul className={active ? "nav-ul flex gap-11 md:gap-14 xs:gap-12 lg:basis-3/6 md:basis-4/6 md:justify-end active" : "nav-ul flex gap-14 lg:basis-3/6 md:basis-4/6 justify-end"}>
//           <li>
//             <Link className="no-underline font-semibold" to="/" onClick={() => setActive(!active)}>
//               All News
//             </Link>
//           </li>

//           {/* Category Dropdown */}
//           <li className="dropdown-li">
//             <Link className="no-underline font-semibold flex items-center gap-2" onClick={() => { setShowCategoryDropdown(!showCategoryDropdown); setShowCountryDropdown(false); }}>
//               Top-Headlines <FontAwesomeIcon className={showCategoryDropdown ? "down-arrow-icon down-arrow-icon-active" : "down-arrow-icon"} icon={faCircleArrowDown} />
//             </Link>
//             <ul className={showCategoryDropdown ? "dropdown p-2 show-dropdown" : "dropdown p-2"}>
//               {category.map((element, index) => (
//                 <li key={index} onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}>
//                   <Link to={"/top-headlines/" + element} className="flex gap-3 capitalize" onClick={() => setActive(!active)}>
//                     {element}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </li>

//           {/* Country Dropdown */}
//           <li className="dropdown-li">
//             <Link className="no-underline font-semibold flex items-center gap-2" onClick={() => { setShowCountryDropdown(!showCountryDropdown); setShowCategoryDropdown(false); }}>
//               Country <FontAwesomeIcon className={showCountryDropdown ? "down-arrow-icon down-arrow-icon-active" : "down-arrow-icon"} icon={faCircleArrowDown} />
//             </Link>
//             <ul className={showCountryDropdown ? "dropdown p-2 show-dropdown" : "dropdown p-2"}>
//               {countries.map((element, index) => (
//                 <li key={index} onClick={() => setShowCountryDropdown(!showCountryDropdown)}>
//                   <Link to={"/country/" + element?.iso_2_alpha} className="flex gap-3" onClick={() => setActive(!active)}>
//                     <img src={element?.png} srcSet={`https://flagcdn.com/32x24/${element?.iso_2_alpha}.png 2x`} alt={element?.countryName} />
//                     <span>{element?.countryName}</span>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </li>

//           {/* Theme Toggle */}
//           <li>
//             <Link className="no-underline font-semibold" to="#" onClick={toggleTheme}>
//               <input type="checkbox" className="checkbox" id="checkbox" />
//               <label htmlFor="checkbox" className="checkbox-label">
//                 <i className="fas fa-moon"></i>
//                 <i className="fas fa-sun"></i>
//                 <span className="ball"></span>
//               </label>
//             </Link>
//           </li>

//           {/* Profile Icon */}
//           <li className="relative">
//             <AccountCircleIcon
//               className="text-white cursor-pointer"
//               fontSize="large"
//               onClick={() => setShowProfilePopup(!showProfilePopup)}
//             />
//             {showProfilePopup && (
//               <div
//                 ref={profilePopupRef}
//                 className={`absolute right-0 mt-2 rounded-lg shadow-lg z-50 p-2 
//                 ${theme === "light-theme" ? "bg-white text-black" : "bg-gray-900 text-white"}`}
//                 style={{ width: '300px', maxHeight: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflowY: 'auto' }}
//               >
//                 {loadingProfile ? (
//                   <div className="flex items-center justify-center h-full">
//                     <span style={{ color: 'red', fontSize: '25px' }}>Loading.....</span>
//                   </div>
//                 ) : (
//                    <div style={{padding: '20px', position: 'relative' }}>
//                     <h2 style={{ textAlign: 'center', color: theme === "light-theme" ? 'black' : 'white', fontSize: '30px' }}>
//                       <AccountCircleIcon
//                         className="text-white cursor-pointer"
//                         fontSize="large"
//                       /> {user.name}
//                     </h2>
//                     <br></br>
//                     <p style={{ textAlign: 'center', color: theme === "light-theme" ? 'black' : 'white', fontSize: '20px' }}>
//                       {user.email}
//                     </p>

//                     {/* Education News Section */}
//                     <div style={{textAlign:'center', marginTop: '20px'}}>
//                       <h3>Education News:</h3>
//                       {educationNews.length > 0 ? (
//                         <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
//                           {educationNews.map((newsItem, index) => (
//                             <li key={index} style={{ margin: '10px 0', color: theme === "light-theme" ? 'black' : 'white' }}>
//                               <Link to={`/news/${newsItem.id}`} className="news-link">
//                                 {newsItem.title}
//                               </Link>
//                             </li>
//                           ))}
//                         </ul>
//                       ) : (
//                         <p>No education-related news available.</p>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 <button
//                   style={{
//                     position: 'absolute',
//                     top: '10px',
//                     right: '10px',
//                     color: 'red',
//                     height: '10px',
//                     width: '30px',
//                     fontSize: '20px',
//                     border: 'none'
//                   }}
//                   onClick={() => setShowProfilePopup(false)}
//                 >
//                   <ClearIcon />
//                 </button>
//               </div>
//             )}
//           </li>
//         </ul>

//         {/* Hamburger Menu */}
//         <div className={active ? "ham-burger z-index-100 ham-open" : "ham-burger z-index-100"} onClick={() => setActive(!active)}>
//           <span className="lines line-1"></span>
//           <span className="lines line-2"></span>
//           <span className="lines line-3"></span>
//         </div>
//       </nav>
//     </header>
//   );
// }

// export default Header;







