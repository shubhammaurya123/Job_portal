import FecthContext from "./FecthContext";
import { useState } from "react";




const FecthState = (props) => {

  const notesInitial = {
    job_title: "",
    postedBy: {name :"admin" ,email: "jyotichutaniebook@gmail.com"},
    employment_type: "",
    wfh: false,
    job_desc: "",
    skills: "",
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
    testrole: "",
    companyType: '',
    testEducation: '',
    // Changes end ---->
  };
  const [data, setData] = useState(notesInitial)
  
  // Get all Notes


  return (
    <FecthContext.Provider value={{ data, setData}}>
      {props.children}
    </FecthContext.Provider>
  )

}
export default FecthState;