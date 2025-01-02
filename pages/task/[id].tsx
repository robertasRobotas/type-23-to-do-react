import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import cookie from "js-cookie";

import styles from "./styles.module.css";
import { Task } from "@/types/task";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import PageTemplate from "@/components/PageTamplate/PageTemplate";
import { deleteTaskById, getTaskById, updateTaskStatus } from "@/api/task";
import completedImg from "../../assets/img/completed.svg";
import notCompletedImg from "../../assets/img/not-completed.svg";

const TaskPage = () => {
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const [isShowDeleteModal, setShowDeleteModal] = useState(false);

  const router = useRouter();

  const switchTaskStatus = async (id: string) => {
    const token = cookie.get("jwt_token") as string;

    const body = {
      status: !task?.status,
    };

    setLoading(true);

    const response = await updateTaskStatus(id, body, token);

    setLoading(false);
    setTask(response.data.task);
  };

  const fetchTask = async (id: string) => {
    const token = cookie.get("jwt_token") as string;

    try {
      const response = await getTaskById(id, token);
      setTask(response.data.task);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (id: string) => {
    const token = cookie.get("jwt_token") as string;

    try {
      const response = await deleteTaskById(id, token);
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
    <PageTemplate>
      <section className={styles.content}>
        {task && (
          <>
            <h1>{task.title}</h1>
            <h2 className={styles.points}>{task.points}</h2>

            <div className={styles.statusWrapper}>
              {task.status ? (
                <img src={completedImg.src} alt="completed mark" />
              ) : (
                <img src={notCompletedImg.src} alt="completed mark" />
              )}
            </div>

            <div className={styles.buttonWrapper}>
              <Button
                isLoading={isLoading}
                title={
                  task.status ? "mark as incompleted" : "mark as completed"
                }
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
            </div>
          </>
        )}
      </section>

      <Modal
        title=" Do you really want to delete task"
        isOpen={isShowDeleteModal}
        onCloseModal={() => setShowDeleteModal(false)}
        onConfirm={() => deleteTask(router.query.id as string)}
      />
    </PageTemplate>
  );
};

export default TaskPage;
