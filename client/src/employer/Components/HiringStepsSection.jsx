import React from "react";

const HiringStepsSection = () => {
  return (
    <section data-aos="fade-up" id="section6">
      <h1>How to hire top remote developers through Perfect eLearning?</h1>
      <ol>
        <li data-aos="fade-right" data-aos-delay="100">
          <span>1</span>
          <h3>Tell us the skills you need</h3>
          <p>We'll schedule a call and understand your requirements.</p>
        </li>
        <li data-aos="fade-right" data-aos-delay="400">
          <span>2</span>
          <h3>We find the best talent for you</h3>
          <p>Get a list of pre-vetted candidates within days</p>
        </li>
        <li data-aos="fade-right" data-aos-delay="700">
          <span>3</span>
          <h3>Schedule interviews</h3>
          <p>Meet and select the developers you like.</p>
        </li>
        <li data-aos="fade-right" data-aos-delay="1000">
          <span>4</span>
          <h3>Begin your trial</h3>
          <p>Start building with a no-risk 2-week trial period.</p>
        </li>
      </ol>
      <button className="employerBTN">Hire Now</button>
    </section>
  );
};

export default HiringStepsSection;
