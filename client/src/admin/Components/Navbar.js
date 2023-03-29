import { useContext, useEffect, useState } from "react";
import "../AdminApp.css";
import { BsChevronDown } from "react-icons/bs";
import { json, useNavigate } from 'react-router-dom';
import FecthContext from "../Hooks/FecthContext";
function Navbar() {
  const context  = useContext(FecthContext);
  const {getData ,data} = context;
  const [dashboard, setDashboard] = useState(false);
  const [student, setStudent] = useState(false);
  const [companies, setCompanies] = useState(false);
  const [report, setReport] = useState(false);
  const [job, setJob] = useState(false);
  const [resume, setResume] = useState(false);
  const [setting, setSetting] = useState(false);
  const[isAdmin , setAdmin] = useState(false);
  const [islogin, setIslogin] = useState(
    localStorage.getItem("usertoken") ? true : false
  );
  let jsonval = localStorage.getItem("usertoken")? localStorage.getItem("usertoken"): null;
  const jsonData = JSON.parse(jsonval);

  const navigate = useNavigate();
  const [permissionVal, setPermissionVal] = useState({
    Student: false,
    Companies: false,
    Report: false,
    jobPosting: false,
    Resume: false,
  });
  
  const getPermission = async () => {
    if(jsonData.role ==="Admin") {
      setAdmin(true)
     }
    // API Call
    const response = await fetch(
      `http://localhost:9002/admin/permission/fetchpermission/${jsonData.role}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
     setPermissionVal(json[0].permission[0])
  };
  const Logout = () => {
    localStorage.removeItem("usertoken");
    navigate('/admin/home');
    window.location.reload();   
    setIslogin(false);
    alert("your are loged out")
  };
   
  useEffect(() => {
    getPermission();
  }, []);

  return (
    <>
      <div className="navcontainer">
        {!islogin && (
          <nav className="nav">
            <div className="nav-upper-options">
              <div className=" nav-option">
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183321/7.png"
                  className="nav-img"
                  alt="articles"
                />
                <a href="/admin/login" className="jobpost">
                  <h3>Login</h3>
                </a>
              </div>
            </div>
          </nav>
        )}
        {islogin && (
          <nav className="nav">
            <div className="nav-upper-options">
              <>
                <div
                  className="nav-option option"
                  onClick={() => setDashboard(dashboard ? false : true)}
                >
                  <img
                    src="https://media.geeksforgeeks.org/wp-content/uploads/20221210182148/Untitled-design-(29).png"
                    className="nav-img"
                    alt="dashboard"
                  />
                  <h3> Dashboard</h3>
                  {!dashboard && <BsChevronDown className="Icon-size" />}
                </div>
                {dashboard && (
                  <div className="list-item extra-gap">
                    <ul>
                      {" "}
                      <li className="item-gap">NO of Companies Approved</li>
                      <li className="item-gap">NO of Post Pending</li>
                      <li className="item-gap">NO of Post Approved</li>
                    </ul>
                  </div>
                )}

                {permissionVal.Student && (
                  <div
                    className="option2 nav-option"
                    onClick={() => setStudent(student ? false : true)}
                  >
                    <img
                      src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183322/9.png"
                      className="nav-img"
                      alt="articles"
                    />
                    <h3>Students</h3>
                    {!student && <BsChevronDown className="Icon-size" />}
                  </div>
                )}
                {student && (
                  <div className="list-item">
                    <ul>
                      {" "}
                      <li className="item-gap">
                        <a href="/admin/student/addstudent" className="jobpost">
                          Add new Student{" "}
                        </a>
                      </li>
                      <li className="item-gap">
                        <a href="/admin/student/allstudnetData" className="jobpost">
                          All student Data
                        {" "}
                        </a>
                      </li>
                     
                    </ul>
                  </div>
                )}

                {permissionVal.Report && (
                  <div
                    className="nav-option option3"
                    onClick={() => setReport(report ? false : true)}
                  >
                    <img
                      src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183320/5.png"
                      className="nav-img"
                      alt="report"
                    />
                    <h3>Report</h3>
                    {!report && <BsChevronDown className="Icon-size" />}
                  </div>
                )}
                {report && (
                  <div className="list-item extra">
                    <ul>
                      {" "}
                      <li className="item-gap">Student Revenue</li>
                      <li className="item-gap">Companies Revenue</li>
                    </ul>
                  </div>
                )}
                {permissionVal.Companies && (
                  <div
                    className="nav-option option4"
                    onClick={() => setCompanies(companies ? false : true)}
                  >
                    <img
                      src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183321/6.png"
                      className="nav-img"
                      alt="institution"
                    />
                    <h3>Companies</h3>
                    {!companies && <BsChevronDown className="Icon-size" />}
                  </div>
                )}
                {companies && (
                  <div className="list-item">
                    <ul>
                      {" "}
                      <li className="item-gap">
                        <a href="/admin/employer/addEmployer" className="jobpost">
                          Add new Employer{" "}
                        </a>
                      </li>
                      <li className="item-gap">
                        <a href="/admin/employer/allEmployerData" className="jobpost">
                          All Employer Data
                        {" "}
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
                {permissionVal.jobPosting && (
                  <div
                    className="nav-option option5"
                    onClick={() => setJob(job ? false : true)}
                  >
                    <img
                      src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183323/10.png"
                      className="nav-img"
                      alt="blog"
                    />
                    <h3>Job Post</h3>
                    {!job && <BsChevronDown className="Icon-size" />}
                  </div>
                )}
                {job && (
                  <div className="list-item extra">
                    <ul>
                      {" "}
                      <li className="item-gap">Add new Job Post</li>
                      <li className="item-gap">Approve a Job Post</li>
                      <li className="item-gap">See All Pending Job</li>
                    </ul>
                  </div>
                )}
                {permissionVal.Resume && (
                  <div
                    className="nav-option option6"
                    onClick={() => setResume(resume ? false : true)}
                  >
                    <img
                      src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183323/10.png"
                      className="nav-img"
                      alt="blog"
                    />
                    <h3> Resume</h3>
                    {!resume && <BsChevronDown className="Icon-size" />}
                  </div>
                )}
                {resume && (
                  <div className="list-item extra">
                    <ul>
                      {" "}
                      <li className="item-gap">No of Resume</li>
                      <li className="item-gap">Export Resume</li>
                      <li className="item-gap">Profile Video</li>
                    </ul>
                  </div>
                )}

             {isAdmin&&   <div
                 className="nav-option option7"
                  onClick={() => setSetting(setting ? false : true)}
                >
                  <img
                    src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183320/4.png"
                    className="nav-img"
                    alt="settings"
                  />
                  <h3>Setting</h3>
                  {!setting &&  <BsChevronDown className="Icon-size" />}
                </div>}
                {setting && (
                  <div className="list-item extra">
                    <ul>
                      {" "}
                      <li className="item-gap">
                        <a href="/admin/setting/addUser" className="jobpost">
                          Team/Users
                        </a>
                      </li>
                      <li className="item-gap">Payments Setting</li>
                      <li className="item-gap">
                        <a href="/admin/setting/roles&permission" className="jobpost">
                          Roles and Permisson{" "}
                        </a>
                      </li>
                      <li className="item-gap">Email Setting</li>
                      <li className="item-gap">
                        <a href="/admin/setting/viewpermission" className="jobpost">
                          View Permission{" "}
                        </a>
                      </li>
                    </ul>
                  </div>
                )}

                <div className="option2 nav-option" onClick={Logout}>
                  <img
                    src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183321/7.png"
                    className="nav-img"
                    alt="articles"
                  />
                  <h3>Logout</h3>
                </div>
              </>
            </div>
          </nav>
        )}
      </div>
    </>
  );
}

export default Navbar;
