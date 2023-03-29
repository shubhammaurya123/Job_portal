import React, { useEffect, useState , useContext} from "react";
import "../AdminApp.css";

import fecthContext from "../Hooks/FecthContext";
function Viewpermission() {
  const [val, setvalue] = useState([]);
  const context = useContext(fecthContext);
  const {data , getData} = context
 
  useEffect(() => {
    getData(`http://localhost:9002/admin/permission/fetchpermission`);
  }, []);
  return (
    <div className="viewpermission">
    
      <table className="table">
        <thead>
          <tr className="table-entity">
          
            <th scope="col">Role</th>
            <th scope="col">permission</th>
          </tr>
        </thead>
        <tbody>
          {data.map((element, i) => {
            return (
              <tr key = {i} className ="table-Data">
        
                <td>{element.role}</td>
                {
                   <td>{element.permission[0].Student ?  <>Student</> : <></>} {element.permission[0].Companies ?  <>Companies</> : <> </>}  {element.permission[0].Resume ?  <>Resume</> : <> </>}  {element.permission[0].Report ?  <>Report</> : <> </>}  {element.permission[0].jobPosting ?  <>JobPost</> : <> </>} </td> 
                }
               
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Viewpermission;
