import React from "react";
import axios from "axios";
import { useState } from "react";
import './sign_up.css';

export function SignUpForm() {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function createUser(event) {
      event.preventDefault();
      axios.post('http://localhost:3001/api/v1/user/newuser/', {
        email: email,
        userName: username,
        hashedPassword: password
      },
      {
        headers: {
          "Content-type": "application/json"
        }
      }
      ).then(() => {
        const Domain = window.location.origin;
        const URL = Domain + '/login';
        window.location.replace(URL);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data)
        }
      })
    }

    return (
        <div
            className="
            min-h-screen
            flex flex-col
            items-center
            justify-center
            bg-gray-100"
        >
        <div
            className="
            flex flex-col
            bg-white
            shadow-md
            px-4
            sm:px-6
            md:px-8
            lg:px-10
            py-8
            rounded-3xl
            w-50
            max-w-md"
        >
        <div
            className="
            font-medium
            self-center
            text-xl
            sm:text-3xl
            text-gray-800">
            Join us
        </div>
        <div
            className="
            mt-4
            self-center
            text-xl
            sm:text-sm
            text-gray-800">
            Fill this form to create an account
        </div>

        <div className="mt-10">
            <form action="#">
            <div className="flex flex-col mb-5">
                <label
                    for="email"
                    className="mb-1 text-xs tracking-wide text-gray-600"
                >
                E-Mail Address:
                </label>
              <div className="relative">
                <div
                    className="
                        inline-flex
                        items-center
                        justify-center
                        absolute
                        left-0
                        top-0
                        h-full
                        w-10
                        text-gray-400"
                >
                <i className="fas fa-at text-blue-500"></i>
                </div>

                <input
                    id="email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400"
                    placeholder="Enter your email"
                />
              </div>
            </div>
            <div className="flex flex-col mb-5">
                <label
                    for="firstName"
                    className="mb-1 text-xs tracking-wide text-gray-600"
                >
                Username:
                </label>
              <div className="relative">
                <div
                    className="
                        inline-flex
                        items-center
                        justify-center
                        absolute
                        left-0
                        top-0
                        h-full
                        w-10
                        text-gray-400"
                >
                <i className="fas fa-user text-blue-500"></i>
                </div>

                <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400"
                    placeholder="Enter your first name"
                />
              </div>
            </div>
            <div className="flex flex-col mb-6">
              <label
                    for="password"
                    className="
                    mb-1
                    text-xs
                    sm:text-sm
                    tracking-wide
                    text-gray-600"
                >
                Password:
            </label>
              <div className="relative">
                <div
                  className="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400"
                >
                <span>
                    <i className="fas fa-lock text-blue-500"></i>
                    </span>
                </div>

                <input
                    id="password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400"
                    placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex w-full">
              <button
                type="submit"
                onClick={createUser}
                className="
                    flex
                    mt-2
                    items-center
                    justify-center
                    focus:outline-none
                    text-white text-sm
                    sm:text-base
                    bg-blue-500
                    hover:bg-blue-600
                    rounded-2xl
                    py-2
                    w-full
                    transition
                    duration-150
                    ease-in"
                >
                <span className="mr-2 uppercase">Sign In</span>
                <span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex justify-center items-center mt-6">
        <a
          href="#"
          target="_blank"
          className="
            inline-flex
            items-center
            text-gray-700
            font-medium
            text-xs text-center
          "
        >
          <span className="ml-2"
            >Already have an account?
            <a
              href="/login"
              className="text-xs ml-2 text-blue-500 font-semibold"
              >Login now</a
            >
            </span>
        </a>
      </div>
    </div>
    );
}

export default SignUpForm