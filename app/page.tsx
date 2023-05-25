"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
interface loginData {
  email: string;
  password: string;
}
export default function Login() {
  const router = useRouter();
  const [data, setData] = useState<loginData>({
    email: "",
    password: "",
  });
  const [error, seterror] = useState([]);
  const handelchangelogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
  };

  console.log(data);
  const handelogin = async () => {
    try {
      const response = await axios.post(
        "https://todo-api-xu4f.onrender.com/user/login",
        data
      );
      console.log(response, "response");

      localStorage.setItem("token", response.data.access_token);
      if (localStorage.getItem("token")) {
        router.push('/task')
      }
    } catch (error: any) {
      console.log(error);
      console.log(error.response.data.message, "message");
      seterror(error.response.data.message);
    }
    setData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
          Sign in
        </h1>
        <form className="mt-6" onSubmit={(e) => e.preventDefault()}>
          <div className="mb-2">
            <h3 className="text-red-600">{error}</h3>
            <label className="block text-sm font-semibold text-gray-800">
              Email
            </label>
            <input
              onChange={(e) => handelchangelogin(e)}
              type="email"
              name="email"
              value={data.email}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={data.password}
              onChange={(e) => handelchangelogin(e)}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <a href="#" className="text-xs text-purple-600 hover:underline">
            Forget Password?
          </a>
          <div className="mt-6">
            <button
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              onClick={handelogin}
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-purple-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
