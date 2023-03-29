import FecthContext from "./FecthContext";
import { useState } from "react";


import axios from "axios";

const FecthState = (props) => {
  const host = "http://localhost:5000"
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
  const[email , setEmail] = useState("skmaurya9721@gmail.com");

  // Get all Notes

  const getData = async (url) =>{
    axios
    .get(url)
    .then((res) => {
      setData(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
  // Add a Note
 

  return (
    <FecthContext.Provider value={{ data, getData , email , setEmail ,setData}}>
      {props.children}
    </FecthContext.Provider>
  )

}
export default FecthState;