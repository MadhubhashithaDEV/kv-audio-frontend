import "./App.css";
import AdminPage from "./pages/admin/adminPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/homePage";
import Testing from "./components/testing";
import LoginPage from "./pages/login/login";
import { Toaster } from "react-hot-toast";
import RegisterPage from "./pages/register/register";
import { GoogleOAuthProvider } from "@react-oauth/google";
import VerifyEmail from "./pages/verifyEmail/verifyEmail";
import AdminDashboard from "./pages/admin/adminDashboard";



function App() {
  return (
    <GoogleOAuthProvider clientId="1065391884620-tjnst6pesm0qbqk0lbdecc6a09nqilu8.apps.googleusercontent.com">
    <BrowserRouter>
    <Toaster possition="top-right"/>
      <Routes path="/*">

        <Route path="/testing" element={<Testing/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/verify-email" element={<VerifyEmail/>}/>
        <Route path="/admin/*" element={<AdminPage/>}/>
        <Route path="/*" element={<HomePage/>}/> 
      


      </Routes>
      
    </BrowserRouter>
    </GoogleOAuthProvider>

  );
}

export default App;

//https://kv-audio-frontend-three.vercel.app/
