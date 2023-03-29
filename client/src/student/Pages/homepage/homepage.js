import React from "react";
import CompanyMarquee from "../../Component/CompanyMarquee/CompanyMarquee";
import InterviewSkill from "../../Component/InterviewSkill/InterviewSkill";
import Search from "../../Component/Search/Search";
import TopCourses from "../../Component/TopCourses/TopCourses";
import TrendingProfile from "../../Component/TrendingProfile/TrendingProfile";
import TestHome from "../testHomepage/TestHome";

const HomePage = () => {
  return (
    <>
      <section>
        <Search />
      </section>
      <h2>Create Resume</h2>
      <section>
        <CompanyMarquee />
      </section>
      <section>
        <InterviewSkill />
      </section>
      <section>
        <TrendingProfile />
      </section>
      <TopCourses />
    </>
  );
};

export default HomePage;
