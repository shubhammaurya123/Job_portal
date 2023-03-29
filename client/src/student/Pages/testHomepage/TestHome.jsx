import Section_Featured_Jobs from "./Section_Featured_Jobs";
import Section_Job_Categories from "./Section_Job_Categories";
import Section_Landing from "./Section_Landing";
import Section_Testimonials from "./Section_Testimonials";
import Section_news from "./Section_news";
import Advert from "./Advert";
import TestNavbar from "../../Component/TestNavbar";
import "./TestHome.css";
import TopHiring from "../../../employer/Components/TopHiringSection";

import AOS from "aos";
import { useEffect } from "react";
import Footer from "./Footer";

const TestHome = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <div className="homePage">
      <Section_Landing />
      <TopHiring />
      <Section_Job_Categories />
      <Section_Featured_Jobs />
      {/* <Section_Testimonials /> */}
      <Advert />
      <Section_news />
      <Footer />
    </div>
  );
};

export default TestHome;
