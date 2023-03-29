import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import "./EmployerApp.css";
import JobPosts from "./Pages/JobPosts";
import Dashboard from "./Pages/Dashboard";
// import EditDetails from "./Pages/EditDetails";
// import CreateJob from "./Pages/CreateJob";
import Applications from "./Pages/Applications";
import Recharge from "./Pages/Recharge";
import LoginModal from "./Components/LoginModal";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import RegisterModal from "./Components/RegisterModal";
import Navbar from "./Components/Navbar/Navbar";
import PostJob from "./Pages/PostJob/Postjob";
import EditDetail from "./Pages/EditDetetails/EditDetails";
const App = () => {
  const [loginModalOpen, setloginModalOpen] = useState(false);
  const [registerModalOpen, setregisterModalOpen] = useState(false);

  const openLogin = () => {
    setloginModalOpen(true);
  };

  const closeLogin = () => {
    setloginModalOpen(false);
  };

  const openRegister = () => {
    setregisterModalOpen(true);
  };

  const closeRegister = () => {
    setregisterModalOpen(false);
  };

  return (
    <div className="EmpApp">
      <div className="eNavbar">
        <Navbar
          openLogin={openLogin}
          closeLogin={closeLogin}
          openRegister={openRegister}
          closeRegister={closeRegister}
        />
      </div>
      <AnimatePresence initial={false} mode="wait">
        {loginModalOpen && (
          <LoginModal
            openLogin={openLogin}
            closeLogin={closeLogin}
            openRegister={openRegister}
            closeRegister={closeRegister}
          />
        )}
      </AnimatePresence>
      <AnimatePresence initial={false} mode="wait">
        {registerModalOpen && (
          <RegisterModal
            openLogin={openLogin}
            closeLogin={closeLogin}
            openRegister={openRegister}
            closeRegister={closeRegister}
          />
        )}
      </AnimatePresence>
      <div className="EmployerApp">
        <Routes>
          <Route path="home" element={<Home />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route path="posts" element={<JobPosts />}></Route>
          <Route path="dashboard" element={<Dashboard />}></Route>
          <Route path="edit" element={<EditDetail />}></Route>
          <Route path="postJob" element={<PostJob />}></Route>
          <Route path="viewApplications" element={<Applications />}></Route>
          <Route path="recharge" element={<Recharge />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
