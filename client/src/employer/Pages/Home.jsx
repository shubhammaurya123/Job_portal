import hireImg from "../Assets/hire.jpg";

import { HiUserGroup } from "react-icons/hi";
import { MdPersonSearch } from "react-icons/md";
import { GoVerified } from "react-icons/go";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import { useEffect, useState } from "react";
import Modal from "../Components/Modal";
import { AnimatePresence } from "framer-motion";
import TopHiring from "../Components/TopHiring";
import Testimonials from "../Components/Testimonials";
import LoginModal from "../Components/LoginModal";
import AOS from "aos";
import "aos/dist/aos.css";
import LandingSection from "../Components/LandingSection";
import FeaturesSection from "../Components/FeaturesSection";
import TalentSearchSection from "../Components/TalentSearchSection";
import TopHiringSection from "../Components/TopHiringSection";
import TuringProfileSection from "../Components/TuringProfileSection";
import HiringStepsSection from "../Components/HiringStepsSection";

// import hiringCompanies from '../../Companies.json'

const Home = () => {
  const [modalOpen, setmodalOpen] = useState(false);
  const [loginModalOpen, setloginModalOpen] = useState(false);

  const [showModal, setshowModal] = useState(false);

  const close = () => {
    setmodalOpen(false);
  };

  const closeLogin = () => {
    setloginModalOpen(false);
  };

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <div className="empHome">
      <LandingSection
        setmodalOpen={setmodalOpen}
        modalOpen={modalOpen}
        close={close}
      />

      <FeaturesSection />

      <TalentSearchSection />

      <TopHiringSection />

      <TuringProfileSection />

      <HiringStepsSection />

      <section data-aos="fade-up" id="section7">
        <Testimonials /> 
      </section>
    </div>
  );
};

export default Home;
