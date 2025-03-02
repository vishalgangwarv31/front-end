import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FirmLogIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/firm/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email , password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('firmToken', data.token);
        window.location.href = '/api/firm/menu';
      } else {
        console.error('Sign-in failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="parent-container">
      <div className="sign-in-container">
      <h2 className="sign-in-heading">Firm Sign In</h2>
      <input className="sign-input" type="email" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="sign-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="button" onClick={handleSignIn}>Sign In</button>
      <p> <Link to={"/api/firm/forget-password"}>Forget Password</Link></p>
    </div>
    </div>
    
  );
};

export default FirmLogIn;
