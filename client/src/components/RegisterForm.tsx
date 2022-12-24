import { useState } from "react";
import { NoPropComponent } from "../types/component.types";
import { HandleFormSubmit, HandleInputChange } from "../types/function.types";
import { RegisterFormData } from "../types/state.types";
import { validateAuth } from "../validations/auth.validations";
import { toast } from "react-toastify";
import { register } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const initialFormData: RegisterFormData = {
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  password: "",
};

const RegisterForm: NoPropComponent = () => {
  const [formData, setFormData] = useState<RegisterFormData>(initialFormData);
  const [terms, setTerms] = useState<boolean>(false);
  const [errors, setErrors] = useState<RegisterFormData>(initialFormData);
  const [termsError, setTermsError] = useState<string>("");

  const navigate = useNavigate();

  const handleChange: HandleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit: HandleFormSubmit = async (event) => {
    try {
      toast.dismiss();
      event.preventDefault();
      if (!terms)
        return setTermsError(
          "You need to accept terms and conditions to proceed"
        );
      else setTermsError("");
      setErrors(initialFormData);
      await validateAuth({ ...formData, register: 1 });
      const { data } = await register(formData);
      toast.success(data.message);
      return navigate("/auth/login");
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
    }
  };

  return (
    <form className="w-full flex-1 mt-8" onSubmit={handleSubmit}>
      <div className="mx-auto max-w-xs">
        <input
          className={
            (errors.firstName ? "border-red-400 " : "border-gray-200 ") +
            "w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white my-2"
          }
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name*"
        />
        <small className="text-red-600 text-xs my-0 py-0">
          {errors.firstName}
        </small>
        <input
          className={
            (errors.lastName ? "border-red-400 " : "border-gray-200 ") +
            "w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white my-2"
          }
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <small className="text-red-600 text-xs my-0 py-0">
          {errors.lastName}
        </small>
        <input
          className={
            (errors.email ? "border-red-400 " : "border-gray-200 ") +
            "w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white my-2"
          }
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email*"
        />
        <small className="text-red-600 text-xs my-0 py-0">{errors.email}</small>
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
        <div className="flex items-center my-2">
          <input
            id="default-checkbox"
            type="checkbox"
            onChange={() => setTerms(!terms)}
            checked={terms}
            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="default-checkbox"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            I accept the terms and conditions
          </label>
        </div>
        <small className="text-red-600 text-xs my-0 py-0">{termsError}</small>
        <button className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
          <svg
            className="w-6 h-6 -ml-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <path d="M20 8v6M23 11h-6" />
          </svg>
          <span className="ml-3">Register</span>
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
