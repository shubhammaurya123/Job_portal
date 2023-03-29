import demoProfile from "../Assets/demoProfile.webp";

const TuringProfileSection = () => {
  return (
    <section id="section5">
      <div data-aos="fade-left" className="section5_left scrollbarHidden">
        <img src={demoProfile} alt="" />
      </div>
      <div data-aos="fade-right" className="section5_right">
        <h1>Turing Deep Developer Profile</h1>
        <h4>
          Our in-depth resumes help you know your next developers better.
          Explore their <span className="success">strengths</span> and{" "}
          <span className="warning">weaknesses</span> with our Deep Developer
          Profiles and decide if they are a good fit for your team.
        </h4>
        <button className="employerBTN">Hire Now</button>
      </div>
    </section>
  );
};

export default TuringProfileSection;
