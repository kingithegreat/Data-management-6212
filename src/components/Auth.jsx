import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import '../styles/App.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    let user, error, data;

    if (isLogin) {
      ({ data, error } = await supabase.auth.signInWithPassword({ email, password }));
      user = data?.user;
    } else {
      ({ data, error } = await supabase.auth.signUp({ email, password }));
      user = data?.user;
      if (!error && user) {
        const { error: dbError } = await supabase
          .from('profiles')
          .insert([{ id: user.id, email: user.email }]);
        if (dbError) {
          console.error('Database Error:', dbError.message);
          alert(`Database Error: ${dbError.message}`);
        }
      }
    }

    setLoading(false);

    if (error) {
      console.error('Error:', error.message);
      alert(`Error: ${error.message}`);
    } else {
      alert(`${isLogin ? 'Login' : 'Sign Up'} successful!`);
      navigate('/home');
    }
  };

  return (
    <div className="auth-container ">
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
