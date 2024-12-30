import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./styles.module.css";
import { Task } from "@/types/task";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import PageTemplate from "@/components/PageTamplate/PageTemplate";
import { deleteTaskById, getTaskById, updateTaskStatus } from "@/api/task";

const TaskPage = () => {
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const [isShowDeleteModal, setShowDeleteModal] = useState(false);

  const router = useRouter();

  const switchTaskStatus = async (id: string) => {
    const body = {
      status: !task?.status,
    };

    setLoading(true);

    const response = await updateTaskStatus(id, body);

    setLoading(false);
    setTask(response.data.task);
  };

  const fetchTask = async (id: string) => {
    try {
      const response = await getTaskById(id);
      setTask(response.data.task);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const response = await deleteTaskById(id);
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
    </PageTemplate>
  );
};

export default TaskPage;
