// Login.tsx - Complete conversion from HTML to React TypeScript
import React, { useState } from 'react';
import type { FormEvent } from 'react';
import '../styles/login.css';

// TypeScript interfaces for type safety
interface LoginFormData {
  email: string;
  password: string;
}

interface User {
  email: string;
  name: string;
  role: string;
}

const Login: React.FC = () => {
  // State management for form data
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // doLogin function - EXACT same logic as HTML file
  const doLogin = (e: FormEvent) => {
    e.preventDefault();
    
    // Get values from state (equivalent to getElementById in HTML)
    const email = formData.email;
    const password = formData.password;

    // Demo: check đơn giản - EXACT same logic as original
    if (email === " " && password === "123456") {
      // Store user data for session management (added for React app)
      const userData: User = {
        email: email,
        name: 'Admin User',
        role: 'Administrator'
      };
      
      localStorage.setItem('currentUser', JSON.stringify(userData));
      localStorage.setItem('isAuthenticated', 'true');
      
      // Original redirect logic from HTML
      // window.location.href = "index.html";
      
      // For demo purposes, show alert instead of redirect
      alert('Login successful! Redirecting to dashboard...');
      console.log('Login successful for:', email);
      
      // In real application, you would use React Router:
      // navigate('/dashboard') or history.push('/dashboard')
      
    } else {
      // EXACT same error message as HTML
      alert("Invalid email or password!");
    }
  };

  // Handle reset password link click
  const handleResetPassword = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // You can implement reset password functionality here
    alert('Reset password functionality would be implemented here');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        
        {/* Login Header - EXACT same structure as HTML */}
        <div className="login-header">
          <i className="fas fa-hotel fa-2x login-hotel-icon"></i>
          <h2>Hotel Dashboard Login</h2>
        </div>
        
        {/* Login Form - EXACT same structure as HTML */}
        <form onSubmit={doLogin}>
          
          {/* Email Field */}
          <div className="form-group">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              className="form-input" 
              name="email"
              id="email" 
              placeholder="you@example.com" 
              required
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          
          {/* Password Field */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-input" 
              name="password"
              id="password" 
              placeholder="********" 
              required
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          
          {/* Submit Button - EXACT same as HTML */}
          <div className="login-button-wrapper">
            <button type="submit" className="btn-primary">
                <i className="fas fa-sign-in-alt"></i> Login
              </button>
          </div>
          
          
        </form>
        
        {/* Login Footer - EXACT same structure as HTML */}
        <div className="login-footer">
          <p>
            Forgot your password? <a href="#" onClick={handleResetPassword}>Reset</a>
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default Login;