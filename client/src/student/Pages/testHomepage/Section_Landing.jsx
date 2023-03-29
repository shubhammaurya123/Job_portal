import React from "react";
import { BsFillBriefcaseFill, BsFillEnvelopeFill } from "react-icons/bs";
import { FaFileUpload, FaUsers } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { GoLocation } from "react-icons/go";

const Section_Landing = () => {
  return (
    <div className="landingSection">
      <div data-aos="fade-up" className="landingSection_Left">
        <div>
          <h1>There Are 93,178 Postings Here For you!</h1>
          <p>Find Jobs, Employment & Career Opportunities</p>
          <form>
            <span>
              <BiSearch />
            </span>
            <input type="text" placeholder="Job Title or keyword" />
            <span>
              <GoLocation />
            </span>
            <input type="text" placeholder="City or Postcode" />
            <button>Find Jobs</button>
          </form>
        </div>
      </div>
      <div data-aos="fade" className="landingSection_Right">
        <div id="card1" data-aos="fade" data-aos-delay="500">
          <span>
            <BsFillEnvelopeFill />
          </span>
          Work Inquiry from Ali Tufan
        </div>
        <div id="card2" data-aos="fade" data-aos-delay="1100">
          <span>
            <FaUsers />
          </span>
          10K+ Candidates
        </div>
        <div id="card3" data-aos="fade" data-aos-delay="800">
          <span>
            <BsFillBriefcaseFill />
          </span>
          Creative Agency
        </div>
        <div id="card4" data-aos="fade" data-aos-delay="1400">
          <span>
            <FaFileUpload />
          </span>
          Upload Your CV
        </div>
      </div>
    </div>
  );
};

export default Section_Landing;
