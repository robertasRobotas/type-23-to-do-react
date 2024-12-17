import React from "react";
import styles from "./styles.module.css";

type ButtonType = {
  title: string;
  isLoading: boolean;
  onClick: () => void;
};

const Button = ({ title, isLoading, onClick }: ButtonType) => {
  return (
    <button className={styles.wrapper} onClick={onClick}>
      {isLoading ? <div className={styles.loader}></div> : <span>{title}</span>}
    </button>
  );
};

export default Button;
