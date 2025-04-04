import React from "react";
import { STEPS } from "../../shared/constants";

import styles from "./StepsScreen.module.scss";

const StepsScreen = ({ currentPage }) => {
  return (
    <div className={styles.stepsContainer}>
      {STEPS.map((step, index) => (
        <div
          key={step}
          className={`${styles.step} ${
            index === currentPage ? styles.active : ""
          }`}
        >
          {step}
        </div>
      ))}
    </div>
  );
};

export default StepsScreen;
