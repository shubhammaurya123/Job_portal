import React, { useEffect, useState } from "react";

function Viewpermission() {
  const [val, setvalue] = useState([]);
  const getPermission = async () => {
    // API Call
    const response = await fetch(
      `http://localhost:9002/admin/permission/fetchpermission`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    setvalue(json);
  };

  useEffect(() => {
    getPermission();
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
          {val.map((element, i) => {
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
