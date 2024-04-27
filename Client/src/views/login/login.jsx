import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/action";
import { validateEmail, validatePassword } from "./validations";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const Login = ({ setAuth }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const [error, setErrors] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    };

    setFormErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const response = await dispatch(loginUser(formData));
      if (response?.data && response?.data?.token) {
        await Cookies.set("token", response.data.token, {
          expires: 1,
          secure: true,
        });
        setAuth(true);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: "success",
          title: "Login exitoso",
        });
        window.location.href = "/home";
      } else {
        if (
          response?.response &&
          response?.response?.data?.error
        ) {
          setErrors(`${response.response.data.error}`);
        }
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="input-label">
          E-mail:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {formErrors.email && (
            <span className="error">{formErrors.email}</span>
          )}
        </label>
        <label className="input-label">
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {formErrors.password && (
            <span className="error">{formErrors.password}</span>
          )}
        </label>
        {error && (
          <div className="error">
            <p>{error}</p>
          </div>
        )}
        <button type="submit" disabled={auth.loading}>
          {auth.loading ? "Loging in..." : "Log-in"}
        </button>
        {auth.error && <p className="error-message">Error: {auth.error}</p>}
        <p className="account-cuestion">
          ¿Don't have an account?{" "}
          <Link to="/register" className="register-link">
            <button>Register here</button>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
