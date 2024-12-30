import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import Tasks from "@/components/Tasks/Tasks";
import { Task } from "@/types/task";
import { useRouter } from "next/router";
import PageTemplate from "@/components/PageTamplate/PageTemplate";
import { getAllTasks } from "@/api/task";

const MainPage = () => {
  const router = useRouter();

  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    try {
      const response = await getAllTasks();

      setTasks(response.data.tasks);

      console.log(response);
    } catch (err: unknown) {
      const error = err as AxiosError;

      if (error.status === 401) {
        router.push("/login");
      }

      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <PageTemplate>
      <Tasks tasks={tasks} />
    </PageTemplate>
  );
};

export default MainPage;
