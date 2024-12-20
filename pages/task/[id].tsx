import { useEffect, useState } from "react";
import axios from "axios";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import styles from "./styles.module.css";
import Header from "@/components/Header/Header";
import { Task } from "@/types/task";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";

const TaskPage = () => {
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const [isShowDeleteModal, setShowDeleteModal] = useState(false);

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

  const deleteTask = async (id: string) => {
    try {
      const response = await axios.delete(`http://localhost:3002/tasks/${id}`, {
        headers,
      });

      if (response.status === 200) {
        router.push("/");
      }
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

            <Button
              isLoading={isLoading}
              title={"Delete task"}
              className={styles.dangerBtn}
              onClick={() => {
                setShowDeleteModal(true);
              }}
            />
          </>
        )}
      </section>

      <Modal
        title=" Do you really want to delete task"
        isOpen={isShowDeleteModal}
        onCloseModal={() => setShowDeleteModal(false)}
        onConfirm={() => deleteTask(router.query.id as string)}
      />
    </div>
  );
};

export default TaskPage;
