// validations.js

const validateEmail = (email) => {
  if (!email) {
    return 'Email is required';
  }

  // Puedes agregar una validación más completa para el formato del correo electrónico si es necesario
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Invalid email format';
  }

  return ''; // La validación pasó
};

const validatePassword = (password) => {
  if (!password) {
    return 'Password is required';
  } else if (password.length < 6) {
    return "The password should contain 6 digits"
  }

  // Puedes agregar más reglas de validación para la fortaleza de la contraseña si es necesario

  return ''; // La validación pasó
};

export { validateEmail, validatePassword };
