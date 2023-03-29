import { HiUserGroup } from "react-icons/hi";
import { MdPersonSearch } from "react-icons/md";
import { GoVerified } from "react-icons/go";
import { FaPhoneAlt } from "react-icons/fa";
import talentSearch from "../Assets/talentSearch.jpg";

const TalentSearchSection = () => {
  return (
    <section id="section3">
      <div data-aos="fade-right" className="section3_left">
        <h2>
          Search Best Talent with Perfect eLearning's Resume Database Access
        </h2>
        <h4>
          Source candidates from one of <span>India's largest Talent Pool</span>{" "}
          and find the perfect talent for your organisation.
        </h4>
        <div className="usp">
          <p>
            <HiUserGroup /> Over 8.79 crore Jobseekers
          </p>
          <p>
            <MdPersonSearch /> Smart Talent Search
          </p>
          <p>
            <FaPhoneAlt /> Contact Directly
          </p>
          <p>
            <GoVerified /> Verified Candidates
          </p>
        </div>
        <button className="employerBTN">Hire Now</button>
      </div>
      <div data-aos="fade-left" className="section3_right">
        <img src={talentSearch} alt="" />
      </div>
    </section>
  );
};

export default TalentSearchSection;
