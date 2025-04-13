import { useState } from "react";
import "./login.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";

export default function LoginPage() {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [isLoading, setIsLoading] = useState(false);
  
      const navigate = useNavigate();

      function handleOnSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
    
        axios.post("http://localhost:3000/api/users/login", {
          email: email,
          password: password
        })
        .then((res) => {
          toast.success("Login successful! Welcome back.");
          localStorage.setItem("token", res.data.token);

          const user = res.data.user;
          if (user.role === "admin") {
            navigate("/admin/");
          } else {
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response?.data?.error || "Login failed. Please try again.");
        })
        .finally(() => {
          setIsLoading(false);
        });
      }

      return (
        <div className="login-container">
          <div className="login-overlay">
            <div className="login-card">
              <div className="logo-container">
                <img src="/logo.png" alt="KV Audio Logo" className="logo" />
                <h1 className="brand-name">KV Audio</h1>
              </div>
          
              <h2 className="welcome-text">Welcome Back</h2>
              <p className="login-subtitle">Sign in to continue to your account</p>
          
              <form onSubmit={handleOnSubmit} className="login-form">
                <div className="input-group">
                  <FaEnvelope className="input-icon" />
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="login-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
            
                <div className="input-group">
                  <FaLock className="input-icon" />
                  <input 
                    type="password" 
                    placeholder="Password" 
                    className="login-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
            
                <div className="forgot-password">
                  <span onClick={() => toast.info("Password reset feature coming soon!")}>
                    Forgot Password?
                  </span>
                </div>
            
                <button 
                  type="submit" 
                  className="login-button"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading-spinner"></span>
                  ) : (
                    <>
                      <FaSignInAlt className="button-icon" />
                      Sign In
                    </>
                  )}
                </button>
              </form>
          
              <div className="login-footer">
                <p>© {new Date().getFullYear()} KV Audio. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      );
}