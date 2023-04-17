import {React, useEffect, useState } from "react";
// import "../Student/Student.css"
import { CiLocationOn } from "react-icons/ci";
import { MdAttachMoney, MdOutlineVisibility } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineCheck } from "react-icons/ai";

import { useContext } from "react";


//  import { faAddressBook } from '@fortawesome/free-solid-svg-icons'
function EmpCardItem(props) { 
  const{ applicantId , jobId} = props
  const[details , setDetails] = useState({})
      const ApporveStundent = async(id)=>{
        const res = await fetch(`http://localhost:9002/api/job/apporvedStudent/${details._id}/${jobId}`, {
          method: "PATCH",
         })

         console.log("succesfull")
      }
      const RejectedStundent = async(id)=>{
        const res = await fetch(`http://localhost:9002/api/job/rejectedStudent/${details._id}/${jobId}`, {
          method: "PATCH",
         })

         console.log("succesfull")
      }

     const ViewProfile =()=>{
         window.location.href = `/employer/studentprofile/${details._id}`
     }
     
    const getDetails = async (id) => {
        const res = await fetch('http://localhost:9002/employer/api/applicantDetails', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                applicant_id: id,
            })
        })
    
        const data = await res.json()
        // console.log(data);
        if (data.status === 'ok') {
            setDetails(data.applicant)
            // console.log(data)
            // return (data.applicant)
        }
        else {
            console.log('Error')
        }
        // else return "Couldnt Connect"
    
    }
    useEffect(()=>{
        getDetails(applicantId)
    },[])
    

  
  return (
    <div className="studentCardItem">
    <img
      src="https://picsum.photos/200/300"
      alt="Avatar"
      className="cardImage"
    ></img>
    <div className="content">
      <h3 className="name-style"> {details.name}</h3>
      <div className="contentItem">
        <span className="role-style">{details.mobile}</span>

        <span>
          {" "}
          <CiLocationOn />
           India
        </span>
      </div>

      <span>
          {details.email}
        </span>
     
      <div>
         {details.age} years
      </div>

      <ul className="CardItemlist">
        <li className="CardItemlistVlaue">{details.gender ? details.gender :"Male" }</li>
        <li className="CardItemlistVlaue">App</li>
        {/* <li className="CardItemlistVlaue">Digital</li> */}
      </ul>

      <ul className="view-btn-style">
        <li onClick={ViewProfile}>
          <div className="btn-style">
            <MdOutlineVisibility />
          </div>
        </li>
        <li onClick={ApporveStundent}> 
          <div className="btn-style">
            <AiOutlineCheck />
          </div>
        </li>
        <li onClick={RejectedStundent}>
          <div className="btn-style">
            <RxCrossCircled />
          </div>
        </li>
        <li>
          <div className="btn-style">
            <RiDeleteBin6Line />
          </div>
        </li>
      </ul>
    </div>
  </div>
  );
}

export default EmpCardItem;
