import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

const EditDetail = () => {
  const initialDetails = {
    personalHiring: false,
    companyHiring: false,
    companyName: "",
    domainName: "",
    designation: "",
    pinCode: "",
    address: "",
  };

  const [tempDetails, setTempDetails] = useState(initialDetails);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const employer = jwt_decode(token);
      if (!employer) {
        localStorage.removeItem("token");
        window.location.href = "/employer/home";
      }
    } else {
      console.log("Please Log In!");
      window.location.href = "/employer/home";
    }
  }, []);

  const updateDetails = async (e) => {
    e.preventDefault();

    const req = await fetch("http://localhost:9002/employer/api/details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        details: tempDetails,
      }),
    });

    const data = await req.json();
    if (data.status === "ok") {
      alert("Details Edited Successfully!");
      window.location.href = "/employer/dashboard";
    } else {
      alert(data.error);
    }
  };

  const setPersonal = () => {
    const temp = tempDetails.personalHiring;
    setTempDetails({
      ...tempDetails,
      personalHiring: !temp,
    });
  };

  const setCompany = () => {
    const temp = tempDetails.companyHiring;
    setTempDetails({
      ...tempDetails,
      companyHiring: !temp,
    });
  };

  return (
    <div className="company">
      <h2 className="company-text">Edit Details!</h2>
      <div className="dec-text">Ready to jump back in?</div>
      <div className="companyItem">
        <div className="addEmployer">
          <div className="form-item">
            <div className="input-aria1">
              <input
                type="checkbox"
                onChange={setPersonal}
                checked={tempDetails.personalHiring}
              />
              <label>Hiring for Personal Needs</label>
            </div>
          </div>
          <div className="form-item">
            <div className="input-aria1">
              <input
                type="checkbox"
                onChange={setCompany}
                checked={tempDetails.companyHiring}
              />
              <label>Hiring for Company</label>
            </div>
          </div>
          <div className="form-item">
            <label> Company Name:</label>
            <br />
            <input
                type="text"
                placeholder="Company Name"
                className="input-aria"
                value={tempDetails.companyName}
                onChange={(e) =>
                setTempDetails({
                    ...tempDetails,
                    companyName: e.target.value,
                })
                }
            />
          </div>
          <div className="form-item">
            <label> Designation</label>
            
            <input
                type="text"
                placeholder="Designation"
                className="input-aria"
                value={tempDetails.designation}
                onChange={(e) =>
                    setTempDetails({
                    ...tempDetails,
                    designation: e.target.value,
                    })
                }
                />
          </div>
          <div className="form-item">
            <label> Address:</label>
            <br />
            <input
            type="text"
            placeholder="Address"
            className="input-aria"
            value={tempDetails.address}
            onChange={(e) =>
                setTempDetails({
                ...tempDetails,
                address: e.target.value,
                })
            }
            />
          </div>
        </div>
        <button type="submit" className="add-btn" onClick={updateDetails}>
          Edit Details
        </button>
      </div>
    </div>
  );
};

export default EditDetail;

// <div className="detailsForm">
//       <h1>Edit details :</h1>
//       <form onSubmit={updateDetails}>
//         <input
//           type="checkbox"
//           onChange={setPersonal}
//           checked={tempDetails.personalHiring}
//         />
//         <label>Hiring for Personal Needs</label>
//         <br />
//         <input
//           type="checkbox"
//           onChange={setCompany}
//           checked={tempDetails.companyHiring}
//         />
//         <label>Hiring for Company</label>
//         <br />
//         <input
//           type="text"
//           placeholder="Company Name"
//           value={tempDetails.companyName}
//           onChange={(e) =>
//             setTempDetails({
//               ...tempDetails,
//               companyName: e.target.value,
//             })
//           }
//         />
//         <br />
//         <input
//           type="text"
//           placeholder="Domain Name"
//           value={tempDetails.domainName}
//           onChange={(e) =>
//             setTempDetails({
//               ...tempDetails,
//               domainName: e.target.value,
//             })
//           }
//         />
//         <br />
//         <input
//           type="text"
//           placeholder="Designation"
//           value={tempDetails.designation}
//           onChange={(e) =>
//             setTempDetails({
//               ...tempDetails,
//               designation: e.target.value,
//             })
//           }
//         />
//         <br />
//         <input
//           type="text"
//           placeholder="Pin Code"
//           value={tempDetails.pinCode}
//           onChange={(e) =>
//             setTempDetails({
//               ...tempDetails,
//               pinCode: e.target.value,
//             })
//           }
//         />
//         <br />
//         <input
//           type="text"
//           placeholder="Address"
//           value={tempDetails.address}
//           onChange={(e) =>
//             setTempDetails({
//               ...tempDetails,
//               address: e.target.value,
//             })
//           }
//         />
//         <br />
//         <input type="submit" />
//       </form>
//     </div>
