import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomField from "@/commons/CustomField/CustomField";
import { updateUserById } from "@/services/users";
import { User } from "@/types/user.types";
import { validationEditUser } from "@/utils/formValidations";

const UserFieldsView = ({
  userData,
  disabled = false,
  onGoBack,
}: {
  userData: User;
  disabled?: boolean;
  onGoBack: () => void;
}) => {
  const initialValues = {
    nombre: userData?.nombre || "",
    apellido: userData?.apellido || "",
    email: userData?.email || "",
    telefono: userData?.telefono || "",
  };

  const onSubmit = async (values: typeof initialValues) => {
    try {
      const { nombre, apellido, email, telefono } = values;
      if (userData?.id) {
        await updateUserById(userData?.id, {
          nombre,
          apellido,
          email,
          telefono,
        });
      }
      toast.success("Usuario actualizado correctamente");
      onGoBack();
    } catch (error) {
      toast.error("Error al actualizar el usuario");
      console.error(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationEditUser}
      onSubmit={(values) => onSubmit(values)}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="w-[100%] flex flex-col space-y-[1rem] items-end">
          <div className="w-[100%] flex flex-row space-x-3">
            <CustomField
              disabled={disabled}
              id="nombre"
              name="nombre"
              labelText="NOMBRES"
              type="text"
              width="w-[100%]"
            />
            <CustomField
              disabled={disabled}
              id="apellido"
              name="apellido"
              labelText="APELLIDOS"
              type="text"
              width="w-[100%]"
            />
          </div>

          <div className="w-[100%] flex flex-row space-x-3">
            <CustomField
              disabled={disabled}
              id="email"
              name="email"
              labelText="EMAIL"
              type="email"
              width="w-[100%]"
            />
            <CustomField
              disabled={disabled}
              id="telefono"
              name="telefono"
              labelText="TELÉFONO"
              type="text"
              width="w-[100%]"
            />
          </div>
          {!disabled && (
            <CustomButton
              {...(isSubmitting || !isValid || !dirty
                ? { disabled: true, background: "disabled" }
                : {})}
              type="submit"
            >
              Guardar
            </CustomButton>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default UserFieldsView;
