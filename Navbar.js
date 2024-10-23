// import React from 'react';
// import { Link } from 'react-router-dom';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// function Navbar() {
//   return (
//     <nav className="bg-blue-600 p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <h1 className="text-white text-2xl font-bold">NewsMenia</h1>
//         <div className="space-x-4">
//           <Link to="/" className="text-white hover:text-gray-200">
//             Home
//           </Link>
//           <Link to="/about-us" className="text-white hover:text-gray-200">
//             About Us
//           </Link>
//           <Link to="/login" className="text-white hover:text-gray-200">
//             Login
//           </Link>
//           <Link to="/register" className="text-white hover:text-gray-200">
//             Register
//           </Link>
//           <button>
//          <AccountCircleIcon sx={{ color: 'black', fontSize: '40px' }} />
//            </button>
         
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
// 


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

// function Navbar() {
//   const [open, setOpen] = useState(false);

//   // Function to handle opening the modal
//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   // Function to handle closing the modal
//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <nav className="bg-blue-600 p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <h1 className="text-white text-2xl font-bold">NewsMenia</h1>
//         <div className="space-x-4">
//           <Link to="/" className="text-white hover:text-gray-200">
//             Home
//           </Link>
//           <Link to="/about-us" className="text-white hover:text-gray-200">
//             About Us
//           </Link>
//           <Link to="/login" className="text-white hover:text-gray-200">
//             Login
//           </Link>
//           <Link to="/register" className="text-white hover:text-gray-200">
//             Register
//           </Link>
//           <button onClick={handleClickOpen}>
//             <AccountCircleIcon sx={{ color: 'black', fontSize: '40px' }} />
//           </button>
//         </div>
//       </div>

//       {/* Modal for User Profile */}
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         PaperProps={{
//           style: {
//             position: 'absolute',
//             top: '60px', // Adjust this value as needed to align with the navbar
//             right: '20px', // Distance from the right side of the viewport
//             width: '350px',
//             height:'400px', // Width of the profile dialog
//             borderRadius: '10px', // Optional: rounded corners
//           },
//         }}
//       >
//         {/* <DialogTitle> <AccountCircleIcon sx={{ color: 'black', alignItems:'center' ,fontSize: '100px',marginLeft:'100px',textAlign: 'center' }}/></DialogTitle> */}
//         <DialogTitle
//       sx={{
//         display: 'flex',         // Use flexbox
//         justifyContent: 'center',// Center horizontally
//         alignItems: 'center',    // Center vertically
//         height: 'auto',         // Set a fixed height for the square
//         width: '200px',          // Set a fixed width for the square
//         backgroundColor: '#f5f5f5', // Optional: Background color
//       }}
//     >
//       <AccountCircleIcon
//         sx={{
//           color: 'black',
//           fontSize: '100px',    // Icon size
//         }}
//       />
//     </DialogTitle>
//         <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          
//           <h2>Your Notes:</h2>

          
//           {/* Add more user details as needed */}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="white">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </nav>
//   );
// }

// export default Navbar
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

// function Navbar() {
//   const [open, setOpen] = useState(false);

//   // Function to handle opening the modal
//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   // Function to handle closing the modal
//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <nav className="bg-black-600 p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <h1 className="text-white text-2xl font-bold">NewsMenia</h1>
//         <div className="space-x-4">
//           <Link to="/" className="text-white hover:text-gray-200">
//             Home
//           </Link>
//           <Link to="/about-us" className="text-white hover:text-gray-200">
//             About Us
//           </Link>
//           <Link to="/login" className="text-white hover:text-gray-200">
//             Login
//           </Link>
//           <Link to="/register" className="text-white hover:text-gray-200">
//             Register
//           </Link>
//           {/* <button onClick={handleClickOpen}>
//             <AccountCircleIcon sx={{ color: 'black', fontSize: '40px' }} />
//           </button> */}
//         </div>
//       </div>

      
//     </nav>
//   );
// }

// export default Navbar;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

function Navbar() {
  const [open, setOpen] = useState(false);

  // Function to handle opening the modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Function to handle closing the modal
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <nav className="bg-black p-4"> {/* Changed 'bg-black-600' to 'bg-black' */}
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">NewsMenia</h1>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-gray-300"> {/* Changed 'hover:text-gray-200' to 'hover:text-gray-300' */}
            Home
          </Link>
          <Link to="/about-us" className="text-white hover:text-gray-300">
            About Us
          </Link>
          <Link to="/login" className="text-white hover:text-gray-300">
            Login
          </Link>
          <Link to="/register" className="text-white hover:text-gray-300">
            Register
          </Link>
          {/* Uncomment if you want to add the account icon */}
          {/* <button onClick={handleClickOpen}>
            <AccountCircleIcon sx={{ color: 'white', fontSize: '40px' }} /> {/* Changed color to white */}
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;



