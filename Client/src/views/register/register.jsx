import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/action";
import * as validation from "./validations";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import Logo from "../../assets/logos/rickandmortyLogo.png";
import passShow from "../../assets/icons/login/passShow.png"
import style from "./register.module.css";

const Register = ({ setAuth }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    email: "",
    password: "",
    confirmPassword: "",
    disabled: false,
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    nickname: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  useEffect(() => {
    setConfirmPasswordError(
      validation.validateConfirmPassword(
        formData.password,
        formData.confirmPassword
      )
    );
  }, [formData.password, formData.confirmPassword]);

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };

  const [formValid, setFormValid] = useState(false);
  const isFormValid = () => {
    return (
      Object.values(formData).every((value) => value !== "") &&
      Object.values(formErrors).every((value) => value === "") &&
      confirmPasswordError === ""
    );
  };
  useEffect(() => {
    setFormValid(isFormValid());
  }, [formData, formErrors, confirmPasswordError]);

  const handleConfirmPasswordChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      [name]: validation.validateConfirmPassword(formData.password, value)
    }));
    setConfirmPasswordError(
      validation.validateConfirmPassword(formData.password, value)
    );
    setFormValid(isFormValid());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      [name]:
        validation[`validate${name.charAt(0).toUpperCase() + name.slice(1)}`](
          value
        ),
    }));
    setFormValid(isFormValid());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      disabled: true,
    });
    if (
      !formData.name ||
      !formData.nickname ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      Swal.fire({
        icon: "info",
        title: "Please, complete all fields",
        html: "All fields are mandatory to complete the registration.",
        confirmButtonColor: "#6495ed",
      });
      setFormData({
        ...formData,
        disabled: false,
      });
      return;
    }
    if (isFormValid()) {
      try {
        const newRegisteredUser = await dispatch(registerUser(formData));
        if (newRegisteredUser) {
          await Cookies.set("token", newRegisteredUser.token, {
            expires: 1,
            secure: true,
          });
          setAuth(true);
          Swal.fire({
            icon: "success",
            title: "Registered successfully",
            text: "¡Te has registrado exitosamente!",
          }).then((result) => {
            if (result.value) {
              window.location.href = "/home";
            }
          });
        }
      } catch (error) {
        console.error("Error al enviar los datos al servidor:", error);
        if (
          error.response &&
          error.response.data === "Email already registered"
        ) {
          Swal.fire({
            title: "Email in use",
            text: "The email is already registered. Please enter another email or log in to your existing account.",
            icon: "error",
            showCancelButton: true,
            confirmButtonText: "Go to login page",
            cancelButtonText: "Ok",
          }).then((result) => {
            if (result.value) {
              window.location.href = "/";
            }
          });
        } else if (
          error.response &&
          error.response.data === "Nickname already registered"
        ) {
          Swal.fire({
            icon: "warning",
            title: "Nickname in use",
            text:
              "The nickname" +
              `${formData.nickname}` +
              "is already in use. Please choose another one.",
            confirmButtonColor: "#6495ed",
          });
        } else if (
          error.response &&
          error.response.data === "Username already registered"
        ) {
          Swal.fire({
            icon: "warning",
            title: "Username already registered",
            text:
              "The username" +
              `${formData.name}` +
              "is already in use. Please choose another one.",
            confirmButtonColor: "#6495ed",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error al registrar",
            text: "Hubo un error al registrar el usuario. Por favor, inténtalo de nuevo.",
            confirmButtonColor: "#6495ed",
          });
        }
        setFormData({
          ...formData,
          disabled: false,
        });
        return;
      }
    }
  };

  function isSubmitDisabled() {
    return Object.values(formErrors).some((error) => error !== "" || error !== "");
  }

  return (
    <>
      <div className={style.view}>
        <motion.div
          className={style.container}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className={style.title}>
            <h2>Register here</h2>
          </div>
          <img src={Logo} className={style.logo} />

          <div className={style.form}>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full name..."
                  value={formData.name}
                  onChange={handleChange}
                  disabled={formData.disabled}
                  required
                />
                {formErrors.name && (
                  <span className={style.error}>{formErrors.name}</span>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="nickname"
                  placeholder="Nickname..."
                  value={formData.nickname}
                  onChange={handleChange}
                  disabled={formData.disabled}
                  required
                />
                {formErrors.nickname && (
                  <span className={style.error}>{formErrors.nickname}</span>
                )}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email..."
                  value={formData.email}
                  onChange={handleChange}
                  disabled={formData.disabled}
                  required
                />
                {formErrors.email && (
                  <span className={style.error}>{formErrors.email}</span>
                )}
              </div>
              <div className={style.passShow}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password..."
                  value={formData.password}
                  onChange={handleChange}
                  disabled={formData.disabled}
                  required
                />
                <button type="button" onClick={handleShowPassword}>
                  <img src={passShow} alt="passShow" />
                </button>
                {formErrors.password && (
                  <span className={style.error}>{formErrors.password}</span>
                )}
              </div>
              <div className={style.passShow}>
                <input
                  type={showPassword1 ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm password..."
                  value={formData.confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  disabled={formData.disabled}
                  required
                />
                   <button type="button" onClick={handleShowPassword1}>
                  <img src={passShow} alt="passShow" />
                </button>
                {confirmPasswordError && (
                  <span className={style.error}>{confirmPasswordError}</span>
                )}
              </div>
              <button
                className={
                  isSubmitDisabled()
                    ? `${style.register} ${style.buttonDisabled}`
                    : style.register
                }
                disabled={isSubmitDisabled()}
                type="submit"
              >
                Register
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Register;
