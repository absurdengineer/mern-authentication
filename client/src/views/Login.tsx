import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { NoPropComponent } from "../types/component.types";

const Login: NoPropComponent = () => {
  return (
    <div className="flex items-center min-h-screen bg-gray-100 text-gray-900 justify-center">
      <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')`,
            }}
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <img
              src="https://miro.medium.com/max/1200/1*A1bEPfQeGGKp98z1cdctVA.png"
              className="h-12 mx-auto"
              alt="Login Side"
            />
          </div>
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Hop In</h1>
            <LoginForm />
          </div>
          <p className="mt-2 text-center text-gray-600">
            Didn't have an account?{" "}
            <Link className="text-indigo-500 font-bold" to="/auth/register">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
