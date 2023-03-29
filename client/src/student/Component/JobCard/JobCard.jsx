import React from "react";
import { BiShoppingBag ,BiRupee,BiDockTop ,BiLocationPlus} from 'react-icons/bi';
import {CiCalendarDate} from 'react-icons/ci';
import {  useNavigate } from "react-router-dom";


const JobCard = ({id,title,company,minExp,maxExp,salarymax,salarymin,location,date,skills}) =>{
    const navigate = useNavigate();
 

    const click = ()=>{
        navigate( `/student/${title}/${id}`)
    }
    return(
        <div className="job-item-cn">
              <h3 onClick={click} style={{cursor:"pointer"}}>{title}</h3>
             <h4> <span style={{ filter: "blur(4px)" }}> {company}</span></h4>
              <div className="rating-cn">
              </div>
            <div style={{display:"flex"}}>
              <p><BiShoppingBag/><span>{minExp}-{maxExp} Years</span></p> 
              <p><i><BiRupee/></i><span>{salarymin} - {salarymax} Lakh</span></p> 
              <p><i><BiLocationPlus/></i><span>{location}</span></p> 
            </div>
            <div><i><BiDockTop/></i>Lorem, ipsum dolor sit amet consectetur adipisicing elit..</div>
            <div className="tag-cn">
                <h4 className="tag-h4">Key Skill</h4>
                {skills.map((tag,index)=>{
                    return <p className="tag-p" key={index}>{tag}</p>
                })}
                
            </div>
            <p><CiCalendarDate/> {date}</p>
        </div>
    )

}


export default JobCard