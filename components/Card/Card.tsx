import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";

type CardProps = {
  id: string;
  title: string;
  status: boolean;
  points: number;
};

const Card = ({ id, title }: CardProps) => {
  return (
    <Link className={styles.link} href={`/task/${id}`}>
      <div className={styles.card}>{title}</div>
    </Link>
  );
};

export default Card;
