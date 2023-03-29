import React from "react";
import Register from "../Pages/Register";
import { motion } from "framer-motion";

const RegisterModal = ({
  openLogin,
  closeLogin,
  openRegister,
  closeRegister,
}) => {
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
          closeRegister();
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
            <div className="registerModal">
              <Register
                openLogin={openLogin}
                closeLogin={closeLogin}
                openRegister={openRegister}
                closeRegister={closeRegister}
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RegisterModal;
