import "./AdminApp.css";
import Login from "./Components/Login";
import FecthState from "./Hooks/FecthState";
import Resume from "./Compontes1/Resume/Resume";
import Dashboard from "./Compontes1/Dashboard/Dashboard";
import SideNavbar from "./Compontes1/Navbar/Navbar";
import PostJob from "./Compontes1/PostJob/PostJob"
// import AddUser from "./Compontes1/Setting/AddUser/AddUser";
import RolesPermission from "./Compontes1/Setting/Roles_Permissions/Roles_Permissions";
import Viewpermission from "./Compontes1/Setting/ViewPermission/ViewPermission";
import AddUser from "./Compontes1/Setting/AddUser/AddUser";
import AddStudent from "./Compontes1/Student/AddStudent/AddStudent";
import AddEmployer from "./Compontes1/Company/AddEmployer/AddEmployer";
import AllEmployer from "./Compontes1/Company/AllEmployer/AllEmployer";
import AllStudent from "./Compontes1/Student/AllStudent/AllStudent";
import AllPostJob from "./Compontes1/PostJob/AllPostJob";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SingleEmployerPostJob from "./Compontes1/PostJob/SingleEmployerPostJob";
import EmpAddFeatured from "./Compontes1/Featured/Featured";
import AddNews from "./Compontes1/AddNews/AddNews";
//https://github.com/shubhammaurya123/adminDashboard
function AdminApp() {
  const ProtectedRoute = ({ children }) => {
    const user = localStorage.getItem("usertoken")
      ? localStorage.getItem("usertoken")
      : null;

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };
  return (
    <div className="AdminApp Apps">
      <div className="sidenavbar">
        <SideNavbar />
      </div>
      <div className="main-part">
        <FecthState>
        <Routes >
           <Route path="dashboard" element={<Dashboard/>} />
          <Route path="student/allStudent" element={<AllStudent />} />
          <Route path="student/addStudent" element={<AddStudent/>} />
          <Route path="company/addEmployer" element={<AddEmployer/>} />
          <Route path="company/allEmployer" element={<AllEmployer/>} />
          <Route path="resume" element={<Resume />} />
          <Route path="EmployerPostjob/*" element={<SingleEmployerPostJob/>} />
          <Route path="postjob" element={<PostJob />} />
          <Route path="postjob/AllPostJobs" element={<AllPostJob/>} />
          <Route path="dashboard" element={<Dashboard/>} />
          <Route path="setting/roles&Permission" element={<RolesPermission/>} />
          <Route path="setting/addUser" element={<AddUser/>} />
          <Route path="setting/viewPermission" element={<Viewpermission/>} />
          <Route path="addFeatured" element={<EmpAddFeatured/>} />
          <Route path="addNews" element={<AddNews />}></Route>
      </Routes>
      </FecthState>
      </div>
    </div>
  );
}

export default AdminApp;

{
  /* <Route path="/" element={<></>} />
<Route path="student" element={<Student />} />
<Route path="companies" element={<Companies />} />
<Route path="report" element={<Report />} />
<Route path="jobpost" element={<JobPosting />} />
<Route path="student/addstudent" element={<AddStudent />} />
<Route path="employer/addemployer" element={<AddEmployer />} />
<Route path="/setting/roles&permission" element={<Setting/>} />
<Route path="/setting/addUser" element={<AddUser/>} />
<Route path="/login" element={<Login/>} />
<Route path="/setting/viewpermission" element={<Viewpermission/>} /> */
}

{
  /* <Routes >
<Route exact path="home" element={<></>} />
<Route path="/student" element={<Student />} />
<Route path="/companies" element={<Companies />} />
<Route path="/report" element={<Report />} />
<Route path="/jobpost" element={<JobPosting />} />
<Route path="/student/addstudent" element={<AddStudent />} />
<Route path="/student/allstudnetData" element={<AllStdudentData />} />
<Route path="/employer/addemployer" element={<AddEmployer />} />
<Route path="/employer/allemployerData" element={<AllEmployerData />} />
<Route path="/setting/roles&permission" element={<Setting/>} />
<Route path="/setting/addUser" element={<AddUser/>} />
<Route path="/login" element={<Login/>} />
<Route path="setting/viewpermission" element={<Viewpermission/>} />
</Routes> */
}

{
  /* <Routes>

<Route path="home">
  <Route path="login" element={<Login />} />
  <Route
    index
    element={
      <ProtectedRoute>
        <></>
      </ProtectedRoute>
    }
  />

  <Route path="setting">
    <Route
      index
      element={
        <ProtectedRoute>
          <></>
        </ProtectedRoute>
      }
    />
    <Route
      path="roles&permission"
      element={
        <ProtectedRoute>
          <Setting />
        </ProtectedRoute>
      }
    />
    <Route
      path="viewpermission"
      element={
        <ProtectedRoute>
          <Viewpermission />
        </ProtectedRoute>
      }
    />
    <Route
      path="adduser"
      element={
        <ProtectedRoute>
          <AddUser />
        </ProtectedRoute>
      }
    />
  </Route>

  <Route path="jobpost">
    <Route
      index
      element={
        <ProtectedRoute>
          <JobPosting />
        </ProtectedRoute>
      }
    />
  </Route>
  
  <Route path="companies">
    <Route
      index
      element={
        <ProtectedRoute>
          <Companies />
        </ProtectedRoute>
      }
    />
  </Route>
  <Route path="report">
    <Route
      index
      element={
        <ProtectedRoute>
          <Report />
        </ProtectedRoute>
      }
    />
  </Route>
  <Route path="student/addstudent">
    <Route
      index
      element={
        <ProtectedRoute>
          <AddStudent />
        </ProtectedRoute>
      }
    />
  </Route>
  <Route path="student/allstudentData">
    <Route
      index
      element={
        <ProtectedRoute>
            <AllStudentData/>
        </ProtectedRoute>
      }
    />
  </Route>
  <Route path="employer/addemployer">
    <Route
      index
      element={
        <ProtectedRoute>
          <AddEmployer />
        </ProtectedRoute>
      }
    />
  </Route>
  <Route path="employer/allemployerData">
    <Route
      index
      element={
        <ProtectedRoute>
          <AllEmployerData/>
        </ProtectedRoute>
      }
    />
  </Route>
</Route>
</Routes> */
}

//right code
// <FecthState>
// <div className="main-container">

//   <Navbar />
//   <BrowserRouter>
//     <Routes>
//       <Route path="/">
//         <Route path="login" element={<Login />} />
//         <Route
//           index
//           element={
//             <ProtectedRoute>
//               <></>
//             </ProtectedRoute>
//           }
//         />

//         <Route path="setting">
//           <Route
//             index
//             element={
//               <ProtectedRoute>
//                 <></>
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="roles&permission"
//             element={
//               <ProtectedRoute>
//                 <Setting />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="viewpermission"
//             element={
//               <ProtectedRoute>
//                 <Viewpermission />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="adduser"
//             element={
//               <ProtectedRoute>
//                 <AddUser />
//               </ProtectedRoute>
//             }
//           />
//         </Route>
//         <Route path="jobpost">
//           <Route
//             index
//             element={
//               <ProtectedRoute>
//                 <JobPosting />
//               </ProtectedRoute>
//             }
//           />
//         </Route>
//         <Route path="companies">
//           <Route
//             index
//             element={
//               <ProtectedRoute>
//                 <Companies />
//               </ProtectedRoute>
//             }
//           />
//         </Route>
//         <Route path="report">
//           <Route
//             index
//             element={
//               <ProtectedRoute>
//                 <Report />
//               </ProtectedRoute>
//             }
//           />
//         </Route>
//         <Route path="student/addstudent">
//           <Route
//             index
//             element={
//               <ProtectedRoute>
//                 <AddStudent />
//               </ProtectedRoute>
//             }
//           />
//         </Route>
//         <Route path="student/allstudentData">
//           <Route
//             index
//             element={
//               <ProtectedRoute>
//                <AllStudentData/>
//               </ProtectedRoute>
//             }
//           />
//         </Route>
//         <Route path="employer/addemployer">
//           <Route
//             index
//             element={
//               <ProtectedRoute>
//                 <AddEmployer />
//               </ProtectedRoute>
//             }
//           />
//         </Route>
//         <Route path="employer/allemployerData">
//           <Route
//             index
//             element={
//               <ProtectedRoute>
//                 <AllEmployerData/>
//               </ProtectedRoute>
//             }
//           />
//         </Route>
//       </Route>
//     </Routes>
//   </BrowserRouter>
// </div>
// </FecthState>










// import Navbar from "./Components/Navbar";
// import Student from "./Components/Stdudent";
// import Companies from "./Components/AddUser";
// import Report from "./Components/Report";
// import JobPosting from "./Components/JobPosting";
// import AddStudent from "./Components/AddStudent";
// import AddEmployer from "./Components/AddEmployer";
// import Setting from "./Components/Setting";
// import AddUser from "./Components/AddUser";
// import Viewpermission from "./Components/viewPermission";
// import "./AdminApp.css";
// import Login from "./Components/Login";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import AllEmployerData from "./Components/AllEmployerData";
// import AllStudentData from "./Components/AllStudentData";
// import FecthState from "./Hooks/FecthState";
// function AdminApp() {
//   const navigate = useNavigate();
//   const [user, setuser] = useState(localStorage.getItem('usertoken') ? localStorage.getItem('usertoken') : null);

//   const ProtectedRoute = ({ children }) => {
//     const user = localStorage.getItem("usertoken")
//       ? localStorage.getItem("usertoken")
//       : null;
//     if (!user) {
//       return <Navigate to="/admin/login" />;
//     }
//     return children;
//   };
//   return (
//     <div className="main-container">
//       <FecthState>
//         <Navbar />

//         <Routes>

//           <Route path="/">
//             <Route path="login" element={<Login />} />
//             <Route
//               index
//               element={
//                 <ProtectedRoute>
//                   <></>
//                 </ProtectedRoute>
//               }
//             />

//             <Route path="setting">
//               <Route
//                 index
//                 element={
//                   <ProtectedRoute>
//                     <></>
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="roles&permission"
//                 element={
//                   <ProtectedRoute>
//                     <Setting />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="viewpermission"
//                 element={
//                   <ProtectedRoute>
//                     <Viewpermission />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="addUser"
//                 element={
//                   <ProtectedRoute>
//                     <AddUser />
//                   </ProtectedRoute>
//                 }
//               />
//             </Route>

//             <Route path="jobpost">
//               <Route
//                 index
//                 element={
//                   <ProtectedRoute>
//                     <JobPosting />
//                   </ProtectedRoute>
//                 }
//               />
//             </Route>

//             <Route path="companies">
//               <Route
//                 index
//                 element={
//                   <ProtectedRoute>
//                     <Companies />
//                   </ProtectedRoute>
//                 }
//               />
//             </Route>
//             <Route path="report">
//               <Route
//                 index
//                 element={
//                   <ProtectedRoute>
//                     <Report />
//                   </ProtectedRoute>
//                 }
//               />
//             </Route>
//             <Route path="student/addstudent">
//               <Route
//                 index
//                 element={
//                   <ProtectedRoute>
//                     <AddStudent />
//                   </ProtectedRoute>
//                 }
//               />
//             </Route>
//             <Route path="student/allstudnetData">
//               <Route
//                 index
//                 element={
//                   <ProtectedRoute>
//                     <AllStudentData />
//                   </ProtectedRoute>
//                 }
//               />
//             </Route>
//             <Route path="employer/addemployer">
//               <Route
//                 index
//                 element={
//                   <ProtectedRoute>
//                     <AddEmployer />
//                   </ProtectedRoute>
//                 }
//               />
//             </Route>
//             <Route path="employer/allemployerData">
//               <Route
//                 index
//                 element={
//                   <ProtectedRoute>
//                     <AllEmployerData />
//                   </ProtectedRoute>
//                 }
//               />
//             </Route>
//           </Route>
//         </Routes>
//       </FecthState>
//     </div>
//   );
// }

// export default AdminApp;
