

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/login', {
        email: username,
        password,
      });

      if (response.data.success) {
        const userData = response.data.user; // Assuming response.data.user is 
        const userd={
          email:userData.email,
          name:userData.name
        }
        
        onLogin(userd); // Call the onLogin function to indicate the user is logged in
        navigate('/allnews'); // Redirect to the news page after successful login
      } else {
        
        setError(response.data.message); // Show error message
      }
    } catch (error) {
      setError('An error occurred, please try again.'); // Handle fetch error
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register'); // Navigate to the registration page
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh', // Use full height
        backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHkOhVySfXMhsTWEs_yCeFFO1sNCeCsNv1wg&s")', // Set your background image
        backgroundSize: 'cover', // Ensure the image covers the entire container
        backgroundPosition: 'center', // Center the background image
        padding: '30px',
      }}
    >
      <h1 style={{ color: 'black', fontSize: '20px', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)' }}>Login</h1>
      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>} {/* Display error message */}
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.8)', 
          padding: '20px',
          borderRadius: '5px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
          width: '300px',
          textAlign: 'center',
        }}
      >
        <input
          type="text"
          placeholder="Email"
          required
          style={{
            margin: '10px 0',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            width: '100%',
            fontSize: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly transparent white for inputs
          }}
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Update state on input change
        />
        <input
          type="password"
          placeholder="Password"
          required
          style={{
            margin: '10px 0',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            width: '100%',
            fontSize: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly transparent white for inputs
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update state on input change
        />
        <button
          type="submit"
          style={{
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            padding: '10px',
            cursor: 'pointer',
            width: '100%',
            fontSize: '20px',
          }}
        >
          Login
        </button>
      </form>
      <p style={{ color: 'black', fontSize: '20px' }}>
        Not Registered?{' '}
        <span
          style={{
            marginTop: '10px',
            cursor: 'pointer',
            color: 'red',
            textDecoration: 'underline',
            fontSize: '25px'
          }}
          onClick={handleRegisterRedirect}
        >
          Register here
        </span>
      </p>
    </div>
  );
};

export default Login;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Login = ({ onLogin, setUser }) => { // Accept setUser as a prop
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate(); // Initialize useNavigate

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:5000/login', {
//         email: username,
//         password,
//       });
      

//       if (response.data.success) {
//         // const userData = response.data.user; // Assuming response.data.user is 
//         // const userd={
//         //   email:userData.email,
//         //   name:userData.name
//         // }
//         // setUser(userd);
//         console.log(userd)
//         onLogin(); // Call the onLogin function to indicate the user is logged in
//         setUser(response.data.user); // Store user information
//         navigate('/allnews'); // Redirect to the news page after successful login
//       } else {
//         setError(response.data.message); // Show error message
//       }
//     } catch (error) {
//       setError('An error occurred, please try again.'); // Handle fetch error
//     }
//   };

//   const handleRegisterRedirect = () => {
//     navigate('/register'); // Navigate to the registration page
//   };

//   return (
//     <div
//       style={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         minHeight: '100vh', // Use full height
//         backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHkOhVySfXMhsTWEs_yCeFFO1sNCeCsNv1wg&s")', // Set your background image
//         backgroundSize: 'cover', // Ensure the image covers the entire container
//         backgroundPosition: 'center', // Center the background image
//         padding: '30px',
//       }}
//     >
//       <h1 style={{ color: 'black', fontSize: '20px', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)' }}>Login</h1>
//       {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>} {/* Display error message */}
//       <form
//         onSubmit={handleSubmit}
//         style={{
//           backgroundColor: 'rgba(0, 0, 0, 0.8)', 
//           padding: '20px',
//           borderRadius: '5px',
//           boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
//           width: '300px',
//           textAlign: 'center',
//         }}
//       >
//         <input
//           type="text"
//           placeholder="Email"
//           required
//           style={{
//             margin: '10px 0',
//             padding: '10px',
//             border: '1px solid #ccc',
//             borderRadius: '5px',
//             width: '100%',
//             fontSize: '20px',
//             backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly transparent white for inputs
//           }}
//           value={username}
//           onChange={(e) => setUsername(e.target.value)} // Update state on input change
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           required
//           style={{
//             margin: '10px 0',
//             padding: '10px',
//             border: '1px solid #ccc',
//             borderRadius: '5px',
//             width: '100%',
//             fontSize: '20px',
//             backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly transparent white for inputs
//           }}
//           value={password}
//           onChange={(e) => setPassword(e.target.value)} // Update state on input change
//         />
//         <button
//           type="submit"
//           style={{
//             backgroundColor: '#007BFF',
//             color: '#fff',
//             border: 'none',
//             borderRadius: '5px',
//             padding: '10px',
//             cursor: 'pointer',
//             width: '100%',
//             fontSize: '20px',
//           }}
//         >
//           Login
//         </button>
//       </form>
//       <p style={{ color: 'black', fontSize: '20px' }}>
//         Not Registered?{' '}
//         <span
//           style={{
//             marginTop: '10px',
//             cursor: 'pointer',
//             color: 'red',
//             textDecoration: 'underline',
//             fontSize: '25px'
//           }}
//           onClick={handleRegisterRedirect}
//         >
//           Register here
//         </span>
//       </p>
//     </div>
//   );
// };

// export default Login;






