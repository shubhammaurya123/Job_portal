import {React } from "react";
import "../Student/Student.css"
import { CiLocationOn } from "react-icons/ci";
import { MdAttachMoney, MdOutlineVisibility } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineCheck } from "react-icons/ai";
import fecthContext from "../../Hooks/FecthContext";
import { useContext } from "react";
import { json, useNavigate } from 'react-router-dom';

//  import { faAddressBook } from '@fortawesome/free-solid-svg-icons'
function StudentcardItem(props) {
  const context = useContext(fecthContext);
  const { setEmail} = context
  const navigate = useNavigate();
  const{name , mobile,email ,value, age , gender,profileVideoLink} = props
  const{pinCode ,designation,address , domainName,companyName} = props
  const{id,title,company,minExp,maxExp,salarymax,salarymin,location,date,skills , companytype , vacancies ,mode} =props

  const VisbilityHandle =()=>{
     setEmail(email);
     navigate(`/admin/EmployerPostjob/?=${email}`)
  }
  
  return (
    <>
   {value ==="Student"&& <div className="studentCardItem">
      <img
        src="https://picsum.photos/200/300"
        alt="Avatar"
        className="cardImage"
      ></img>
      <div className="content">
        <h3 className="name-style"> {name}</h3>
        <div className="contentItem">
          <span className="role-style">{mobile}</span>

          <span>
            {" "}
            <CiLocationOn />
            {email}
          </span>
        </div>

        <div>
          <MdAttachMoney />
           {age} years
        </div>

        <ul className="CardItemlist">
          <li className="CardItemlistVlaue">{gender}</li>
          <li className="CardItemlistVlaue">{profileVideoLink}</li>
          {/* <li className="CardItemlistVlaue">Digital</li> */}
        </ul>

        <ul className="view-btn-style">
          <li>
            <div className="btn-style">
              <MdOutlineVisibility />
            </div>
          </li>
          <li>
            <div className="btn-style">
              <AiOutlineCheck />
            </div>
          </li>
          <li>
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
    </div>}
    {value ==="Employer"&& <div className="studentCardItem">
      <img
        src="https://picsum.photos/200/300"
        alt="Avatar"
        className="cardImage"
      ></img>
      <div className="content">
        <h3 className="name-style"> {name}</h3>
        <div className="contentItem">
          <span className="role-style">{mobile}</span>

          <span>
            {" "}
            <CiLocationOn />
            {email}
          </span>
        </div>

        <div>
          <MdAttachMoney />
           {age} years
        </div>

        <ul className="CardItemlist">
            <li className="CardItemlistVlaue">{companyName}</li>
          <li className="CardItemlistVlaue">{domainName}</li>
          <li className="CardItemlistVlaue">{designation}</li>
        
        </ul>

        <ul className="view-btn-style">
          <li onClick={VisbilityHandle} >
            <div className="btn-style" >
              <MdOutlineVisibility />
            </div>
          </li>
          <li>
            <div className="btn-style">
              <AiOutlineCheck />
            </div>
          </li>
          <li>
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
    </div>}

    {value ==="postjob"&& <div className="studentCardItem">
      <img
        src="https://picsum.photos/200/300"
        alt="Avatar"
        className="cardImage"
      ></img>
      <div className="content">
        <h3 className="name-style">{title}</h3>
        <div className="contentItem">
        <span className="role-style">{companytype}</span>
          <span className="role-style">{company}</span>

          <span>
            {" "}
            <CiLocationOn />
            {location}
          </span>
        </div>

        <div>
          <MdAttachMoney />
           {`${minExp} - ${maxExp}` } years
           <br/>
           {`${salarymin} -${salarymax}` } Lakh
        </div>

        <ul className="CardItemlist">
            <li className="CardItemlistVlaue">{location}</li>
          <li className="CardItemlistVlaue">{skills}</li>
          <li className="CardItemlistVlaue">{date}</li>
          
        </ul>
        <ul className="CardItemlist">
            <li className="CardItemlistVlaue">{mode}</li>
          <li className="CardItemlistVlaue">No of Opening {vacancies}</li>
        
        </ul>
        <ul className="view-btn-style">
          <li>
            <div className="btn-style">
              <MdOutlineVisibility />
            </div>
          </li>
          <li>
            <div className="btn-style">
              <AiOutlineCheck />
            </div>
          </li>
          <li>
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
    </div>}
    </>
  );
}

export default StudentcardItem;
