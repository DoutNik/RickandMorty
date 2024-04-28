import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/action";
import { validateEmail, validatePassword } from "./validations";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import passShow from "../../assets/icons/login/passShow.png";

import style from "./login.module.css";

const Login = ({ setAuth }) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
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
        const error = response?.response?.data?.error
        if (error && error === "The email entered does not exist in our database") {
          setErrors("The email entered does not exist in our database.<br>Please try another one or register a new one.");

        } else if(error && error === "Wrong password"){
          setErrors("That's the wrong password")
        }
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const errorLines = error.split('<br>').map((line, index) => (
    <div key={index}>{line}</div>
  ));

  return (
    <>
      <div className={style.login}>
        <motion.div
          className={style.container}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div>
            <h2>Iniciar sesión</h2>
          </div>

          <div className={style.form}>
            <form>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email..."
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {formErrors.email && (
                <span className="error">{formErrors.email}</span>
              )}

              <div className={style.password}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password..."
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button type="button" onClick={togglePasswordVisibility}>
                  <img src={passShow} alt="passShow" />
                </button>
              </div>

              {formErrors.password && (
                <span className="error">{formErrors.password}</span>
              )}

              {error && <div className={style.error}>{errorLines}</div>}

              <button onClick={handleSubmit} className={style.iniciar}>
                Log-in
              </button>
            </form>
          </div>

          <div className={style.buttons}>
            ¿Don't have an account?{" "}
            <Link to="/register" className={style.register}>
              <button>Register here</button>
            </Link>
          </div>
          <div className={style.buttons}>
            <span className={style.recover}>
              ¿Olvidaste la contraseña?
              <Link to="/forgotpassword" className={style.register}>
                Recuperar
              </Link>
            </span>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Login;
