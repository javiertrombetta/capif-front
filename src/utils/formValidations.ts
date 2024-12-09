import * as Yup from "yup";

export const validationSignUpForm = Yup.object({
  // name: Yup.string()
  //   .min(2, "El nombre debe tener al menos 2 caracteres.")
  //   .max(100, "No puedes escribir más de 100 caracteres en este campo.")
  //   .required("El nombre es requerido."),
  // lastname: Yup.string()
  //   .min(2, "El apellido debe tener al menos 2 caracteres.")
  //   .max(100, "No puedes escribir más de 100 caracteres en este campo.")
  //   .required("El apellido es requerido."),
  email: Yup.string().email("Email inválido").required("El email es requerido"),
  // phone: Yup.string()
  //   .max(50, "El teléfono no puede exceder los 50 caracteres")
  //   .matches(/^[0-9\-+() ]+$/, "El teléfono contiene caracteres inválidos")
  //   .required("El teléfono es requerido.")
  //   .nullable(),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres.")
    .required("La contraseña es requerida."),
  repeat_password: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Las contraseñas deben coincidir")
    .required("Debes confirmar tu contraseña"),
  accept_terms: Yup.boolean()
    .oneOf([true], "Debes aceptar los términos y condiciones")
    .required(),
});

export const validationProducerRegister = Yup.object({
  email: Yup.string().email("Email inválido").required("El email es requerido"),
  nombre: Yup.string()
    .min(2, "El nombre debe tener al menos 2 caracteres.")
    .max(100, "No puedes escribir más de 100 caracteres en este campo.")
    .required("El nombre es requerido."),
  apellido: Yup.string()
    .min(2, "El apellido debe tener al menos 2 caracteres.")
    .max(100, "No puedes escribir más de 100 caracteres en este campo.")
    .required("El apellido es requerido."),
  cuit: Yup.string()
    .matches(/^[0-9]{11}$/, "El CUIT debe tener exactamente 11 dígitos")
    .required("El CUIT es obligatorio"),
  domicilio: Yup.string()
    .max(200, "El domicilio no puede exceder los 200 caracteres")
    .nullable(),
  ciudad: Yup.string()
    .min(2, "La ciudad debe tener al menos 2 caracteres")
    .max(100, "La ciudad no puede exceder los 100 caracteres")
    .required("La ciudad es obligatoria"),
  provincia: Yup.string()
    .min(2, "La provincia debe tener al menos 2 caracteres")
    .max(100, "La provincia no puede exceder los 100 caracteres")
    .required("La provincia es obligatoria"),
  pais: Yup.string()
    .min(2, "El país debe tener al menos 2 caracteres")
    .max(100, "El país no puede exceder los 100 caracteres")
    .required("El país es obligatorio"),
  codigo_postal: Yup.string()
    .min(4, "El código postal debe tener al menos 4 caracteres")
    .max(10, "El código postal no puede exceder los 10 caracteres")
    .matches(
      /^[0-9A-Za-z\s-]+$/,
      "El código postal contiene caracteres inválidos"
    )
    .required("El código postal es obligatorio"),
  telefono: Yup.string()
    .max(50, "El teléfono no puede exceder los 50 caracteres")
    .matches(/^[0-9\-+() ]+$/, "El teléfono contiene caracteres inválidos")
    .nullable(),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos  8 caracteres.")
    .required("La contraseña es requerida."),
  repeat_password: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Las contraseñas deben coincidir")
    .required("Debes confirmar tu contraseña"),
  accept_terms: Yup.boolean()
    .oneOf([true], "Debes aceptar los términos y condiciones")
    .required(),
});

export const validationLoginForm = Yup.object({
  email: Yup.string()
    .email("Ingresa un email valido.")
    .required("El Email es requerido."),
  password: Yup.string().required("La contraseña es requerida."),
});
