import Homepage from "./Pages/homepage/homepage";
import Login from "./Pages/login/login";
import { Route, Routes } from "react-router-dom";
import Register from "./Pages/Register/Register";
import Navbar from "./Component/Navbar";
import ProfileRecord from "./Pages/profileRecord/profileRecord";
import InterviewQuestion from "./Pages/InterviewQues/InterviewQues";
import CreateResume from "./Pages/CreateResume/CreateResume";
import UserProfile from "./Pages/UserProfile/UserProfile";
import JobDetail from "./Pages/JobDetail/JobDetail";
import TempPassword from "./Pages/ChangePassword/TempPassword";
import ChangePassword from "./Pages/ChangePassword/ChangePassword";
import MainJob from "./Pages/Job/MainJob";
import "./student.css";
import Context from "./Context";
import TestHome from "./Pages/testHomepage/TestHome";
import TestNavbar from "./Component/TestNavbar";

function MainApp() {
  return (
    <div className="student-app">
      {/* <Navbar /> */}
      <TestNavbar />
      <Routes>
        <Route exact path="testhome" element={<Homepage />} />
        <Route exact path="home" element={<TestHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProfileRecord />} />
        <Route path="/job" element={<MainJob />}></Route>
        <Route path="interview_Question" element={<InterviewQuestion />} />
        <Route path="/create_resume" element={<CreateResume />} />
        <Route path="/user_profile" element={<UserProfile />} />
        <Route path="/:title/:_id" element={<JobDetail />} />
        <Route path="/change_password" element={<TempPassword />} />
        <Route
          path="/change_password/:temp_password"
          element={<ChangePassword />}
        />
      </Routes>
    </div>
  );
}

function App() {
  return <Context children={<MainApp />} />;
}

export default App;
