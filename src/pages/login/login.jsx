import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, ArrowRight, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  const googleLogin = useGoogleLogin({
    onSuccess: (res) => {
      setIsLoading(true);
      axios.post("http://localhost:3000/api/users/google", {
        accessToken: res.access_token
      }).then((res) => {
        toast.success("Login Success");
        const user = res.data.user;
        localStorage.setItem("token", res.data.token);

        if (user.role === "admin") {
          navigate("/admin/");
        } else {
          navigate("/");
        }
      }).catch((err) => {
        console.log(err);
        toast.error("Google login failed");
      }).finally(() => {
        setIsLoading(false);
      });
    }
  });

  function handleOnSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const backendUrl = "http://localhost:3000";

    axios.post(`${backendUrl}/api/users/login`, {
      email: email,
      password: password
    }).then((res) => {
      toast.success("Login Success");
      const user = res.data.user;
      localStorage.setItem("token", res.data.token);
      
      if (user.emailVerified == false) {
        navigate("/verify-email");
        return;
      }
       
      if (user.role === "admin") {
        navigate("/admin/");
      } else {
        navigate("/");
      }
    }).catch((err) => {
      toast.error(err.response?.data?.error || "Login failed");
    }).finally(() => {
      setIsLoading(false);
    });
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.12
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center p-4 relative overflow-hidden" 
         style={{
           backgroundImage: "url('https://imgs.search.brave.com/Y7KbljnJ0AgJrCul66WTxAchcVYssVlhtfB1EkjS5ls/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC9HN1FBdFl5/LmpwZw')", 
           backgroundSize: "cover",
           backgroundPosition: "center"
         }}>
      
      <div className="absolute inset-0 bg-black/50"></div>


      <motion.div 
        className="w-full max-w-md z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div 
          className="bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-indigo-500/20"
          variants={itemVariants}
        >
          <div className="p-8">
            <motion.div 
              className="flex justify-center mb-8"
              variants={itemVariants}
            >
              <div className="relative">
                <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 opacity-70 blur-md"></div>
                <img 
                  src="/logo.png" 
                  alt="KV Audio Logo" 
                  className="relative h-24 w-24 object-contain filter drop-shadow-lg" 
                />
              </div>
            </motion.div>
            
            <motion.h2 
              className="text-3xl font-bold text-center text-white mb-2"
              variants={itemVariants}
            >
              Welcome Back
            </motion.h2>
            
            <motion.p 
              className="text-center text-indigo-200/70 mb-8"
              variants={itemVariants}
            >
              Sign in to your KV Audio account
            </motion.p>
            
            <motion.form 
              onSubmit={handleOnSubmit}
              variants={itemVariants}
              className="space-y-6"
            >
              <div className="space-y-5">
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-300 h-5 w-5 group-focus-within:text-indigo-400 transition-colors duration-300" />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full bg-gray-800/50 border border-indigo-500/30 rounded-lg py-3.5 pl-10 pr-3 text-white placeholder:text-indigo-200/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all duration-300"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-300 h-5 w-5 group-focus-within:text-indigo-400 transition-colors duration-300" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full bg-gray-800/50 border border-indigo-500/30 rounded-lg py-3.5 pl-10 pr-10 text-white placeholder:text-indigo-200/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all duration-300"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button 
                    type="button" 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-300 hover:text-white transition-colors duration-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                
                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-lg font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 disabled:opacity-70 relative overflow-hidden group"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                  {isLoading ? (
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <LogIn className="h-5 w-5" />
                      <span>Sign In</span>
                    </>
                  )}
                </motion.button>
                
                <div className="relative flex items-center justify-center my-6">
                  <div className="border-t border-indigo-500/20 absolute "></div>
                  <span className="bg-transparent px-3 text-indigo-200/60 text-sm relative">or continue with</span>
                </div>
                
                <motion.button
                  type="button"
                  onClick={googleLogin}
                  className="w-full bg-gray-800/50 border border-indigo-500/30 text-white py-3.5 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-700/50 transition-all duration-300 relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Google</span>
                </motion.button>
              </div>
            </motion.form>
            
            <motion.div 
              className="mt-8 text-center"
              variants={itemVariants}
            >
              <p className="text-indigo-200/70">
                Don't have an account?{" "}
                <motion.a 
                  href="/register" 
                  className="text-indigo-400 font-medium hover:text-white inline-flex items-center gap-1 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  Sign up <ArrowRight className="inline h-4 w-4" />
                </motion.a>
              </p>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          className="text-center mt-6 text-white/70 text-sm"
          variants={itemVariants}
        >
          © {new Date().getFullYear()} KV Audio. All rights reserved.
        </motion.div>
      </motion.div>
    </div>
  );
}



//http://localhost:3000/api/users/login