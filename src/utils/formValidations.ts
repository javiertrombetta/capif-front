import * as Yup from "yup";

const validacionNombre = Yup.string()
  .min(2, "El nombre debe tener al menos 2 caracteres.")
  .max(100, "No puedes escribir más de 100 caracteres en este campo.")
  .required("El nombre es requerido.");

const validacionApellido = Yup.string()
  .min(2, "El apellido debe tener al menos 2 caracteres.")
  .max(100, "No puedes escribir más de 100 caracteres en este campo.")
  .required("El apellido es requerido.");

const validacionTelefono = Yup.string()
  .max(50, "El teléfono no puede exceder los 50 caracteres")
  .matches(/^[0-9\-+() ]+$/, "El teléfono contiene caracteres inválidos")
  .nullable();

const validacionEmail = Yup.string()
  .email("Debe ser un correo electrónico válido")
  .required("El correo electrónico es requerido");

const validacionCuitCuil = Yup.string()
  .required("El CUIT/CUIL es requerido.")
  .matches(/^\d+$/, "El CUIT/CUIL debe contener solo números.")
  .matches(/^\d{11}$/, "El CUIT/CUIL debe contener exactamente 11 dígitos.");

export const validationSignUpForm = Yup.object({
  email: Yup.string().email("Email inválido").required("El email es requerido"),
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

export const validationRecoveryPassword = Yup.object({
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos  8 caracteres.")
    .required("La contraseña es requerida."),
  repeat_password: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Las contraseñas deben coincidir")
    .required("Debes confirmar tu contraseña"),
});

export const validationRegisterApplication = Yup.object().shape({
  nombre: Yup.string()
    .min(3, "Debe contener al menos 3 caracteres")
    .required("El nombre es requerido"),
  apellido: Yup.string()
    .min(3, "Debe contener al menos 3 caracteres")
    .required("El apellido es requerido"),
  telefono_usuario: Yup.string()
    .required("El teléfono del usuario es requerido")
    .matches(/^\d+$/, "El teléfono debe contener solo números")
    .min(6, "El teléfono debe tener al menos 6 caracteres")
    .max(12, "El teléfono no debe exceder los 12 caracteres"),

  nombres_representante: Yup.string().required("El nombre es requerido"),
  apellidos_representante: Yup.string().required("El apellido es requerido"),
  tipo_persona: Yup.mixed<"FISICA" | "JURIDICA">()
    .oneOf(["FISICA", "JURIDICA"], "Debe ser FISICA o JURIDICA")
    .required("El tipo de persona es requerido"),
  nombre_productora: Yup.string()
    .min(3, "Debe contener al menos 3 caracteres")
    .required("El nombre de la productora es requerido"),
  cuit_cuil: validacionCuitCuil,
  email: validacionEmail,
  calle: Yup.string().required("La calle es requerida"),
  numero: Yup.string()
    .required("El número es requerido")
    .matches(/^\d+$/, "El número debe ser numérico"),
  ciudad: Yup.string().required("La ciudad es requerida"),
  localidad: Yup.string().required("La localidad es requerida"),
  provincia: Yup.string().required("La provincia es requerida"),
  codigo_postal: Yup.string()
    .required("El código postal es requerido")
    .matches(/^\d+$/, "El código postal debe ser numérico"),
  telefono: Yup.string()
    .required("El teléfono del usuario es requerido")
    .matches(/^\d+$/, "El teléfono debe contener solo números")
    .min(6, "El teléfono debe tener al menos 6 caracteres")
    .max(12, "El teléfono no debe exceder los 12 caracteres"),

  nacionalidad: Yup.string().required("La nacionalidad es requerida"),
  alias_cbu: Yup.string().required("El alias del CBU es requerido"),
  cbu: Yup.string()
    .required("El CBU es requerido")
    .matches(/^\d{22}$/, "El CBU debe contener exactamente 22 dígitos"),
  cuit_representante: Yup.string()
    .test(
      "cuit_cuil_representante",
      "El CUIT/CUIL del representante es requerido",
      function (value) {
        return this.parent.tipo_persona === "JURIDICA" ? Boolean(value) : true;
      }
    )
    .matches(/^\d{11}$/, "El CUIT/CUIL debe contener exactamente 11 dígitos"),
  razon_social: Yup.string().test(
    "razon_social",
    "La razón social es requerida",
    function (value) {
      return this.parent.tipo_persona === "JURIDICA" ? Boolean(value) : true;
    }
  ),
});

export const validationChangePassword = Yup.object({
  newPassword: Yup.string()
    .min(8, "La contraseña debe tener al menos  8 caracteres.")
    .required("La contraseña es requerida."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), ""], "Las contraseñas deben coincidir")
    .required("Debes confirmar tu contraseña"),
});

export const validationSecondaryRegister = Yup.object({
  email: validacionEmail,
  confirm_email: Yup.string()
    .email("Email inválido")
    .test({
      name: "email-match",
      message: "Los emails no coinciden",
      test: function (value) {
        return value === this.parent.email;
      },
    })
    .required("El email de confirmación es requerido"),
  nombre: validacionNombre,
  apellido: validacionApellido,
  telefono: validacionTelefono,
});

export const validationEditUser = Yup.object({
  nombre: validacionNombre,
  apellido: validacionApellido,
  telefono: validacionTelefono,
  email: validacionEmail,
});

export const validationEditProducer = Yup.object({
  nombre_productora: validacionNombre,
  cuit_cuil: validacionCuitCuil,
  razon_social: Yup.string().optional(),
  nombres_representante: validacionNombre,
  apellidos_representante: validacionApellido,
  email: validacionEmail,
  cuit_representante: Yup.string().optional(),
  denominacion_sello: Yup.string().optional(),
  calle: Yup.string().required("La calle es requerida"),
  numero: Yup.string()
    .required("El número es requerido")
    .matches(/^\d+$/, "El número debe ser numérico"),
  datos_adicionales: Yup.string().optional(),
  localidad: Yup.string().required("La localidad es requerida"),
  provincia: Yup.string().required("La provincia es requerida"),
  codigo_postal: Yup.string()
    .required("El código postal es requerido")
    .matches(/^\d+$/, "El código postal debe ser numérico"),
  telefono: validacionTelefono,
  nacionalidad: Yup.string().required("La nacionalidad es requerida"),
});

export const isrcValidation = Yup.object({
  ISRC: Yup.string()
    .min(12, "El código de designación debe tener 11 caracteres.")
    .max(12, "El código de designación debe tener 11 caracteres.")
    .required("El código de designación es requerido."),
});

export const cuitValidation = Yup.object({
  cuit: validacionCuitCuil,
});
