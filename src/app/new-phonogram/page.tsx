"use client";
import React, { FC, useRef, useState } from "react";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import { Form, Formik } from "formik";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomField from "@/commons/CustomField/CustomField";
import { IoIosArrowForward } from "react-icons/io";
import TimerInput from "@/components/TimerInput/TimerInput";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import CustomInput from "@/commons/CustomInput/CustomInput";
import CustomTable from "@/commons/CustomTable/CustomTable";
import { setModal } from "@/store/modalSlice";
import { ModalNames } from "@/types/modalNames";
function page() {
  const [isNewPhonogram, setIsNewPhonogram] = useState<boolean>(true);

  const [flowState, setFlowState] = useState<
    | "start"
    | "existing_phonogram"
    | "new_phonogram"
    | "load_audio"
    | "add_participation"
    | "edit_territoriality"
  >("start");

  const handleGoToCreateNew = () => {
    if (isNewPhonogram) {
      setFlowState("new_phonogram");
    } else {
      setFlowState("existing_phonogram");
    }
  };

  const newPhonogramSubmit = () => {
    setFlowState("load_audio");
  };

  const existingPhonogramSubmit = () => {
    setFlowState("add_participation");
  };

  const loadAudioSubmit = () => {
    setFlowState("add_participation");
  };

  const addPercentageSubmit = () => {
    setFlowState("edit_territoriality");
  };

  const handleGoBack = () => {
    switch (flowState) {
      case "existing_phonogram":
        setFlowState("start");
        break;

      case "new_phonogram":
        setFlowState("start");
        break;

      case "load_audio":
        setFlowState("new_phonogram");
        break;

      case "add_participation":
        if (isNewPhonogram) {
          setFlowState("load_audio");
        } else {
          setFlowState("existing_phonogram");
        }

        break;
    }
  };

  const handleIsNewPhonogramStateChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (e.target.value === "fonograma_nuevo") {
      setIsNewPhonogram(true);
    } else if (e.target.value === "fonograma_existente") {
      setIsNewPhonogram(false);
    }
  };

  return (
    <CustomLayout>
      <Header title="Declaración de Repertorio" />

      {flowState === "start" && (
        <div className="w-[100%] pr-[2rem] pl-[2rem] flex justify-end items-center mt-[0.5rem] gap-[0.6rem] relative">
          <select
            onChange={handleIsNewPhonogramStateChange}
            className="text-black pl-[0.3rem] border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] text-black"
            defaultValue={"fonograma_nuevo"}
          >
            <option className="text-black" value={"fonograma_nuevo"}>
              Fonograma Nuevo
            </option>
            <option className="text-black" value={"fonograma_existente"}>
              Fonograma Existente
            </option>
          </select>
        </div>
      )}
      {flowState === "start" ? null : (
        <>
          <div className="w-[100%] pr-[2rem] pl-[2rem] flex justify-center items-center mt-[2rem] gap-[0.6rem] relative">
            <p className="text-[#a6acaf] font-bold">Ingresar ISRC</p>
            <IoIosArrowForward color="#a6acaf" size={20} />
            <p
              className={`${flowState === "existing_phonogram" || flowState === "new_phonogram" ? "text-black" : "text-[#a6acaf]"} font-bold`}
            >
              Crear/Verificar Fonograma
            </p>
            <IoIosArrowForward color="#a6acaf" size={20} />
            {isNewPhonogram && (
              <>
                <p
                  className={`${flowState === "load_audio" ? "text-black" : "text-[#a6acaf]"} font-bold`}
                >
                  Cargar Audio
                </p>
                <IoIosArrowForward color="#a6acaf" size={20} />
              </>
            )}

            <p
              className={`${flowState === "add_participation" ? "text-black" : "text-[#a6acaf]"} font-bold`}
            >
              Agregar Titularidad
            </p>
            <IoIosArrowForward color="#a6acaf" size={20} />
            <p
              className={`${flowState === "edit_territoriality" ? "text-black" : "text-[#a6acaf]"} font-bold`}
            >
              Territorialidad
            </p>
          </div>
          <div className="relative mt-[0.5rem]">
            <div className="absolute left-[3%] top-[20%]">
              <button
                onClick={handleGoBack}
                className="text-mainblue text-[1.1rem] decoration-underline"
              >
                <p className="text-mainblue">Ir al paso anterior</p>
              </button>
            </div>
          </div>
        </>
      )}

      {flowState === "start" ? (
        <SearchForISRC onSubmit={handleGoToCreateNew} />
      ) : null}

      {flowState === "new_phonogram" && (
        <NewPhonogram onSubmit={newPhonogramSubmit} />
      )}

      {flowState === "existing_phonogram" && (
        <ExistingPhonogram onSubmit={existingPhonogramSubmit} />
      )}

      {flowState === "load_audio" && <LoadAudio onSubmit={loadAudioSubmit} />}
      {flowState === "add_participation" && (
        <AddParticipation onSubmit={addPercentageSubmit} />
      )}
      {flowState === "edit_territoriality" && <EditTerritoriality />}
    </CustomLayout>
  );
}

const SearchForISRC: FC<{ onSubmit: () => void }> = ({ onSubmit }) => {
  const initialValues = {
    ISRC: "",
  };
  return (
    <div className="w-[100%] h-[20%] flex flex-col justify-center items-center mt-[3rem] pl-[3rem] pr-[3rem]">
      <p className="text-black font-bold">Ingresa el ISRC del fonograma.</p>
      <Formik onSubmit={onSubmit} initialValues={initialValues}>
        {({ isSubmitting, isValid, dirty }) => (
          <Form className="w-[60%] flex flex-col justify-center items-center">
            <CustomField type="text" id="ISRC" name="ISRC" labelText="ISRC" />
            <CustomButton
              type="submit"
              disabled={isSubmitting || !isValid || !dirty}
            >
              Buscar ISRC
            </CustomButton>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const NewPhonogram: FC<{ onSubmit: () => void }> = ({ onSubmit }) => {
  const userData = useAppSelector((state) => state.user);
  const initialValues = {
    titulo: "",
    artista: "",
    album: "",
    duracion: "",
    productor_originario: userData.activeProduction,
    año_lanzamiento: "",
    registro_desde: "",
    registro_hasta: "",
  };

  const [year, setYear] = useState("");
  const currentYear = new Date().getFullYear();

  const handleInputYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 4) {
      const numericValue = parseInt(value, 10);
      if (value === "" || numericValue <= currentYear) {
        setYear(value);
      }
    }
  };

  return (
    <div className="w-[100%] flex flex-col justify-center items-center mt-[3rem] pl-[3rem] pr-[3rem]">
      <p className="text-black font-bold">
        Complete los campos para crear el fonograma.
      </p>
      <Formik onSubmit={onSubmit} initialValues={initialValues}>
        {({ isSubmitting, isValid, dirty }) => (
          <Form className="w-[60%] flex flex-col justify-center items-center">
            <CustomField
              type="text"
              id="titulo"
              name="titulo"
              labelText="Titulo"
            />
            <CustomField
              type="text"
              id="artista"
              name="artista"
              labelText="Artista"
            />
            <CustomField
              type="text"
              id="album"
              name="album"
              labelText="Album"
            />

            <div className="w-[100%] mb-[1.5rem]">
              <p className="text-black font-bold">Duración del Repertorio</p>
              <TimerInput />
            </div>
            <CustomField
              type="text"
              id="productor_originario"
              name="productor_originario"
              labelText="Productor Originario"
              disabled
            />

            <div className="w-[100%] flex flex-col">
              <label style={{ color: "black" }} className="font-bold">
                Año de Lanzamiento
              </label>
              <input
                type="text"
                placeholder="AAAA"
                value={year}
                onChange={handleInputYear}
                className={
                  "padding-left border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] text-[black] "
                }
              />
            </div>

            <CustomButton
              type="submit"
              disabled={isSubmitting || !isValid || !dirty}
              className="mt-[3rem]"
            >
              Continuar
            </CustomButton>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const ExistingPhonogram: FC<{ onSubmit: () => void }> = ({ onSubmit }) => {
  const initialValues = {
    titulo: "Cae el Sol",
    artista: "Airbag",
    album: "Voragine",
    duracion: "00:03:57",
    productor_originario: "Sony Music",
    año_lanzamiento: "2011",
    registro_desde: "21/11/2024",
    registro_hasta: "15/06/2025",
  };

  return (
    <div className="w-[100%] flex flex-col justify-center items-center mt-[3rem] pl-[3rem] pr-[3rem]">
      <p className="text-black font-bold">Fonograma Existente.</p>

      <Formik onSubmit={onSubmit} initialValues={initialValues}>
        {() => (
          <Form className="w-[60%] flex flex-col justify-center items-center">
            <CustomField
              type="text"
              id="titulo"
              name="titulo"
              labelText="Titulo"
              disabled
            />
            <CustomField
              type="text"
              id="artista"
              name="artista"
              labelText="Artista"
              disabled
            />
            <CustomField
              type="text"
              id="album"
              name="album"
              labelText="Album"
              disabled
            />
            <CustomField
              type="text"
              id="duracion"
              name="duracion"
              labelText="Duración"
              disabled
            />
            <CustomField
              type="text"
              id="productor_originario"
              name="productor_originario"
              labelText="Productor Originario"
              disabled
            />
            <CustomField
              type="text"
              id="año_lanzamiento"
              name="año_lanzamiento"
              labelText="Año de lanzamiento"
              disabled
            />

            <CustomButton type="submit">Continuar</CustomButton>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const LoadAudio: FC<{ onSubmit: () => void }> = ({ onSubmit }) => {
  return (
    <div className="w-[100%] flex flex-col justify-center items-center mt-[3rem] pl-[3rem] pr-[3rem]">
      <p className="text-black font-bold">
        Seleccione el archivo de audio (opcional)
      </p>

      <div className="w-[60%] flex flex-col justify-center items-center gap-[0.8rem] mt-[0.5rem]">
        <button className="relative overflow-hidden p-[0.4rem] text-white cursor-pointer font-bold flex justify-center items-center bg-[#2ecc71] rounded-[0.3rem]">
          Seleccionar Audio
          <input
            className="absolute opacity-0 cursor-pointer w-[100%] h-[100%]"
            type="file"
          />
        </button>

        <CustomButton type="submit" onClick={onSubmit}>
          Continuar
        </CustomButton>
      </div>
    </div>
  );
};

const AddParticipation: FC<{ onSubmit: () => void }> = ({ onSubmit }) => {
  const initialValues = {
    fecha_participacion_inicio: "",
    fecha_participacion_hasta: "",
    porcentaje_participacion: "",
  };
  const [percentage, setPercentage] = useState<string>("100");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDivClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleChangePercentage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    const regex = /^(100|[0-9]{1,2})$/;

    if (regex.test(inputValue) || inputValue === "") {
      setPercentage(inputValue);
    }
  };

  const year = new Date().getFullYear();

  return (
    <div className="w-[100%] flex flex-col justify-center items-center mt-[3rem] pl-[3rem] pr-[3rem]">
      <p className="text-black font-bold text-[1.3rem]">Agregar Porcentaje</p>
      <Formik onSubmit={onSubmit} initialValues={initialValues}>
        {() => (
          <Form className="w-[60%] flex flex-col justify-center items-center">
            <div className={" w-[100%] container flex flex-col"}>
              <label style={{ color: "black" }} className="font-bold">
                Fecha Inicio de Titularidad
              </label>

              <input
                defaultValue={`${year}-01-01`}
                type="date"
                id="fecha_participacion_inicio"
                name="fecha_participacion_inicio"
                className={
                  "padding-left border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] text-[black]"
                }
              />
            </div>

            <div className={" w-[100%] container flex flex-col"}>
              <label style={{ color: "black" }} className="font-bold">
                Fecha Hasta de Titularidad
              </label>

              <input
                defaultValue={"2099-12-31"}
                type="date"
                id="fecha_participacion_hasta"
                name="fecha_participacion_hasta"
                className={
                  "padding-left border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] text-[black]"
                }
              />
            </div>

            <div className={"w-[100%] container flex flex-col"}>
              <label style={{ color: "black" }} className="font-bold">
                Porcentaje de Titularidad (solo numeros con hasta dos decimales)
              </label>
              <div
                onClick={handleDivClick}
                className={
                  "padding-left border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] text-[black] relative overflow-hidden"
                }
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={percentage}
                  onChange={handleChangePercentage}
                  maxLength={3}
                  placeholder="0"
                  className="w-[4.9%] h-[100%] pl-1 rounded text-black ring-0 outline-0 focus-ring-0"
                />
                <span className="absolute left-[5.4%] top-[50%] transform -translate-y-1/2 text-gray-500 ">
                  %
                </span>
              </div>
            </div>
            <CustomButton type="submit">Continuar</CustomButton>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const EditTerritoriality: FC = () => {
  const dispatch = useAppDispatch();

  const handleFinishNewPhonogram = () => {
    dispatch(
      setModal({ type: ModalNames.FINISH_NEW_PHONOGRAM, isActive: true })
    );
  };

  return (
    <div className="w-[100%] flex flex-col justify-center items-center mt-[3rem] pl-[3rem] pr-[3rem]">
      <div className="w-[100%] pr-[2rem] pl-[2rem] justify-between items-end flex mt-[1rem] mb-[1rem]">
        <CustomInput type="text" label="Buscar Países" />
        <div className="flex gap-[1.5rem]">
          <CustomButton onClick={handleFinishNewPhonogram}>
            Guardar y Terminar
          </CustomButton>
        </div>
      </div>

      <CustomTable
        columnNames={[
          { name: "", isSortable: false, selectBox: true },
          { name: "PAÍS", isSortable: true },
          { name: "ISO", isSortable: true },
        ]}
        columnValues={[
          [
            <input
              type="checkbox"
              defaultChecked
              className="w-[1rem] h-[1rem]"
            />,
            "Paraguay",
            "PY",
          ],
          [
            <input
              type="checkbox"
              defaultChecked
              className="w-[1rem] h-[1rem]"
            />,
            "Uruguay",
            "UY",
          ],
          [
            <input
              type="checkbox"
              defaultChecked
              className="w-[1rem] h-[1rem]"
            />,
            "Brasil",
            "BR",
          ],
          [
            <input
              type="checkbox"
              defaultChecked
              className="w-[1rem] h-[1rem]"
            />,
            "Guatemala",
            "GT",
          ],
          [
            <input
              type="checkbox"
              defaultChecked
              className="w-[1rem] h-[1rem]"
            />,
            "Costa Rica",
            "CR",
          ],
          [
            <input
              type="checkbox"
              defaultChecked
              className="w-[1rem] h-[1rem]"
            />,
            "El Salvador",
            "SV",
          ],
          [
            <input
              type="checkbox"
              defaultChecked
              className="w-[1rem] h-[1rem]"
            />,
            "Panamá",
            "PA",
          ],
          [
            <input
              type="checkbox"
              defaultChecked
              className="w-[1rem] h-[1rem]"
            />,
            "República Dominicana",
            "DO",
          ],
          [
            <input
              type="checkbox"
              defaultChecked
              className="w-[1rem] h-[1rem]"
            />,
            "España",
            "ES",
          ],
          [
            <input
              type="checkbox"
              defaultChecked
              className="w-[1rem] h-[1rem]"
            />,
            "India",
            "IN",
          ],
          [
            <input
              type="checkbox"
              defaultChecked
              className="w-[1rem] h-[1rem]"
            />,
            "Italia",
            "IT",
          ],
          [
            <input
              type="checkbox"
              defaultChecked
              className="w-[1rem] h-[1rem]"
            />,
            "Ucrania",
            "UA",
          ],
        ]}
      />
    </div>
  );
};

export default page;
