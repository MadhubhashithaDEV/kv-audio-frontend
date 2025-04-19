import { useState } from "react";
import "./register.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleOnSubmit(e) {
    e.preventDefault();
    console.log({ firstName, lastName, email, password, address, phone });
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/`, {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      address: address,
      phone: phone,
    }).then(() => {
      toast.success("Registration Success");
      navigate("/login");
    }).catch((err) => {
      toast.error(err?.response?.data?.err || "Something Went Wrong, An Error Occurred");
    }).finally(() => {
      setIsLoading(false);
    })
  };

  return (
    <div className="login-container">
      <div className="login-overlay">
        <div className="login-card">
          <div className="logo-container">
            <img src="/logo.png" alt="KV Audio Logo" className="logo" />
            <h1 className="brand-name">KV Audio</h1>
          </div>
          
          <h2 className="welcome-text">Create Account</h2>
          <p className="login-subtitle">Please fill in your details to register</p>
          
          <form onSubmit={handleOnSubmit} className="login-form">
            <div className="input-group">
              <i className="input-icon fas fa-user"></i>
              <input 
                type="text" 
                placeholder="First Name" 
                className="login-input" 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
                required
              />
            </div>
            
            <div className="input-group">
              <i className="input-icon fas fa-user"></i>
              <input 
                type="text" 
                placeholder="Last Name" 
                className="login-input" 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)} 
                required
              />
            </div>
            
            <div className="input-group">
              <i className="input-icon fas fa-envelope"></i>
              <input 
                type="email" 
                placeholder="Email" 
                className="login-input" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required
              />
            </div>
            
            <div className="input-group">
              <i className="input-icon fas fa-lock"></i>
              <input 
                type="password" 
                placeholder="Password" 
                className="login-input" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required
              />
            </div>
            
            <div className="input-group">
              <i className="input-icon fas fa-home"></i>
              <input 
                type="text" 
                placeholder="Address" 
                className="login-input" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                required
              />
            </div>
            
            <div className="input-group">
              <i className="input-icon fas fa-phone"></i>
              <input 
                type="text" 
                placeholder="Phone" 
                className="login-input" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                required
              />
            </div>
            
            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? (
                <div className="loading-spinner"></div>
              ) : (
                <>
                  Register <i className="button-icon fas fa-arrow-right"></i>
                </>
              )}
            </button>
          </form>
          
          <div className="login-footer">
            <p>Already have an account? <a href="/login" style={{color: '#9370DB', textDecoration: 'underline'}}>Login here</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}



/* 
  return (
    <div className="login-container">
      <div className="login-overlay">
        <div className="login-card">
          <div className="logo-container">
            <img src="/logo.png" alt="KV Audio Logo" className="logo" />
            <h1 className="brand-name">KV Audio</h1>
          </div>
          
          <h2 className="welcome-text">Create Account</h2>
          <p className="login-subtitle">Please fill in your details to register</p>
          
          <form onSubmit={handleOnSubmit} className="login-form">
            <div className="input-group">
              <i className="input-icon fas fa-user"></i>
              <input 
                type="text" 
                placeholder="First Name" 
                className="login-input" 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
                required
              />
            </div>
            
            <div className="input-group">
              <i className="input-icon fas fa-user"></i>
              <input 
                type="text" 
                placeholder="Last Name" 
                className="login-input" 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)} 
                required
              />
            </div>
            
            <div className="input-group">
              <i className="input-icon fas fa-envelope"></i>
              <input 
                type="email" 
                placeholder="Email" 
                className="login-input" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required
              />
            </div>
            
            <div className="input-group">
              <i className="input-icon fas fa-lock"></i>
              <input 
                type="password" 
                placeholder="Password" 
                className="login-input" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required
              />
            </div>
            
            <div className="input-group">
              <i className="input-icon fas fa-home"></i>
              <input 
                type="text" 
                placeholder="Address" 
                className="login-input" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                required
              />
            </div>
            
            <div className="input-group">
              <i className="input-icon fas fa-phone"></i>
              <input 
                type="text" 
                placeholder="Phone" 
                className="login-input" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                required
              />
            </div>
            
            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? (
                <div className="loading-spinner"></div>
              ) : (
                <>
                  Register <i className="button-icon fas fa-arrow-right"></i>
                </>
              )}
            </button>
          </form>
          
          <div className="login-footer">
            <p>Already have an account? <a href="/login" style={{color: '#9370DB', textDecoration: 'underline'}}>Login here</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
*/