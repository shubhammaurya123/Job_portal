import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSearchParams } from "react-router-dom";
import Select from "react-select";
import useFetch from "../../controllers/useFetch";
import SpringModal from "../Modal";
import "./Search.css";
import { salaryOption,experienceOption,tempSkillOption} from "../../JobFilter";
import CustomSelectForm from "../CustomSelectForm";

const Search = () => {
  const navigate = useNavigate();

  const [nextInput, setNextInput] = useState(150);
  const [skillOption, setSkillSearchOption] = useState(null);
  const [designation, setDesigation] = useState(null);
  const [salary, setSalary] = useState(null);
  const [experience, setExperience] = useState(null);
  const [location, setLocation] = useState(null);


  const nextInputStyle = {
    transform: `translateX(${nextInput}%)`,
  };

  const [data, isLoading] = useFetch("http://localhost:9002/admin/designation");

  useEffect(() => {
    if (isLoading === true) {
      setSkillSearchOption(tempSkillOption);
    } else {
      const dataArray = [];
      data.data.forEach((element) => {
        dataArray.push({
          value: element.designation,
          label: element.designation,
        });
        setSkillSearchOption(dataArray);
      });
    }
  }, [data]);

const handleOptionChange = (selectedOption) =>{
  if(selectedOption.value && selectedOption.value !== ''){
    setLocation(selectedOption)
  }
}
  const formHandler = (e) => {
    e.preventDefault();
    let paramsArray = [];
    designation.forEach((element) => {
      paramsArray.push(element.value);
    });
    const params = {
      q: "search",
      designation: `${paramsArray.length > 0 ? paramsArray.toString() : ""}`,
      experience: `${experience ? experience.value : ""}`,
      salary: `${salary ? salary.value : ""}`,
      location: `${location ? location.value : ""}`,
    };
    if (Object.values(params).some(Boolean)) {
      navigate({
        pathname: "/student/job",
        search: `?${createSearchParams(params)}`,
      });
    } else {
      alert("You need to fill the form");
    }
  };

  return (
    <>
      <section className="search-section">
        <SpringModal
          child={
            <>
              <div className="form-wrapper form-pos">
                <div className="form-container">
                  <form className="search-form" onSubmit={formHandler}>
                    <div
                      className="form-element designation-input"
                      style={nextInputStyle}
                    >
                      <label>Hi What are your looking for?</label>
                      <Select
                        options={skillOption}
                        onChange={setDesigation}
                        placeholder="Search"
                        isMulti
                        unstyled
                      />
                      <div
                        onClick={() => {
                          setNextInput(nextInput - 100);
                        }}
                        className="next-btn"
                      >
                        Next
                      </div>
                    </div>
                    <div className="form-element" style={nextInputStyle}>
                      <label>Experience?</label>
                      <Select
                        options={experienceOption}
                        onChange={setExperience}
                        placeholder="Your Experience"
                        unstyled
                      />
                      <div className="next-prev-cn">
                        <div
                          onClick={() => {
                            setNextInput(nextInput + 100);
                          }}
                          className="prev-btn"
                        >
                          Previous
                        </div>
                        <div
                          onClick={() => {
                            setNextInput(nextInput - 100);
                          }}
                          className="next-btn"
                        >
                          Next
                        </div>
                      </div>
                    </div>
                    <div className="form-element" style={nextInputStyle}>
                      <label>Expected Salary?</label>
                      <Select
                        options={salaryOption}
                        onChange={setSalary}
                        placeholder="Salary"
                        unstyled
                      />
                      <div className="next-prev-cn">
                        <div
                          onClick={() => {
                            setNextInput(nextInput + 100);
                          }}
                          className="prev-btn"
                        >
                          Previous
                        </div>
                        <div
                          onClick={() => {
                            setNextInput(nextInput - 100);
                          }}
                          className="next-btn"
                        >
                          Next
                        </div>
                      </div>
                    </div>
                    <div className="form-element" style={nextInputStyle}>
                      <label>Preferred Location</label>
                      <CustomSelectForm handleOptionChange={handleOptionChange}/>
                      <div
                        onClick={() => {
                          setNextInput(nextInput + 100);
                        }}
                        className="prev-btn"
                      >
                        Previous
                      </div>
                      <button>Search</button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          }
        />
      </section>
    </>
  );
};

export default Search;
