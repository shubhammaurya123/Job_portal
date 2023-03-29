import { AiOutlineClockCircle } from "react-icons/ai";
import { FaUserCircle, FaPhoneAlt } from "react-icons/fa";
import { IoPeopleOutline } from "react-icons/io5";
import { BsCalendarDateFill } from "react-icons/bs";
import siteUSP from "../Assets/siteUSP.jpg";

const FeaturesSection = () => {
  return (
    <section id="section2">
      <div data-aos="fade-right" className="section2_left">
        <img src={siteUSP} alt="" />
      </div>
      <div data-aos="fade-left" className="section2_right">
        <h2>Perfect eLearning Job Posting Services - Get Quality Applies</h2>
        <h4>
          Reach out to <span>millions</span> of jobseekers and hire quickly with
          our fast and easy job posting services.
        </h4>
        <div className="usp">
          <div>
            <span className="usp-icon">
              <AiOutlineClockCircle />
            </span>
            <span className="usp-text">2 Minutes to Post</span>
          </div>
          <div>
            <span className="usp-icon">
              <FaUserCircle />
            </span>
            <span className="usp-text">Unlimited Applies</span>
          </div>
          <div>
            <span className="usp-icon">
              <IoPeopleOutline />
            </span>
            <span className="usp-text">Attract Audience</span>
          </div>
          <div>
            <span className="usp-icon">
              <BsCalendarDateFill />
            </span>
            <span className="usp-text">30 Day Visibility</span>
          </div>
        </div>
        <button className="employerBTN">Hire Now</button>
      </div>
    </section>
  );
};

export default FeaturesSection;
