import "./styles.css";
import { BsBriefcase } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { CiMoneyBill } from "react-icons/ci";

const colors = ["orange", "green", "blue"];
const backgrounds = ["lightyellow", "lightgreen", "lightblue"];

const index = ({ logo, title, company, location, salary, tags }) => {
  return (
    <div className="featuredJobCard">
      <img
        src={
          logo ||
          "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?w=740&t=st=1679001197~exp=1679001797~hmac=46df8b9c23c7eba72aa45fd9fab79180a4090d9bca4b48fcf7d7f0134440ce92"
        }
        alt="CompanyLogo"
      />
      <div>
        <h1 className="jobTitle">{title}</h1>
        <div className="details">
          <BsBriefcase /> {company}, <GoLocation /> {location}, <CiMoneyBill />{" "}
          {salary}
        </div>
        <div className="tags">
          {tags.map((tag, ind) => {
            return (
              <p
                style={{
                  color: colors[ind % colors.length],
                  backgroundColor: backgrounds[ind % colors.length],
                }}
              >
                {tag}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default index;
