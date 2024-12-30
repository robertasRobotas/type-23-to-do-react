import React, { ReactNode } from "react";
import styles from "./styles.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

type PageTemplateType = {
  children: ReactNode;
};

const PageTemplate = ({ children }: PageTemplateType) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.content}>{children}</div>
      <Footer />
    </div>
  );
};

export default PageTemplate;
