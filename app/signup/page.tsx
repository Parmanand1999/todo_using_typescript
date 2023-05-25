"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirm_password: string;
}

export default function Registration() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [firstnameplace, setFirstnameplace] = useState(false);
  const [lastnameplace, setLastnameplace] = useState(false);
  const [emailplace, setEmailplace] = useState(false);
  const [passwordplace, setPasswordplace] = useState(false);
  const [conformpasswordplace, setConfirmpasswordplace] = useState(false);
  const [error, setError] = useState(false);
  const [respmsg, setRespmsg] = useState(null);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const register = async () => {
    let erro = 0;
    if (userData.firstName.length < 1) {
      setFirstnameplace(true);
      erro++;
    }
    if (userData.lastName.length < 1) {
      setLastnameplace(true);
      erro++;
    }
    if (userData.email.length < 1) {
      setEmailplace(true);
      erro++;
    }
    if (userData.password.length < 1) {
      setPasswordplace(true);
      erro++;
    }
    if (userData.password !== userData.confirm_password) {
      setConfirmpasswordplace(true);
      erro++;
    }

    if (erro === 0) {
      try {
        const response = await axios.post(
          "https://todo-api-xu4f.onrender.com/user/register",
          userData
        );
        console.log(response, "response");
        setRespmsg(response.data.message);
        router.push("/");
      } catch (error: any) {
        console.log(error.response.data);
        if (error.response.data.message === "This email already exists") {
          setError(true);
        } else {
          console.error(error);
          alert("Something went wrong");
        }
      }
    }
    setUserData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirm_password: "",
    });
  };

  return (
    <div>
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div>
          <a href="/">
            <h3 className="text-4xl font-bold text-purple-600">Signup</h3>
          </a>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
          {error ? (
            <h3 className="text-red-600 text-center">
              This email already exists
            </h3>
          ) : null}
          {respmsg}
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                First Name
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="text"
                  name="firstName"
                  required
                  value={userData.firstName}
                  onChange={(e) => handleInputChange(e)}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {firstnameplace ? (
                  <span style={{ color: "red", fontSize: "13px" }}>
                    First Name is required
                    <br />
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Last Name
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="text"
                  name="lastName"
                  required
                  onChange={(e) => handleInputChange(e)}
                  value={userData.lastName}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {lastnameplace ? (
                  <span style={{ color: "red", fontSize: "13px" }}>
                    Last Name is required
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Email
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="email"
                  name="email"
                  required
                  value={userData.email}
                  onChange={(e) => handleInputChange(e)}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {emailplace ? (
                  <span style={{ color: "red", fontSize: "13px" }}>
                    Email is required
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  name="password"
                  required
                  value={userData.password}
                  onChange={(e) => handleInputChange(e)}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {passwordplace ? (
                  <span style={{ color: "red", fontSize: "13px" }}>
                    Password is required
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password_confirmation"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Confirm Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  name="confirm_password"
                  required
                  value={userData.confirm_password}
                  onChange={(e) => handleInputChange(e)}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {conformpasswordplace ? (
                  <span style={{ color: "red", fontSize: "13px" }}>
                    confirm_password is Invalid
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="flex items-center justify-end mt-4">
              <Link
                className="text-sm text-gray-600 underline hover:text-gray-900"
                href="/"
              >
                Already registered?
              </Link>
              <button
                onClick={register}
                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
