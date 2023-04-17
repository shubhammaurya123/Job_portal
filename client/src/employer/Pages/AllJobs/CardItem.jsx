import { React  } from "react";
// import "../Student/Student.css"
import { CiLocationOn } from "react-icons/ci";
import { MdAttachMoney, MdOutlineVisibility } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineCheck } from "react-icons/ai";
import {  FiEdit } from "react-icons/fi";

import fecthContext from "../../Hooks/FecthContext";

import "./CardItem.css";

import { useContext } from "react";
   
//  import { faAddressBook } from '@fortawesome/free-solid-svg-icons'
function CardItem(props) {
  const context = useContext(fecthContext)
  const{setData } = context
  const {
    id,
    title,
    company,
    minExp,
    maxExp,
    salarymax,
    salarymin,
    location,
    date,
    skills,
    companytype,
    vacancies,
    mode,
    value,
    length
    ,item
  } = props;
  const ViewProfile =()=>{
    window.location.href = `/employer/jobprofile/${id}`
}
  const HandleAplliedStudnet =() =>{
    localStorage.removeItem('itemJobValue')
    localStorage.setItem('itemJobValue' ,JSON.stringify(item));
     window.location.href = "/employer/appliedStudent";
  }
  const EditFeatured = ()=>{
   console.log(item);
   localStorage.removeItem('itemValue')
    localStorage.setItem('itemValue' ,JSON.stringify(item));
     window.location.href = "/employer/featured";
  }
  return (
    <>
      <div className="Empalljobs">
        <div className="img-title">
          <img
            src="https://picsum.photos/200/300"
            alt="Avatar"
            className="cardImage"
          ></img>
          <ul className="list-style">
            <li>
              {" "}
              <h3 className="name-style">{title}</h3>
            </li>
            <li>
              <span className="role-style">{companytype}</span>
            </li>
            <li>
              {" "}
              <span className="role-style">{company}</span>
            </li>
            <li className="CardItemlistVlaue">No of Opening {vacancies}</li>
            <li>
              {" "}
              <span className="role-style">
                {" "}
                {`${minExp ?  minExp :""} - ${maxExp ? maxExp :""}`} years {" "}
              </span>
            </li>
            <li>
              {" "}
              <span className="role-style">
                {" "}
                {`${salarymin} -${salarymax}`} Lakh{" "}
              </span>
            </li>
            <li>
              <span>
                {" "}
                <CiLocationOn />
                {location}
              </span>
            </li>
          </ul>
        </div>

        <div className="blue-style applied" onClick={HandleAplliedStudnet}>{length} Applied</div>

        <div>
          {date}
        </div>
        <div className="blue-style">Active</div>

        <ul className="view-btn-style-alljob">
          <li onClick={ViewProfile}>
            <div className="btn-style">
              <MdOutlineVisibility />
            </div>
          </li>

          <li >
            <div className="btn-style">
              <FiEdit />
            </div>
          </li>
          <li>
            <div className="btn-style">
              <RiDeleteBin6Line />
            </div>
          </li>
        </ul>
      </div>
      <hr />
    </>
  );
}

export default CardItem;

