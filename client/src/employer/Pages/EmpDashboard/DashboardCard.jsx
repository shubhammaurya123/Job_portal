import React, { useEffect, useState } from "react";
import "./EmpDashboard.css";
import { BsBriefcase, BsBookmark } from "react-icons/bs";



import { TbFileInvoice } from "react-icons/tb";
import { TfiCommentAlt} from "react-icons/tfi";
function DashboardCard(props) {

  
  return (
    <div className="DashboardCard">
      <div className="dashboardCardItem">
        <span className="icon-style-Dashboard1">
            <BsBriefcase  />
         </span>
     
        <div className="cardvalue">
          <div className="card-number-value1">{props.size.length}</div>
          <div className="card-text-value">Posted Jobs</div>
        </div>
      </div>
      <div className="dashboardCardItem">
        <span className="icon-style-Dashboard2">
            <TbFileInvoice />
         </span>
     
        <div className="cardvalue">
          <div className="card-number-value2">{props.num_applicant}</div>
          <div className="card-text-value">Application</div>
        </div>
      </div>
      <div className="dashboardCardItem">
        <span className="icon-style-Dashboard3">
            <TfiCommentAlt  />
         </span>
     
        <div className="cardvalue">
          <div className="card-number-value3">74</div>
          <div className="card-text-value">Massage</div>
        </div>
      </div>
      <div className="dashboardCardItem">
        <span className="icon-style-Dashboard4">
            <BsBookmark  />
         </span>
     
        <div className="cardvalue">
          <div className="card-number-value4">32</div>
          <div className="card-text-value">SortList</div>
        </div>
      </div>
   
    </div>
  );
}

export default DashboardCard;
