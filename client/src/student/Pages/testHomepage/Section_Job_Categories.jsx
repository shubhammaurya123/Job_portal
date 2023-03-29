import TestJobCategory from "../../Component/TestJobCategory/TestJobCategory";
import "./JobCategories.css";
import { BiCoinStack } from "react-icons/bi";

const Section_Job_Categories = () => {
  return (
    <div>
      <h1>Popular Job Categories</h1>
      <p>2020 jobs live - 293 added today.</p>
      <div data-aos="fade-up" className="jobCardsContainer">
        <TestJobCategory
          title="Accounting/Finance"
          positions="2"
          icon={BiCoinStack}
        />
        <TestJobCategory title="Marketing" positions="86" icon={BiCoinStack} />
        <TestJobCategory title="Design" positions="43" icon={BiCoinStack} />
        <TestJobCategory
          title="Development"
          positions="12"
          icon={BiCoinStack}
        />
        <TestJobCategory
          title="Human Resource"
          positions="55"
          icon={BiCoinStack}
        />
        <TestJobCategory
          title="Automotive Jobs"
          positions="2"
          icon={BiCoinStack}
        />
        <TestJobCategory
          title="Customer Service"
          positions="2"
          icon={BiCoinStack}
        />
        <TestJobCategory
          title="Health and Care"
          positions="25"
          icon={BiCoinStack}
        />
        <TestJobCategory
          title="Project Management"
          positions="92"
          icon={BiCoinStack}
        />
      </div>
    </div>
  );
};

export default Section_Job_Categories;
