import React, { useEffect, useState } from "react";
// import "./Company.css";
import { BsArrowUp } from "react-icons/bs";
function AddNews() {

  const [newsData, setNewsData] = useState({ title :"" ,content: ""}) 
 
    const addNews = async () => {
    // API Call
    const response = await fetch(
      `http://localhost:9002/admin/addNews`,
      {
        method: "POST",
        body: JSON.stringify({
             newsData,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
     alert("adding News successfull")
     setNewsData({ title :"" ,content: ""})
  };

  const onChange = (e)=>{
    setNewsData({...newsData, [e.target.name]: e.target.value})
 }

  return (
    <div className="company">
      <h2 className="company-text">Add News!</h2>
      <div className="dec-text">Ready to jump back in?</div>
      <div className="companyItem">
        <div className="addEmployer">
          <div className="">
            <label> Title:</label> <br />
            <input
              value={newsData.title}
              onChange={onChange}
              name="title"
              placeholder="Title"
              className="input-aria1"
            >
            </input>
          </div>
          <div className="form-item">
            <label> Content:</label>
            <br />
            <input
              type="text"
              placeholder="Add News Contant"
              className="input-aria3"
              name="content"
              value={newsData.content}
              onChange={onChange}
            />
          </div>
         
        </div>
            <button type="submit" className="add-btn" onClick={addNews}>
                Add News
            </button>
      </div>
    </div>
  );
}

export default AddNews;
