import React, { FC } from "react";
import "./Modal.css";
import CustomInput from "../CustomInput/CustomInput";
import CustomButton from "../CustomButton/CustomButton";

interface ModalProps {
  handleCloseModal: () => void;
}

const Modal: FC<ModalProps> = ({ handleCloseModal }) => {
  return (
    <div className="text-black absolute w-[100%] h-[100%] flex justify-center items-center">
      <div className="form">
        <div className="form-header">
          <h1>Filtros</h1>
        </div>
        <div className="inputs-container">
          <CustomInput className="w-[100%]" type="text" label="ORIGEN" />
          <CustomInput className="w-[100%]" type="text" label="VER" />
          <CustomInput className="w-[100%]" type="text" label="PRODUCTOR" />
          <CustomInput className="w-[100%]" type="text" label="TITULAR" />
          <CustomInput className="w-[100%]" type="text" label="CUIT" />
          <CustomInput className="w-[100%]" type="text" label="AGENTE" />
          <CustomInput className="w-[100%]" type="text" label="ARTISTA" />
          <CustomInput className="w-[100%]" type="text" label="ALBUM" />
          <CustomInput className="w-[100%]" type="text" label="SELLO" />
          <CustomInput className="w-[100%]" type="text" label="TEMA" />
          <CustomInput className="w-[100%]" type="text" label="ISRC" />
          <CustomInput
            className="w-[100%]"
            type="text"
            label="AÑO DE PUBLICACIÓN"
          />
          <CustomInput className="w-[100%]" type="text" label="EN CONFLICTO" />
        </div>
        <div className="buttons-container">
          <CustomButton>Aplicar Filtros</CustomButton>

          <CustomButton>Restaurar Filtros</CustomButton>

          <CustomButton onClick={handleCloseModal}>Cancelar</CustomButton>
        </div>
      </div>
      <div onClick={handleCloseModal} className="dark-background" />
    </div>
  );
};

export default Modal;
