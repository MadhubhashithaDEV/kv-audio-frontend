import "./App.css";
import AdminPage from "./pages/admin/adminPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/homePage";
import Testing from "./components/testing";
import LoginPage from "./pages/login/login";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
    <Toaster possition="top-right"/>
      <Routes path="/*">

        <Route path="/testing" element={<Testing/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/admin/*" element={<AdminPage/>}/>
        <Route path="/*" element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
