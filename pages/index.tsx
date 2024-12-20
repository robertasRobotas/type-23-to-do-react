import Header from "@/components/Header/Header";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import cookie from "js-cookie";
import Tasks from "@/components/Tasks/Tasks";
import { Task } from "@/types/task";
import { useRouter } from "next/router";
import Footer from "@/components/Footer/Footer";

const MainPage = () => {
  const router = useRouter();

  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    try {
      const headers = {
        authorization: cookie.get("jwt_token"),
      };

      const response = await axios.get("http://localhost:3002/tasks", {
        headers,
      });

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
    <div>
      <Header />
      <Tasks tasks={tasks} />
      <Footer />
    </div>
  );
};

export default MainPage;
