
import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [value, setValue] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const register = await axios.post("http://localhost:3000/register", value);
      console.log(register.data);
      // After successful registration, navigate to login
      navigate('/login');
    } catch (error) {
      console.error("Registration error:", error.response.data);
      // Handle registration error here (e.g., show an error message)
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundImage: 'url("https://i.pinimg.com/736x/db/b8/8d/dbb88d12399a89ab504e61dae4dd4724.jpg")', // Background image
      backgroundSize: 'cover', // Cover the entire container
      backgroundPosition: 'center', // Center the image
      backgroundRepeat: 'no-repeat', // Prevent repetition
      padding: '20px',
    },
    form: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly transparent white for better readability
      padding: '20px',
      borderRadius: '5px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      width: '300px',
      textAlign: 'center',
    },
    input: {
      margin: '10px 0',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      width: '100%',
      fontSize: '16px',
    },
    button: {
      backgroundColor: 'red',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      padding: '10px',
      cursor: 'pointer',
      width: '100%',
      fontSize: '16px',
    },
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          placeholder="Name"
          onChange={handleChange}
          value={value.name}
          name="name"
          required
          style={styles.input}
        />
        <input
          placeholder="Email"
          onChange={handleChange}
          value={value.email}
          name="email"
          required
          type="email"
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={value.password}
          name="password"
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Register</button>
        <p>Already have an Account?</p>
        <button type="button" onClick={handleLoginRedirect} style={styles.button}>Login</button>
      </form>
    </div>
  );
};

export default Register;

