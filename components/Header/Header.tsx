import React, { useState } from "react";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import styles from "./styles.module.css";
import burgerBtn from "../../assets/img/burger-btn.svg";
import Link from "next/link";
import logoutImg from "../../assets/img/logout.svg";

const Header = () => {
  const [isBurgerButtonClicked, setBurgerButtonClicked] = useState(false);

  const router = useRouter();

  const logoutUser = () => {
    cookie.remove("jwt_token");
    router.push("/login");
  };

  const navbar = (
    <ul>
      <li>
        <Link href="/">Main</Link>
      </li>
      <li>
        <Link href="/insert">Insert</Link>
      </li>
      <li>
        <button
          onClick={() => {
            logoutUser();
          }}
          className={styles.logoutBtn}
        >
          <img src={logoutImg.src} />
        </button>
      </li>
    </ul>
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Link href="/">to do app </Link>
      </div>

      <nav className={styles.desktopNav}>{navbar} </nav>

      <button onClick={() => setBurgerButtonClicked(!isBurgerButtonClicked)}>
        <img src={burgerBtn.src} alt="burger btn" />
      </button>

      <div
        className={`${styles.overlay}  ${
          isBurgerButtonClicked && styles.overlayOpen
        }`}
      >
        <nav className={styles.mobileNav}>{navbar} </nav>
      </div>
    </div>
  );
};

export default Header;
