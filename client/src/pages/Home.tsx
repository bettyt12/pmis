import { Link } from "react-router-dom";
import { SIGN_IN_ROUTE } from "../constants";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">Patient Managment System</h1>
        <p className="text-xl">Please sign in or sign up to continue</p>
        <div className="flex gap-4 w-full max-w-sm  mx-auto ">
          <Link
            to={SIGN_IN_ROUTE}
            className="block text-center  w-full my-8  font-semibold  bg-blue-600 text-white  rounded-md py-2 "
          >
            Sign in
          </Link>
          <Link
            to="/signUp"
            className="block text-center  w-full my-8  font-semibold  bg-blue-400 text-white  rounded-md py-2 "
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
