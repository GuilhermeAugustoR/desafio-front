import React from "react";
import styles from "./styles.module.css";

interface ILoading {
  color: string;
}

const Loading = ({ color }: ILoading) => {
  return (
    <div className={styles.spinnerContainer} style={{ color: color }}>
      <div className={styles.loadingSpinner}></div>
    </div>
  );
};

export default Loading;
