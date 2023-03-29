import TestJobCard from "../../Component/TestJobCard/index";

const Section_Featured_Jobs = () => {
  return (
    <div className="featuredJobsContainer">
      <h1>Featured Jobs</h1>
      <p>Know your worth and find the job that qualify your life</p>
      <div data-aos="fade-up" className="featured">
        <TestJobCard
          title="Title"
          company="Company"
          location="Location"
          salary="70K"
          tags={["Full Time", "Private", "Urgent"]}
        />
        <TestJobCard
          title="Title"
          company="Company"
          location="Location"
          salary="70K"
          tags={["Full Time", "Private", "Urgent"]}
        />
        <TestJobCard
          title="Title"
          company="Company"
          location="Location"
          salary="70K"
          tags={["Full Time", "Private", "Urgent"]}
        />
        <TestJobCard
          title="Title"
          company="Company"
          location="Location"
          salary="70K"
          tags={["Full Time", "Private", "Urgent"]}
        />
        <TestJobCard
          title="Title"
          company="Company"
          location="Location"
          salary="70K"
          tags={["Full Time", "Private", "Urgent"]}
        />
        <TestJobCard
          title="Title"
          company="Company"
          location="Location"
          salary="70K"
          tags={["Full Time", "Private", "Urgent"]}
        />
      </div>
    </div>
  );
};

export default Section_Featured_Jobs;
