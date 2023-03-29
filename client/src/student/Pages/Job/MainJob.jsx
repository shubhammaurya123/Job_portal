import React, { useEffect,useState } from "react";
import {
  useNavigate,
  useLocation,
  createSearchParams,
  useSearchParams,
} from "react-router-dom";
import { JobFilter } from "../../JobFilter";
import JobList from "../../Component/JobList/JobList";
import DiscreteSlider from "../../Component/ExperienceSlider";
import NonLinearSlider from "../../Component/SalarySlider";
import FilterCheckbox from "../../Component/FilterCheckbox";
import "./Job.css";


export default function MainJob() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const curLocation = location.pathname;
  

// Function for removing state of unchecked box
  function removeElement(arr, element) {
    const index = arr.indexOf(element);
    if (index !== -1) {
      arr.splice(index, 1);
    }
  }
  let exp = location.state ? location.state.exp : 3;
  let salary = location.state ? location.state.salary : 7;
  let cType = location.state ? location.state.cType : [];
  let wMode = location.state ? location.state.wMode : [];
  let edu = location.state ? location.state.edu : [];
  let loc = location.state ? location.state.loc : [];
  let role = location.state ? location.state.role : [];

  let newSearchParams;
  if (searchParams.get("q") === "filter") {
    newSearchParams = new URLSearchParams(location.search);
  } else {
    newSearchParams = new URLSearchParams();
  }
  newSearchParams.set("q", "filter");

  const handleCheckboxChange = (checked, value, list, nav) => {
    let param;
    if (checked) {
      list.push(value);
    } else {
      removeElement(list, value);
    }
    param = list.join(",");
    newSearchParams.delete(nav);
    newSearchParams.append(nav, param);

    navigate(`/student/job?${createSearchParams(newSearchParams)}`, {
      state: { cType, wMode, edu, loc, role, salary, exp, from: curLocation },
    });
  };

  const handleTypeCheckboxChange = (e) => {
    handleCheckboxChange(e.target.checked, e.target.value, cType, "type");
  };
  const handleRoleCheckboxChange = (e) => {
    handleCheckboxChange(e.target.checked, e.target.value, role, "role");
  };
  const handleModeCheckboxChange = (e) => {
    handleCheckboxChange(e.target.checked, e.target.value, wMode, "wmode");
  };
  const handleEduCheckboxChange = (e) => {
    handleCheckboxChange(e.target.checked, e.target.value, edu, "e");
  };
  const handleLocationCheckboxChange = (e) => {
    handleCheckboxChange(e.target.checked, e.target.value, loc, "location");
  };

  const salaryHandleChange = (e) => {
    salary = e.target.value;
    newSearchParams.set("salary", e.target.value);
    navigate(`/student/job?${createSearchParams(newSearchParams)}`, {
      state: { cType, wMode, edu, loc, role, salary, exp, from: curLocation },
    });
  };
  const expHandleChange = (e) => {
    exp = e.target.value;
    newSearchParams.set("exp", e.target.value);
    navigate(`/student/job?${createSearchParams(newSearchParams)}`, {
      state: { cType, wMode, edu, loc, role, salary, exp, from: curLocation },
    });
  };
  

   
  
  return (
    <main style={{ display: "flex" }}>
      <section className="filter-main-cn">
        <h2>Job Filter</h2>
        <DiscreteSlider handleChange={expHandleChange} value={exp} />
        <NonLinearSlider handleChange={salaryHandleChange} value={salary} />
        <FilterCheckbox
          styleClass="type-form"
          Headerlabel={JobFilter[0].filterTitle}
          option={JobFilter[0].filterOption}
          handleCheckbox={handleTypeCheckboxChange}
          name={JobFilter[0].filterTitle}
          list={cType}
        />

        <FilterCheckbox
          styleClass="work-mode-form"
          Headerlabel={JobFilter[1].filterTitle}
          option={JobFilter[1].filterOption}
          handleCheckbox={handleModeCheckboxChange}
          name={JobFilter[1].filterTitle}
          list={wMode}
        />
        <FilterCheckbox
          styleClass="education-form"
          Headerlabel={JobFilter[2].filterTitle}
          option={JobFilter[2].filterOption}
          handleCheckbox={handleEduCheckboxChange}
          name={JobFilter[2].filterTitle}
          list={edu}
        />
        <FilterCheckbox
          styleClass="location-form"
          Headerlabel={JobFilter[3].filterTitle}
          option={JobFilter[3].filterOption}
          handleCheckbox={handleLocationCheckboxChange}
          name={JobFilter[3].filterTitle}
          list={loc}
        />
        <FilterCheckbox
          styleClass="role-form"
          Headerlabel={JobFilter[4].filterTitle}
          option={JobFilter[4].filterOption}
          handleCheckbox={handleRoleCheckboxChange}
          name={JobFilter[4].filterTitle}
          list={role}
        />
      </section>
      <section className="job-cn">
        <JobList />
      </section>
    </main>
  );
}
