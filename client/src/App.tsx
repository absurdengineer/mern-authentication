import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Register from "./views/Register";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        <Route path="auth">
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="" element={<Navigate to="login" />} />
        </Route>
        <Route path="app">
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="" element={<Navigate to="dashboard" />} />
        </Route>
        <Route path="/" element={<Navigate to="app/dashboard" />} />
        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="404" />} />
      </Routes>
    </>
  );
};

export default App;
