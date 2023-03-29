import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

const Modal = ({ close }) => {
  const [page, setpage] = useState(0);

  const [info, setinfo] = useState({
    answer1: "",
    answer2: "",
    answer3: "",
  });

  const Pages = ["Question1", "Question2", "Question3"];

  const displayBody = () => {
    switch (page) {
      case 0:
        return (
          <>
            <label>Whats Your name?</label>
            <input
              value={info.answer1}
              onChange={(e) => {
                e.preventDefault();
                setinfo({
                  ...info,
                  answer1: e.target.value,
                });
              }}
              type="text"
            />
          </>
        );
      case 1:
        return (
          <>
            <label>Whats Your age?</label>
            <input
              value={info.answer2}
              onChange={(e) => {
                e.preventDefault();
                setinfo({
                  ...info,
                  answer2: e.target.value,
                });
              }}
              type="text"
            />
          </>
        );
      case 2:
        return (
          <>
            <label>Whats Your nationality?</label>
            <input
              value={info.answer3}
              onChange={(e) => {
                e.preventDefault();
                setinfo({
                  ...info,
                  answer3: e.target.value,
                });
              }}
              type="text"
            />
          </>
        );

      default:
        break;
    }
  };

  return (
    <div>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        onClick={(e) => {
          close();
        }}
        className="modal-backdrop"
      >
        <motion.div
          initial={{
            scaleY: 0,
          }}
          animate={{
            scaleY: 1,
          }}
          exit={{
            scaleY: 0,
          }}
          className="modal-content-wrapper"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="modal-content"
          >
            <div className="body">
              <div className="modal-questions">{displayBody()}</div>
              <button
                disabled={page == 0}
                onClick={() => {
                  setpage((currPage) => currPage - 1);
                }}
              >
                Prev
              </button>
              <button
                disabled={page == Pages.length - 1}
                onClick={() => {
                  setpage((currPage) => currPage + 1);
                }}
              >
                Next
              </button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Modal;
