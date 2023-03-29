import { FaCoins } from "react-icons/fa";
import "./styles.css";

const TestJobCard = ({ title, positions }) => {
  return (
    <div className="jobCard">
      <div className="icons">
        <FaCoins />
      </div>
      <div className="jobDetails">
        <h1>{title}</h1>
        <p>({positions} open positions)</p>
      </div>
    </div>
  );
};

export default TestJobCard;
