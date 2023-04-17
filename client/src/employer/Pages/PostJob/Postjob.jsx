import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import "./PostJob.css"
import { createPost , check} from "../../functions";
// import { useContext } from "react";
// import { AppContext } from "../StateProvider/GlobalState";
// import { ACTIONS } from "../StateProvider/reducer";
import { BsBriefcase } from "react-icons/bs";
import { FiCheckCircle } from "react-icons/fi";
import { GiMoneyStack } from "react-icons/gi";
import SkillTagsInput from "../../Components/SkillTagInput/SkillTagInput";
const EmpPostJob = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [tags, setTags] = React.useState([]);
  var user;
  const [mytags, setMyTags] = useState([]);
  const selectedTags = (tags) => {
    setMyTags(tags)
    return tags;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const employer = jwt_decode(token);
      if (!employer) {
        localStorage.removeItem("token");
        setisLoggedIn(false);
      } else {
        setisLoggedIn(true);
        user = employer;
      }
    } else {
      setisLoggedIn(false);
    }

    const jobPostDetails = JSON.parse(sessionStorage.getItem("jobDetails"));

    setJobDetails({
      ...jobDetails,
      postedBy: {
        ...user,
      },
    });

    if (jobPostDetails) {
      setJobDetails({
        ...jobPostDetails,
        postedBy: {
          ...user,
        },
      });
      console.log({ ...jobPostDetails });
      console.log(user);
    }
  }, []);

  const initialJobDetails = {
    job_title: "",
    postedBy: user,
    employment_type: "",
    wfh: false,
    job_desc: "",
    skills: [],
    work_exp: {
      minExp: "",
      maxExp: "",
    },
    salaryRange: {
      minSal: "",
      maxSal: "",
    },
    location: "",
    industry: "",
    functionalArea: "",
    role: "",
    vacancies: "",
    education: {
      graduation: "",
      diploma: "",
    },
    questions: {
      q1: "",
      q2: "",
      q3: "",
    },
    other: "",
    walkIn: false,
    walkIn_details: {
      start_date: "",
      duration: "",
      contact_person: "",
      contact_number: "",
      venue: "",
      google_maps_url: "",
    },
    // Changes by shivangi-->
    mode: "",
    testrole:"",
    companyType:'',
    testEducation:'',
    // Changes end ---->
  };

  const [jobDetails, setJobDetails] = useState(initialJobDetails);

  const submitForm = (jobDetails, e) => {
    e.preventDefault();
    setJobDetails({
      ...jobDetails,
      skills:tags,
    })
    console.log(jobDetails);
     if(!check(jobDetails)) {
        return
     }
    if (isLoggedIn ) {
      createPost(jobDetails, e);
      sessionStorage.removeItem("jobDetails");
    } else {
      sessionStorage.setItem("jobDetails", JSON.stringify(jobDetails));
      window.location.href = "/employer/login";
    }
  };


  return (
    
    <div className="company">
    <h2 className="company-text">Post a New job!</h2>
    <div className="dec-text">Ready to jump back in?</div>
    <div className="companyItem">
      <span className="profile">Post Job</span>
      <div className="posjob-icon-all-style">
        <div className="message">
          <span className="icon-style-postjob">
            <BsBriefcase />
          </span>
          <div className="text-style-postjob"> Job Detail</div>
        </div>
        <div className="message">
          <span className="icon-style-postjob">
            <GiMoneyStack />
          </span>
          <div className="text-style-postjob">Package & Payments</div>
        </div>
        <div className="message">
          <span className="icon-style-postjob">
            <FiCheckCircle />
          </span>
          <div className="text-style-postjob">Confirmation</div>
        </div>
      </div>

      <form className="addEmployer">
        <div className="form-item1">
         
          <input
            type="text"
            className="input-aria"
            placeholder="Job Title"
            value={jobDetails.job_title}
            onChange={(e) =>
              setJobDetails({
                ...jobDetails,
                job_title: e.target.value,
              })
            }
          />
           <span className = "required">*</span>
        </div>
        <div className="form-item">
          <input
            type="text"
            className="input-aria"
            placeholder="Employment Type"
            value={jobDetails.employment_type}
            onChange={(e) =>
              setJobDetails({
                ...jobDetails,
                employment_type: e.target.value,
              })
            }
          />
        </div>

        <div className="form-item1">
          <input
            type="text"
            className="input-aria3"
            placeholder="Job Description"
            value={jobDetails.job_desc}
            onChange={(e) =>
              setJobDetails({
                ...jobDetails,
                job_desc: e.target.value,
              })
            }
          />
        </div>

        <div className="form-item1">

        <SkillTagsInput type={"text"} selectedTags={selectedTags} tags={tags} setTags={setTags}/>
          {/* <input
            type="text"
            className="input-aria"
            placeholder="Skills"
            value={jobDetails.skills}
            onChange={(e) =>
              setJobDetails({
                ...jobDetails,
                skills: e.target.value,
              })
            }
          /> */}
           <span className = "required">*</span>
        </div>

        <div className="input-aria1 from-item top-m">
          <input
            type="checkbox"
            placeholder="Work From Home"
            value={jobDetails.wfh}
            onChange={(e) =>
              setJobDetails({
                ...jobDetails,
                wfh: !jobDetails.wfh,
              })
            }
          />
          <label>Work From Home</label>
        </div>
        <div className="form-item">
          <input
            type="text"
            className="input-aria"
            placeholder="Min Work Exp"
            value={jobDetails.work_exp.minExp}
            onChange={(e) =>
              setJobDetails({
                ...jobDetails,
                work_exp: {
                  ...jobDetails.work_exp,
                  minExp: e.target.value,
                },
              })
            }
          />
        </div>
        <div className="form-item">
          <input
            type="text"
            className="input-aria"
            placeholder="Max Work Exp"
            value={jobDetails.work_exp.maxExp}
            onChange={(e) =>
              setJobDetails({
                ...jobDetails,
                work_exp: {
                  ...jobDetails.work_exp,
                  maxExp: e.target.value,
                },
              })
            }
          />
        </div>
        <div className="form-item">
          <input
            type="text"
            className="input-aria"
            placeholder="Min Salary(In Lakh)"
            value={jobDetails.salaryRange.minSal}
            onChange={(e) =>
              setJobDetails({
                ...jobDetails,
                salaryRange: {
                  ...jobDetails.salaryRange,
                  minSal: e.target.value,
                },
              })
            }
          />{" "}
          {/* changes by shivangi singh*/}
        </div>
        <div className="form-item">
          <input
            type="text"
            className="input-aria"
            placeholder="Max Salary(In Lakh)"
            value={jobDetails.salaryRange.maxSal}
            onChange={(e) =>
              setJobDetails({
                ...jobDetails,
                salaryRange: {
                  ...jobDetails.salaryRange,
                  maxSal: e.target.value,
                },
              })
            }
          />
        </div>
        {/* changes by shivangi singh*/}
        <div className="form-item1">
          <input
            type="text"
            className="input-aria"
            placeholder="Location"
            value={jobDetails.location}
            onChange={(e) =>
              setJobDetails({
                ...jobDetails,
                location: e.target.value,
              })
            }
          />
           <span className = "required">*</span>
        </div>
        <div className="form-item">
          <input
            type="text"
            className="input-aria"
            placeholder="Industry"
            value={jobDetails.industry}
            onChange={(e) =>
              setJobDetails({
                ...jobDetails,
                industry: e.target.value,
              })
            }
          />
        </div>
        <div className="form-item">
          <input
            type="text"
            className="input-aria"
            placeholder="Functional Area"
            value={jobDetails.functionalArea}
            onChange={(e) =>
              setJobDetails({
                ...jobDetails,
                functionalArea: e.target.value,
              })
            }
          />
        </div>
        <div className="form-item1">
          <input
            type="text"
            className="input-aria1"
            placeholder="Role"
            value={jobDetails.role}
            onChange={(e) =>
              setJobDetails({
                ...jobDetails,
                role: e.target.value,
              })
            }
          />
           <span className = "required">*</span>
        </div>
        <div className="form-item">
          <input
            type="text"
            className="input-aria"
            placeholder="Vacancies"
            value={jobDetails.vacancies}
            onChange={(e) =>
              setJobDetails({
                ...jobDetails,
                vacancies: e.target.value,
              })
            }
          />
        </div>
        <div className="form-item">
          <input
            type="text"
            className="input-aria"
            placeholder="Graduation"
            value={jobDetails.education.graduation}
            onChange={(e) =>
              setJobDetails({
                ...jobDetails,
                education: {
                  ...jobDetails.education,
                  graduation: e.target.value,
                },
              })
            }
          />
        </div>
        <div className="form-item">
          <input
            type="text"
            className="input-aria"
            placeholder="Diploma"
            value={jobDetails.education.diploma}
            onChange={(e) =>
              setJobDetails({
                ...jobDetails,
                education: {
                  ...jobDetails.education,
                  diploma: e.target.value,
                },
              })
            }
          />
        </div>
        <div className="form-item">
          <input
            type="text"
            className="input-aria"
            placeholder="Question 1"
            value={jobDetails.questions.q1}
            onChange={(e) =>
              setJobDetails({
                ...jobDetails,
                questions: {
                  ...jobDetails.questions,
                  q1: e.target.value,
                },
              })
            }
          />
        </div>
        <div className="form-item">
          <input
            type="text"
            className="input-aria"
            placeholder="Question 2"
            value={jobDetails.questions.q2}
            onChange={(e) =>
              setJobDetails({
                ...jobDetails,
                questions: {
                  ...jobDetails.questions,
                  q2: e.target.value,
                },
              })
            }
          />
        </div>
        <div className="form-item">
          <input
            type="text"
            className="input-aria"
            placeholder="Question 3"
            value={jobDetails.questions.q3}
            onChange={(e) =>
              setJobDetails({
                ...jobDetails,
                questions: {
                  ...jobDetails.questions,
                  q3: e.target.value,
                },
              })
            }
          />
        </div>
        <div className="input-aria1 from-item top-m">
          <input
            type="checkbox"
            placeholder="Walk In"
            value={jobDetails.walkIn}
            onChange={(e) =>
              setJobDetails({
                ...jobDetails,
                walkIn: !jobDetails.walkIn,
              })
            }
          />
          <label>Walk In</label>
        </div>
        <div className="form-item">
          <label>Start Date</label>
          <input
            type="date"
            className="input-aria"
            placeholder="Start Date"
            value={jobDetails.walkIn_details.start_date}
            onChange={(e) =>
              setJobDetails({
                ...jobDetails,
                walkIn_details: {
                  ...jobDetails.walkIn_details,
                  start_date: e.target.value,
                },
              })
            }
          />
        </div>
        <div className="form-item">
          <input
            className="input-aria"
            type="text"
            placeholder="Duration"
            value={jobDetails.walkIn_details.duration}
            onChange={(e) =>
              setJobDetails({
                ...jobDetails,
                walkIn_details: {
                  ...jobDetails.walkIn_details,
                  duration: e.target.value,
                },
              })
            }
          />
        </div>
        <div className="form-item">
          <input
            className="input-aria"
            type="text"
            placeholder="Contact Person"
            value={jobDetails.walkIn_details.contact_person}
            onChange={(e) =>
              setJobDetails({
                ...jobDetails,
                walkIn_details: {
                  ...jobDetails.walkIn_details,
                  contact_person: e.target.value,
                },
              })
            }
          />
        </div>
        <div className="form-item1">
          <input
            type="text"
            className="input-aria"
            placeholder="Contact Number"
            value={jobDetails.walkIn_details.contact_number}
            onChange={(e) =>
              setJobDetails({
                ...jobDetails,
                walkIn_details: {
                  ...jobDetails.walkIn_details,
                  contact_number: e.target.value,
                },
              })
            }
          />
          <span className = "required">*</span>
        </div>
        <div className="form-item">
          <input
            type="text"
            className="input-aria"
            placeholder="Venue"
            value={jobDetails.walkIn_details.venue}
            onChange={(e) =>
              setJobDetails({
                ...jobDetails,
                walkIn_details: {
                  ...jobDetails.walkIn_details,
                  venue: e.target.value,
                },
              })
            }
          />
        </div>
        <div className="form-item">
          <input
            type="text"
            className="input-aria"
            placeholder="Google Maps Url"
            value={jobDetails.walkIn_details.google_maps_url}
            onChange={(e) =>
              setJobDetails({
                ...jobDetails,
                walkIn_details: {
                  ...jobDetails.walkIn_details,
                  google_maps_url: e.target.value,
                },
              })
            }
          />
        </div>
        <div className="form-item">
          {/* -----Changes By Shivangi Singh---- */}
          <input
            type="text"
            placeholder="Education"
            className="input-aria"
            value={jobDetails.testEducation}
            onChange={(e) =>
              setJobDetails({
                ...jobDetails,
                testEducation: e.target.value,
              })
            }
          />
        </div>
        <div className="form-item1">
          <div className="input-aria1">
            <label>Work Mode</label>
            <input
              type="radio"
              value="Work from office"
              name="workmode"
              onClick={(e) => {
                setJobDetails({ ...jobDetails, mode: e.target.value });
              }}
            />
            <label>Work from office</label>
            <input
              type="radio"
              value="Work from home"
              name="workmode"
              onClick={(e) => {
                setJobDetails({ ...jobDetails, mode: e.target.value });
              }}
            />{" "}
            <label>Work from home</label>
            <input
              type="radio"
              value="Hybrid"
              name="workmode"
              onClick={(e) => {
                setJobDetails({ ...jobDetails, mode: e.target.value });
              }}
            />{" "}
            <label>Hybrid</label>
            <input
              type="radio"
              value="Temp WFH"
              name="workmode"
              onClick={(e) => {
                setJobDetails({ ...jobDetails, mode: e.target.value });
              }}
            />{" "}
            <label>Temp WFH</label>
          </div>
          <span className = "required">*</span>
        </div>
        <div className="form-item1">
          <select
            value={jobDetails.testrole}
            onChange={(e) => {
              setJobDetails({ ...jobDetails, testrole: e.target.value });
            }}
            placeholder="select"
          >
            <option>--- Select Role ---</option>
            <option value="Intern">Intern</option>
            <option value="Manager">Manager</option>
            <option value="Front End Developer">Front End Developer</option>
            <option value="Full Stack Developer">Full Stack Developer</option>
            <option value="Software Developer">Software Developer</option>
            <option value="Accountants">Accountants</option>
            <option value="UI/UX Designer">UI-UX Designer</option>
            <option value="Graphic Designer">Graphic Designer</option>
          </select>
          <span className = "required">*</span>
        </div>
        <div className="form-item1">
          <div className="input-aria1">
            <label>Company Type</label>
            <input
              type="radio"
              value="startup"
              name="type"
              onClick={(e) => {
                setJobDetails({ ...jobDetails, companyType: e.target.value });
              }}
            />
            <label>startup</label>
            <input
              type="radio"
              value="indian MNC"
              name="type"
              onClick={(e) => {
                setJobDetails({ ...jobDetails, companyType: e.target.value });
              }}
            />{" "}
            <label>Indian MNC</label>
            <input
              type="radio"
              value="foreign MNC"
              name="type"
              onClick={(e) => {
                setJobDetails({ ...jobDetails, companyType: e.target.value });
              }}
            />{" "}
            <label>Foreign MNC</label>
            <input
              type="radio"
              value="corporate"
              name="type"
              onClick={(e) => {
                setJobDetails({ ...jobDetails, companyType: e.target.value });
              }}
            />{" "}
            <label>Corporate</label>
          </div>
          <span className = "required">*</span>
        </div>

        {/*  changes <--end---> */}
      </form>
      <button
        className="add-btn"
        onClick={(e) => submitForm(jobDetails, e)}
      >
        Post Job
      </button>
    </div>
  </div>
  );
};

export default EmpPostJob;
