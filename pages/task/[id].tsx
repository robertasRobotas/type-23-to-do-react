import { useEffect, useState } from "react";
import axios from "axios";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import styles from "./styles.module.css";
import Header from "@/components/Header/Header";
import { Task } from "@/types/task";
import Button from "@/components/Button/Button";

const TaskPage = () => {
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const headers = {
    authorization: cookie.get("jwt_token"),
  };

  const switchTaskStatus = async (id: string) => {
    const body = {
      status: !task?.status,
    };

    setLoading(true);
    const response = await axios.put(
      `http://localhost:3002/tasks/${id}`,
      body,
      {
        headers,
      }
    );

    setLoading(false);
    setTask(response.data.task);
  };

  const fetchTask = async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:3002/tasks/${id}`, {
        headers,
      });

      setTask(response.data.task);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (router.query.id) {
      fetchTask(router.query.id as string);
    }
  }, [router.query.id]);

  return (
    <div>
      <Header />

      <section className={styles.content}>
        {task && (
          <>
            <h1>{task.title}</h1>
            <h2>{task.points}</h2>
            <h2>{task.status ? <>Completed</> : <>Not completed</>}</h2>
            <Button
              isLoading={isLoading}
              title={task.status ? "mark as incompleted" : "mark as completed"}
              onClick={() => {
                switchTaskStatus(router.query.id as string);
              }}
            />
          </>
        )}
      </section>
    </div>
  );
};

export default TaskPage;
