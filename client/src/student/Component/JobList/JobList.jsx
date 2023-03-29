import React, { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import JobCard from "../JobCard/JobCard";

export default function JobList() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [jobProfiles, setJobProfiles] = useState();
  const [url, setUrl] = useState("http://localhost:9002/api/job/?");
  const searchLocation = searchParams.get("location");
  //  ----

  const fetchData = async (fetchUrl) => {
    setLoading(true);
    try {
      const response = await fetch(fetchUrl);
      const data = await response.json();

      if (data) {
        setJobProfiles(data.jobData);
        setLoading(false);
      } else {
        setIsError(true);
      }
    } catch (e) {
      setIsError(true);
      setLoading(false);
    }
  };

  const incLocationClickCount = async () => {
    try {
      const response = await fetch(
        `http://localhost:9002/admin/location/${searchLocation}`,
        {
          method: "POST",
        }
      );
      const apiMsg = await response.json();
      console.log(apiMsg);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (searchLocation && searchLocation !== "") {
      incLocationClickCount();
    }
  }, []);

  useEffect(() => {
    const newUrl = `${url}${searchParams}`;
    fetchData(newUrl);
  }, [searchParams]);

  return (
    <main>
      <section className="job-cn">
        <div className="job-list-cn">
          <h2>Job</h2>
          {loading ? <h2>Loading...</h2> : null}
          {isError ? <h2>Something went wrong</h2> : null}
          {jobProfiles &&
            jobProfiles.map((item, index) => {
              const {
                _id,
                company,
                location,
                job_title,
                work_exp,
                salaryRange,
                postedDate,
                skills,
              } = item;
              let days = postedDate.slice(0, 10);
              return (
                <JobCard
                  key={index}
                  id={_id}
                  company={company}
                  location={location}
                  title={job_title}
                  minExp={work_exp.minExp}
                  maxExp={work_exp.maxExp}
                  salarymin={salaryRange.minSal}
                  salarymax={salaryRange.maxSal}
                  date={days}
                  skills={skills}
                />
              );
            })}
        </div>
      </section>
    </main>
  );
}
