import { useState } from "react"

import {
  GoogleIcon,
  HiddenPasswordIcon,
  OpenPasswordIcon,
  XIcon,
} from "../../assets"
import { Divider } from "../../components"

import "./login.css"

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <div className="login-back-ground flex items-center justify-center">
      <div className="login-wrapper flex rounded w-[1200px]">
        <div className="login-column-left w-[620px]"></div>
        <div className="login-column-left-content p-28 flex-1">
          <div className="content">
            <h3 className="text-lg mb-4 font-medium">Log in</h3>
            <form>
              <div className="flex flex-col mb-4">
                <label className="mb-2 text-neutral-400">Username</label>
                <input
                  className="block w-full py-3 ps-3 text-sm border rounded focus:outline-none"
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="mb-2 text-neutral-400">Password</label>
                <div className="flex border rounded">
                  <input
                    className="block w-full py-3 ps-3 text-sm focus:outline-none"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your username"
                    required
                  />
                  <button onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <HiddenPasswordIcon />
                    ) : (
                      <OpenPasswordIcon />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  className="w-full focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
                >
                  Log in
                </button>
              </div>
              <div className="text-center pt-2">
                <span className="text-neutral-300">Not a memeber yet? </span>
                <span className="text-purple-600">Sign up now</span>
              </div>
              <div className="flex items-center text-neutral-300 my-6">
                <Divider />
                <span className="font-light w-[280px] px-2">Social Log in</span>
                <Divider />
              </div>
              <button className="w-full mb-4 bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center">
                <XIcon />
                <span>Log in with X</span>
              </button>
              <button className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center">
                <GoogleIcon />
                <span>Log in with Google</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
