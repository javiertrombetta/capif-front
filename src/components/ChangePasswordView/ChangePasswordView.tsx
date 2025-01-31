import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomField from "@/commons/CustomField/CustomField";
import { changePassword } from "@/services/users";
import { validationChangePassword } from "@/utils/formValidations";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";

export const ChangePasswordView = ({ idUsuario }: { idUsuario: string }) => {
  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const onSubmit = async (values: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    try {
      await changePassword({
        id_usuario: idUsuario,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      });
      toast.success("Contraseña cambiada correctamente");
    } catch (error) {
      toast.error("Error al cambiar la contraseña");
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationChangePassword}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="w-[100%] flex flex-col space-y-[1rem] items-end">
          <div className="w-[100%] flex flex-row space-x-3 items-center justify-center">
            <CustomField
              type="password"
              id="newPassword"
              name="newPassword"
              labelText="CONTRASEÑA"
              width="w-[100%]"
            />
            <CustomField
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              labelText="REPETIR CONTRASEÑA"
              width="w-[100%]"
            />
          </div>
          <CustomButton
            {...(isSubmitting || !isValid || !dirty
              ? { disabled: true, background: "disabled" }
              : {})}
            type="submit"
          >
            Guardar
          </CustomButton>
        </Form>
      )}
    </Formik>
  );
};
