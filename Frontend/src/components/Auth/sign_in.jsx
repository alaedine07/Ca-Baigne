import React from "react";
import { useState } from "react";
import axios from "axios";
import './sign_in.css';

export function SignInForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    function loginUser(event) {
      // console.log('sending request to backend');
      event.preventDefault();
      axios.post(process.env.API_BASE_URL + 'api/v1/auth/login', {
        email: email,
        hashedPassword: password
      },
      {
        headers: {
          "Content-type": "application/json"
        }
      }
      ).then(res => {
        if (res.data.token) {
          localStorage.setItem("accessToken", res.data.token);
          const Domain = window.location.origin;
          const URL = Domain + '/';
          window.location.replace(URL);
        }
      }).catch(function (error) {
        if (error.response) {
          setError(true);
        }
      })
    }

    return (
        <div className=" signin-container min-h-screen flex flex-col items-center justify-center bg-gray-100" >
          <div className=" flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-md">
          <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
              Welcome Back
          </div>
          <div
              className=" mt-4 self-center text-xl sm:text-s text-gray-800">
              Enter your credentials to access your account
          </div>

        <div className="mt-2">
            <form action="#">
            <div className="flex flex-col mb-4">
                <label
                    htmlFor="email"
                    className="sign-label text-s tracking-wide mb-2"
                >
                Email Address:
                </label>
              <div className="relative">
                <div
                    className=" inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400" >
                <i className="fas fa-at text-blue-500"></i>
                </div>

                <input
                    id="email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="signin-input text-sm placeholder-gray-500 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="Enter your email"
                />
              </div>
            </div>
            <div className="flex flex-col mb-6">
              <label
                    htmlFor="password"
                    className="sign-label text-s tracking-wide mb-2">
                Password:
            </label>
              <div className="relative">
                <div
                  className=" inline-flex items-center justify-center
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
                    signin-input
                    text-sm
                    placeholder-gray-500
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
                onClick={loginUser}
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
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
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
        {
          error ? <div className="flex justify-center"><span className="errorMsg">Email or password are incorrect</span></div> : null
        }
          </div>
          <div className="flex justify-center items-center mt-6">
        <div
          href="#"
          target="_blank"
          className="
            inline-flex
            items-center
            text-gray-700
            font-bold
            text-s text-center
          "
        >
          <span className="ml-2">
            You don't have an account?
            <a href="/join" className="text-s ml-2 text-blue-500 font-semibold">Register now</a></span>
        </div>
          </div>
        </div>
    );
}

export default SignInForm