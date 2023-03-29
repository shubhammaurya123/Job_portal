import { motion } from "framer-motion";
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { loginUser } from "../functions";
import Login from "../Pages/Login";

const LoginModal = ({ openLogin, closeLogin, openRegister, closeRegister }) => {
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
          closeLogin();
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
            <Login
              openLogin={openLogin}
              closeLogin={closeLogin}
              openRegister={openRegister}
              closeRegister={closeRegister}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginModal;
