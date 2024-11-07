import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import '../styles/App.css';

const Auth = () => {
  // State variables to manage form inputs and loading state
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and sign up
  const [email, setEmail] = useState(''); // Email input
  const [password, setPassword] = useState(''); // Password input
  const [loading, setLoading] = useState(false); // Loading state for form submission
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Function to handle authentication (login or sign up)
  const handleAuth = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Set loading state to true

    let user, error, data;

    if (isLogin) {
      // Handle login
      ({ data, error } = await supabase.auth.signInWithPassword({ email, password }));
      user = data?.user; // Extract user data if login is successful
    } else {
      // Handle sign up
      ({ data, error } = await supabase.auth.signUp({ email, password }));
      user = data?.user; // Extract user data if sign up is successful
      if (!error && user) {
        // Insert user profile into 'profiles' table if sign up is successful
        const { error: dbError } = await supabase
          .from('profiles')
          .insert([{ id: user.id, email: user.email }]);
        if (dbError) {
          console.error('Database Error:', dbError.message); // Log database error
          alert(`Database Error: ${dbError.message}`); // Show alert for database error
        }
      }
    }

    setLoading(false); // Set loading state to false

    if (error) {
      console.error('Error:', error.message); // Log authentication error
      alert(`Error: ${error.message}`); // Show alert for authentication error
    } else {
      alert(`${isLogin ? 'Login' : 'Sign Up'} successful!`); // Show success message
      navigate('/home'); // Navigate to the home page
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleAuth}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="auth-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="auth-input"
          />
          <button type="submit" disabled={loading} className="auth-button">
            {loading ? 'Processing...' : isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p onClick={() => setIsLogin(!isLogin)} className="auth-toggle">
          {isLogin ? 'Don’t have an account? Sign Up' : 'Already have an account? Login'}
        </p>
      </div>
    </div>
  );
};

export default Auth;
