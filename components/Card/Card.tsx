import React from "react";
import styles from "./styles.module.css";

type CardProps = {
  title: string;
  status: boolean;
  points: number;
};

const Card = ({ title }: CardProps) => {
  return <div className={styles.wrapper}>{title}</div>;
};

export default Card;
