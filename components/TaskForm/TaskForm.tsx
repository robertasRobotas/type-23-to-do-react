import React, { useState } from "react";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import styles from "./styles.module.css";
import Button from "../Button/Button";
import axios from "axios";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [points, setPoints] = useState("");

  const router = useRouter();

  const insertTask = async () => {
    try {
      const headers = {
        authorization: cookie.get("jwt_token"),
      };

      const body = {
        title: title,
        points: points,
      };

      const response = await axios.post(`http://localhost:3002/tasks`, body, {
        headers,
      });

      console.log(response);

      if (response.status === 201) {
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className={styles.title}>Add task</h1>
      <div className={styles.form}>
        <input
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
        />
        <input
          placeholder="points"
          value={points}
          onChange={(e) => setPoints(e.target.value)}
          type="text"
        />
        <Button title="Add" isLoading={false} onClick={insertTask} />
      </div>
    </div>
  );
};

export default TaskForm;
