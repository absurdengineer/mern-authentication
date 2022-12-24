import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LOADING, LOGIN } from "../constants/action.constants";
import { useGlobalState } from "../hooks/useGlobalState";
import { login } from "../services/auth.service";
import { HandleFormSubmit, HandleInputChange } from "../types/function.types";
import { LoginFormData } from "../types/state.types";
import { validateAuth } from "../validations/auth.validations";

const initialFormData: LoginFormData = {
  username: "",
  password: "",
};

const LoginForm = () => {
  const [formData, setFormData] = useState<LoginFormData>(initialFormData);
  const [errors, setErrors] = useState<LoginFormData>(initialFormData);

  const [, dispatch] = useGlobalState();
  const navigate = useNavigate();

  const handleChange: HandleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit: HandleFormSubmit = async (event) => {
    try {
      toast.dismiss();
      dispatch({ type: LOADING, payload: true });
      event.preventDefault();
      setErrors(initialFormData);
      await validateAuth({ ...formData, register: 0 });
      const { data } = await login(formData);
      toast.success(data.message);
      dispatch({ type: LOGIN, payload: data.data.accessToken });
      return navigate("/app/dashboard");
    } catch (error) {
      if (error.name === "ValidationError") {
        let validationErrors: any = {};
        for (let errorDetail of error.details)
          validationErrors[errorDetail.context.key] = errorDetail.message;
        return setErrors(validationErrors);
      }
      if (error.response && [400].includes(error.response.status))
        return toast.error(error.response.data.message);
      console.log(error);
    } finally {
      dispatch({ type: LOADING, payload: false });
    }
  };

  return (
    <form className="w-full flex-1 mt-8" onSubmit={handleSubmit}>
      <div className="mx-auto max-w-xs">
        <input
          className={
            (errors.username ? "border-red-400 " : "border-gray-200 ") +
            "w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white my-2"
          }
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username*"
        />
        <small className="text-red-600 text-xs my-0 py-0">
          {errors.username}
        </small>
        <input
          className={
            (errors.password ? "border-red-400 " : "border-gray-200 ") +
            "w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white my-2"
          }
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password*"
        />
        <small className="text-red-600 text-xs my-0 py-0">
          {errors.password}
        </small>
        <button className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
          <svg
            className="w-6 h-6 -ml-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
            <polyline points="10 17 15 12 10 7"></polyline>
            <line x1="15" y1="12" x2="3" y2="12"></line>
          </svg>
          <span className="ml-3">Login</span>
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
