import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/action";
import * as validation from "./validations";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import "./register.css";

const Register = ({ setAuth }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    nickname: "",
    email: "",
    password: "",
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
          error.response.data ===
          "Nickname already registered"
        ) {
          Swal.fire({
            icon: "warning",
            title: "Nickname in use",
            text: "The nickname" + `${formData.nickname}` + "is already in use. Please choose another one.",
            confirmButtonColor: "#6495ed",
          });
        } else if (
          error.response &&
          error.response.data ===
            "Username already registered"
        ) {
          Swal.fire({
            icon: "warning",
            title: "Username already registered",
            text: "The username" + `${formData.name}` + "is already in use. Please choose another one.",
            confirmButtonColor: "#6495ed",
          });
        }
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="input-label">
          Full name:
          <input
            className="register-input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {formErrors.name && <span className="error">{formErrors.name}</span>}
        </label>
        <label className="input-label">
          Nickname:
          <input
            className="register-input"
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            required
          />
          {formErrors.nickname && (
            <span className="error">{formErrors.nickname}</span>
          )}
        </label>
        <label className="input-label">
          E-mail:
          <input
            className="register-input"
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
            className="register-input"
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
        <label className="input-label">
          Confirm password:
          <input
            className="register-input"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          {confirmPasswordError && (
            <span className="error">{confirmPasswordError}</span>
          )}
        </label>

        <button
          className={`register-button ${!formValid ? "disabled-button" : ""}`}
          type="submit"
          disabled={!formValid}
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
