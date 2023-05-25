"use client";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

import { useRouter } from "next/navigation";

interface userda {
  title: string;
  description: string;
}
const Task = () => {
  const [task, setTask] = useState<userda>({
    title: "",
    description: "",
  });
  const [data, setData] = useState([]);
  const [responce, setResponce] = useState([]);
  console.log("data:::", data);
  const router = useRouter();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  console.log(token, "token.........");

  async function addtask() {
    setTask({
      title: "",
      description: "",
    });

    try {
      const response = await axios.post(
        "https://todo-api-xu4f.onrender.com/user/addTodo",
        task,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response, "responcetodo");
      setResponce(response.data.message);
    } catch (error) {
      console.log(error);
    }

    try {
      const responsealltodo = await axios.get(
        "https://todo-api-xu4f.onrender.com/user/all-todo",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(responsealltodo.data.AllTodo, "responcealltodo");
      setData(responsealltodo.data.AllTodo);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseAllTodo = await axios.get(
          "https://todo-api-xu4f.onrender.com/user/all-todo",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(responseAllTodo.data.AllTodo, "response all todo");
        setData(responseAllTodo.data.AllTodo);
      } catch (error) {
        console.log(error);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);
  const removeitem = (id: string) => {
    const newList = data.filter((item: { _id: string }) => item._id !== id);
    setData(newList);
    // console.log(i, "id");
    console.log(newList, "update");
  };
  const loghandler = () => {
    localStorage.removeItem("token");
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  };
  return (
    <>
      {/* <Navbar /> */}
      <div className="bg-sky-700  flex justify-between w-[100%] h-24">
        <div className="mt-5 ml-7">
          <h2 className="text-white text-3xl">Task</h2>
        </div>
        <div className="mt-5 mr-7 ">
          <button
            className="text-sky-700 bg-white text-2xl rounded-md p-1 "
            onClick={loghandler}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="w-[70%] flex justify-center flex-col ml-[15%] rounded-md shadow-lg p-10">
        <h3 className="text-red-500 ml-[40%]">{responce}</h3>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-lg font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={task.title}
            onChange={(e) => setTask((p) => ({ ...p, title: e.target.value }))}
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-lg font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            value={task.description}
            onChange={(e) =>
              setTask((p) => ({ ...p, description: e.target.value }))
            }
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
            rows={3}
          ></textarea>
        </div>
        <button
          className="bg-sky-700 rounded-md h-10 text-white"
          onClick={addtask}
        >
          AddData
        </button>
      </div>

      <div className="bg-white shadow-md rounded my-6">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Title
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Description
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
            </tr>
          </thead>
          <tbody>
            {data.map(
              (item: { title: string; description: string; _id: string }) => (
                <tr key={item._id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {item.title}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {item.description}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <button
                      className="px-2 py-1 text-red-500 hover:text-red-700"
                      onClick={() => removeitem(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Task;
