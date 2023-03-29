import Modal from "../Components/Modal";
import { AnimatePresence } from "framer-motion";
import hireImg from "../Assets/hire.jpg";

const LandingSection = ({ setmodalOpen, modalOpen, close }) => {
  return (
    <section id="section1">
      <AnimatePresence initial={false} mode="wait">
        {modalOpen && <Modal close={close} />}
      </AnimatePresence>
      <div data-aos="fade-right" className="section1_left">
        <h1>
          Hire your first <span>3</span> candidates completely <span>FREE</span>{" "}
          of cost within 50 minutes!
        </h1>
        <button className="employerBTN" onClick={() => setmodalOpen(true)}>
          Hire Now
        </button>
      </div>
      <div data-aos="fade-left" className="section1_right">
        <img src={hireImg} alt="" />
      </div>
    </section>
  );
};

export default LandingSection;
