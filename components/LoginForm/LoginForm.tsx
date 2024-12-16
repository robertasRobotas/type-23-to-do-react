import React, { useState } from "react";
import cookie from "js-cookie";
import axios from "axios";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const onLogin = async () => {
    try {
      const userData = {
        email: email,
        password: password,
      };

      const response = await axios.post(
        "http://localhost:3002/login",
        userData
      );

      if (response.status === 200) {
        cookie.set("jwt_token", response.data.token);
        router.push("/");
      }

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.wrapper}>
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={onLogin}>Login</button>
    </div>
  );
};

export default LoginForm;
