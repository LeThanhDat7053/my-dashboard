// Login.tsx - Converted to use Tailwind CSS
import React, { useState } from 'react';
import type { FormEvent } from 'react';
// import '../styles/login.css'; // Removed CSS import

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

  // doLogin function
  const doLogin = (e: FormEvent) => {
    e.preventDefault();
    
    const email = formData.email;
    const password = formData.password;

    if (email === " " && password === "123456") {
      const userData: User = {
        email: email,
        name: 'Admin User',
        role: 'Administrator'
      };
      
      localStorage.setItem('currentUser', JSON.stringify(userData));
      localStorage.setItem('isAuthenticated', 'true');
      
      alert('Login successful! Redirecting to dashboard...');
      console.log('Login successful for:', email);
      
      // In a real application, you would use React Router to navigate
      // For example: window.location.href = "/";
      
    } else {
      alert("Invalid email or password!");
    }
  };

  // Handle reset password link click
  const handleResetPassword = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    alert('Reset password functionality would be implemented here');
  };

  return (
    <div className="font-sans bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center min-h-screen p-5">
      <div className="bg-white w-full max-w-md py-12 px-9 rounded-2xl shadow-2xl">
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Hotel Dashboard Login</h2>
        </div>
        
        <form onSubmit={doLogin}>
          
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none transition-all duration-200 bg-gray-50 text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:bg-white placeholder-gray-400" 
              name="email"
              id="email" 
              placeholder="you@example.com" 
              required
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none transition-all duration-200 bg-gray-50 text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:bg-white placeholder-gray-400" 
              name="password"
              id="password" 
              placeholder="********" 
              required
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="mt-2">
            <button type="submit" className="w-full bg-blue-500 text-white border-none px-4 py-3 rounded-lg cursor-pointer text-base font-medium transition-colors duration-200 hover:bg-blue-600 flex items-center justify-center gap-2 min-h-[44px]">
                <i className="fas fa-sign-in-alt text-sm"></i> Login
              </button>
          </div>
          
        </form>
        
        <div className="text-center mt-5 text-sm text-gray-600">
          <p>
            Forgot your password? <a href="#" onClick={handleResetPassword} className="text-blue-500 no-underline cursor-pointer bg-none border-none text-sm hover:underline">Reset</a>
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default Login;