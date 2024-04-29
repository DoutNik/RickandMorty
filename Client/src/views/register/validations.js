// validations.js

export const validateName = (name) => {
  if (!name.trim()) {
    return 'El nombre es obligatorio';
  } else if (name.length < 4 || name.length >= 30) {
    return 'El nombre debe tener entre 4 y 30 caracteres';
  } else if (!/\s/.test(name)) {
    return 'El nombre debe contener al menos un espacio';
  } else if (/[0-9!@#$%^&*(),.?":{}|<>]/.test(name)) {
    return 'El nombre no puede contener números o caracteres especiales';
  } else if (
    name
      .split(/\s+/)
      .some((word) => word.length < 2)
  ) {
    return 'No creo que tengas un Nombre o un Apellido de menos de 2 letras';
  } else if (name.split(/\s+/).length < 2) {
    return 'Este campo requiere nombre y apellido';
  }
  return '';
};



export const validateNickname = (nickname) => {
  if (!nickname.trim()) {
    return 'El apodo es obligatorio';
  } else if (nickname.length < 4 || nickname.length > 12) {
    return 'El apodo debe tener entre 4 y 12 caracteres';
  }
  return '';
};

export const validateEmail = (email) => {
  if (!email.trim()) {
    return 'El correo electrónico es obligatorio';
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    return 'Ingresa un correo electrónico válido';
  }
  return '';
};

export const validatePassword = (password) => {
  if (!password.trim()) {
    return 'La contraseña es obligatoria';
  } else if (password.length < 6 || password.length > 20) {
    return 'La contraseña debe tener entre 6 y 20 caracteres';
  }
  return '';
};


export const validateConfirmPassword = (password, confirmPassword) => {
  const trimmedPassword = password ? password.trim() : '';
  const trimmedConfirmPassword = confirmPassword ? confirmPassword.trim() : '';

  if (!trimmedPassword && !trimmedConfirmPassword) {
    return '';  // No hay error si ambos campos están vacíos
  } else if (trimmedPassword !== trimmedConfirmPassword) {
    return 'Las contraseñas no coinciden';
  }
  return '';
};


