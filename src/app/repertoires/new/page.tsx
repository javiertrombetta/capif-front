"use client";
import { AxiosError } from "axios";
import { Form, Formik } from "formik";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";
import { useRouter } from "next/navigation";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomField from "@/commons/CustomField/CustomField";
import CustomInput from "@/commons/CustomInput/CustomInput";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import CustomTable from "@/commons/CustomTable/CustomTable";
import Header from "@/commons/Header/Header";
import TimerInput from "@/components/TimerInput/TimerInput";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import {
  initialStateCreatePhonogram,
  setCreatePhonogram,
} from "@/store/createPhonogramSlice";
import {
  addRepertoireTitularities,
  createRepertoire,
  uploadPhonogramFile,
  validateISRC,
} from "@/services/repertoire";
import { isrcValidation } from "@/utils/formValidations";

function page() {
  const router = useRouter();
  const [flowState, setFlowState] = useState<
    | "start"
    | "existing_repertoire"
    | "new_phonogram"
    | "load_audio"
    | "add_participation"
    | "edit_territoriality"
  >("start");
  const [audio, setAudio] = useState<File | null>(null);
  const dispatch = useAppDispatch();
  const authData = useAppSelector((state) => state.auth);
  const createPhonogramData = useAppSelector((state) => state.createPhonogram);

  const handleGoBack = () => {
    switch (flowState) {
      case "existing_repertoire":
        setFlowState("start");
        break;
      case "new_phonogram":
        setFlowState("start");
        break;
      case "add_participation":
        setFlowState("new_phonogram");
        break;
      case "edit_territoriality":
        setFlowState("add_participation");
        break;
      case "load_audio":
        setFlowState("edit_territoriality");
        break;
    }
  };

  const sendPhonogram = async () => {
    const {
      titulo,
      album,
      artista,
      productora_id,
      duracion,
      anio_lanzamiento,
      sello_discografico,
      participaciones,
      territorios,
      isrc,
    } = createPhonogramData;

    if (
      territorios &&
      participaciones &&
      anio_lanzamiento &&
      duracion &&
      productora_id &&
      artista &&
      album &&
      titulo &&
      isrc
    ) {
      const response = await createRepertoire({
        productora_id,
        titulo,
        artista,
        album,
        duracion,
        anio_lanzamiento,
        sello_discografico,
        participaciones,
        territorios,
        isrc,
      });
      return response;
    } else {
      throw new Error("Uno o mas campos estan incompletos.");
    }
  };

  const sendPhonogramFile = async (id: string) => {
    if (audio && authData.productoraActiva) {
      const formData = new FormData();
      formData.append("audioFile", audio);
      await uploadPhonogramFile(formData, id);
    }
  };

  const onSubmit = async () => {
    try {
      const phonogram = await sendPhonogram();
      toast.success("¡Fonograma creado correctamente!");
      dispatch(setCreatePhonogram(initialStateCreatePhonogram));
      setFlowState("start");
      try {
        await sendPhonogramFile(phonogram.id_fonograma as string);
      } catch (error) {
        console.error(error);
        toast.error("Error al enviar archivo de audio.");
      }
      router.push("/repertoires");
    } catch (error: unknown) {
      console.log(error);
      toast.error(`${error}`);
    }
  };

  return (
    <CustomLayout>
      <Header title="Declaración de Repertorio" />

      {flowState === "start" || flowState === "existing_repertoire" ? null : (
        <>
          <div className="w-[100%] pr-[2rem] pl-[2rem] flex justify-center items-center mt-[2rem] gap-[0.6rem] relative">
            <p className="text-[#a6acaf] font-bold">Ingresar ISRC</p>
            <IoIosArrowForward color="#a6acaf" size={20} />
            <p
              className={`${flowState === "new_phonogram" ? "text-black" : "text-[#a6acaf]"} font-bold`}
            >
              Crear/Verificar Fonograma
            </p>
            <IoIosArrowForward color="#a6acaf" size={20} />

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
            <IoIosArrowForward color="#a6acaf" size={20} />
            <p
              className={`${flowState === "load_audio" ? "text-black" : "text-[#a6acaf]"} font-bold`}
            >
              Cargar Audio
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
        <SearchForISRC
          onSubmit={(isrc: string) => {
            if (isrc) {
              setFlowState("existing_repertoire");
            } else {
              setFlowState("new_phonogram");
            }
          }}
        />
      ) : null}

      {flowState === "new_phonogram" && (
        <NewPhonogram
          onSubmit={() => {
            setFlowState("add_participation");
          }}
        />
      )}

      {flowState === "existing_repertoire" && (
        <ExistingPhonogram handleGoBack={handleGoBack} />
      )}

      {flowState === "add_participation" && (
        <AddParticipation
          onSubmit={() => {
            setFlowState("edit_territoriality");
          }}
        />
      )}
      {flowState === "edit_territoriality" && (
        <EditTerritoriality
          onSubmit={() => {
            setFlowState("load_audio");
          }}
        />
      )}
      {flowState === "load_audio" && (
        <LoadAudio audio={audio} setAudio={setAudio} onSubmit={onSubmit} />
      )}
    </CustomLayout>
  );
}

const SearchForISRC: FC<{ onSubmit: (isrc: string) => void }> = ({
  onSubmit,
}) => {
  const dispatch = useAppDispatch();
  const createPhogramCurrentData = useAppSelector(
    (state) => state.createPhonogram
  );

  const initialValues = {
    ISRC: "",
  };

  const handleOnSubmit = async (values: { ISRC: string }) => {
    try {
      const { available, id_repertorio } = await validateISRC(`${values.ISRC}`);
      onSubmit(available ? "" : values.ISRC);
      dispatch(
        setCreatePhonogram({
          ...createPhogramCurrentData,
          isrc: values.ISRC,
          id_repertorio: id_repertorio ?? "",
        })
      );
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        toast.error(error.request.data?.message || error.request.data?.error);
      }
      toast.error("Error al validar ISRC.");
    }
  };

  return (
    <div className="w-[100%] h-[20%] flex flex-col justify-center items-center mt-[3rem] px-[3rem]">
      <p className="text-black font-bold">Ingresa el ISRC del fonograma.</p>
      <Formik
        onSubmit={(values) => handleOnSubmit(values)}
        validationSchema={isrcValidation}
        initialValues={initialValues}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form className="w-[60%] flex flex-col justify-center items-center space-x-[1rem]">
            <CustomField id="ISRC" name="ISRC" type="text" />
            <CustomButton
              type="submit"
              {...(isSubmitting || !isValid || !dirty
                ? { disabled: true, background: "disabled" }
                : {})}
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
  const authData = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const createPhogramCurrentData = useAppSelector(
    (state) => state.createPhonogram
  );
  const initialValues = {
    titulo: createPhogramCurrentData.titulo || "",
    artista: createPhogramCurrentData.artista || "",
    album: createPhogramCurrentData.album || "",
    productor_originario: authData.productoraActiva?.productora || "",
    sello_discografico: createPhogramCurrentData.sello_discografico || "",
  };

  const [year, setYear] = useState(
    createPhogramCurrentData.anio_lanzamiento || ""
  );
  const [time, setTime] = useState<string>("");
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

  const handleSubmit = (values: typeof initialValues) => {
    if (authData?.productoras && authData.productoraActiva)
      dispatch(
        setCreatePhonogram({
          ...createPhogramCurrentData,
          productora_id: authData.productoraActiva.id,
          album: values.album,
          titulo: values.titulo,
          anio_lanzamiento: Number(year),
          artista: values.artista,
          duracion: time,
          sello_discografico: values.sello_discografico,
        })
      );
    onSubmit();
  };

  const handleTime = (formatedTime: string) => {
    setTime(formatedTime);
  };

  return (
    <div className="w-[100%] flex flex-col justify-center items-center mt-[3rem] px-[3rem]">
      <p className="text-black font-bold">
        Complete los campos para crear el fonograma.
      </p>
      <Formik
        onSubmit={(values) => handleSubmit(values)}
        initialValues={initialValues}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form className="w-[60%] flex flex-col justify-center items-center mb-[2rem]">
            <CustomField
              type="text"
              id="titulo"
              name="titulo"
              labelText="Título"
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
              <p className="text-black font-bold">
                Duración del Tema (Horas, Minutos, Segundos)
              </p>
              <TimerInput
                defaultTime={createPhogramCurrentData.duracion || ""}
                onChange={handleTime}
              />
            </div>
            <CustomField
              type="text"
              id="productor_originario"
              name="productor_originario"
              labelText="Productor Originario"
              disabled
            />
            <CustomField
              type="text"
              id="sello_discografico"
              name="sello_discografico"
              labelText="Productor Originario"
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
              className="mt-[2rem]"
            >
              Continuar
            </CustomButton>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const ExistingPhonogram: FC<{
  handleGoBack: () => void;
}> = ({ handleGoBack }) => {
  const router = useRouter();
  const authData = useAppSelector((state) => state.auth);
  const { isrc, id_repertorio } = useAppSelector(
    (state) => state.createPhonogram
  );
  const [percentage, setPercentage] = useState<string | number>("0");

  const initialValues = {
    productora: authData.productoraActiva?.productora || "",
    porcentaje_participacion: "",
    fecha_inicio: `${new Date().getFullYear()}-01-01`,
    fecha_hasta: "2099-12-31",
  };

  const handleChangePercentage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseInt(e.target.value ? e.target.value : "0");

    if (inputValue <= 100) {
      setPercentage(inputValue || "");
    }
  };

  const onSubmit = async (values: typeof initialValues) => {
    if (id_repertorio) {
      try {
        await addRepertoireTitularities(id_repertorio, {
          participaciones: [
            {
              cuit: authData.productoraActiva?.cuit,
              fecha_inicio: values.fecha_inicio,
              fecha_hasta: values.fecha_hasta,
              porcentaje_participacion: parseFloat(percentage.toString()),
            },
          ],
        });
        toast.success("Titularidad agregada correctamente");
        router.push("/repertoires");
      } catch (error) {
        console.error(error);
        toast.error("Error al agregar titularidad");
      }
    }
  };

  return (
    <div className="w-[100%] flex flex-col justify-center items-center mt-[3rem] pl-[3rem] pr-[3rem]">
      <p className="text-black font-bold text-3xl">Agregar Titularidad</p>
      <p className="text-black font-normal">Fonograma Existente ({isrc})</p>
      {authData && (
        <Formik onSubmit={onSubmit} initialValues={initialValues}>
          <Form className="max-w-[30rem] w-[100%] p-[2rem] mt-[2rem] flex flex-col items-center gap-[1rem] border-[1px] border-[#c8c8c8]">
            <CustomField
              disabled
              id="productora"
              name="productora"
              type="text"
              labelText="PRODUCTORA"
            />
            <CustomField
              id="fecha_inicio"
              name="fecha_inicio"
              type="date"
              labelText="DESDE"
            />
            <CustomField
              id="fecha_hasta"
              name="fecha_hasta"
              type="date"
              labelText="HASTA"
            />
            <div className={"w-[100%] container flex flex-col"}>
              <label style={{ color: "black" }} className="font-bold">
                Porcentaje
              </label>
              <input
                type="number"
                min={0}
                max={100}
                value={percentage}
                onChange={handleChangePercentage}
                className={
                  "padding-left border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] text-[black]"
                }
              />
              <div className="w-[100%] flex justify-center items-center h-[1rem]">
                {Number(percentage) > 100 && (
                  <p className="text-[#e74c3c] text-[0.9rem] w-[100%] mt-[0.5rem] text-center top-[100%]">
                    Estás excediendo el porcentaje disponible del fonograma.
                  </p>
                )}
              </div>
            </div>
            <div className="w-[100%] flex flex-row justify-between">
              <CustomButton type="submit">Agregar</CustomButton>
              <CustomButton
                type="button"
                background="delete"
                onClick={handleGoBack}
              >
                Cancelar
              </CustomButton>
            </div>
          </Form>
        </Formik>
      )}
    </div>
  );
};

const AddParticipation: FC<{ onSubmit: () => void }> = ({ onSubmit }) => {
  const dispatch = useAppDispatch();
  const authData = useAppSelector((state) => state.auth);
  const createPhogramCurrentData = useAppSelector(
    (state) => state.createPhonogram
  );

  const year = new Date().getFullYear();
  const initialValues = {
    productora: authData.productoraActiva?.productora,
    porcentaje_participacion:
      createPhogramCurrentData.participaciones?.[0]?.porcentaje_participacion ||
      "",
    fecha_inicio:
      createPhogramCurrentData.participaciones?.[0].fecha_inicio ||
      `${year}-01-01`,
    fecha_hasta:
      createPhogramCurrentData.participaciones?.[0].fecha_hasta || "2099-12-31",
  };

  const [participacion, setParticipacion] =
    useState<typeof initialValues>(initialValues);

  const handleChangePercentage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseInt(e.target.value ? e.target.value : "0");

    if (inputValue <= 100) {
      setParticipacion({
        ...participacion,
        porcentaje_participacion: inputValue.toString() || "",
      });
    }
  };

  const handleSubmit = () => {
    if (participacion) {
      dispatch(
        setCreatePhonogram({
          ...createPhogramCurrentData,
          participaciones: [
            {
              cuit: authData.productoraActiva?.cuit ?? "",
              porcentaje_participacion: Number(
                participacion.porcentaje_participacion
              ),
              fecha_inicio: participacion.fecha_inicio,
              fecha_hasta: participacion.fecha_hasta,
            },
          ],
        })
      );

      onSubmit();
    }
  };

  return (
    <div className="w-[100%] flex flex-col justify-center items-center mt-[3rem] pl-[3rem] pr-[3rem]">
      <p className="text-black font-bold text-[1.3rem]">Agregar Titulares</p>
      <div className="w-[100%] flex flex-row justify-center items-end space-x-3 py-[1rem]">
        <Formik onSubmit={handleSubmit} initialValues={initialValues}>
          <Form className="max-w-[30rem] w-[100%] p-[2rem] mt-[2rem] flex flex-col items-center gap-[1rem] border-[1px] border-[#c8c8c8]">
            <CustomField
              disabled
              id="productora"
              name="productora"
              type="text"
              labelText="PRODUCTORA"
            />
            <CustomField
              id="fecha_inicio"
              name="fecha_inicio"
              type="date"
              labelText="DESDE"
            />
            <CustomField
              id="fecha_hasta"
              name="fecha_hasta"
              type="date"
              labelText="HASTA"
            />
            <div className={"w-[100%] container flex flex-col"}>
              <label style={{ color: "black" }} className="font-bold">
                Porcentaje
              </label>
              <input
                type="number"
                min={0}
                max={100}
                value={participacion.porcentaje_participacion}
                onChange={handleChangePercentage}
                className={
                  "padding-left border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] text-[black]"
                }
              />
              <div className="w-[100%] flex justify-center items-center h-[1rem]">
                {Number(participacion.porcentaje_participacion) > 100 && (
                  <p className="text-[#e74c3c] text-[0.9rem] w-[100%] mt-[0.5rem] text-center top-[100%]">
                    Estás excediendo el porcentaje disponible del fonograma.
                  </p>
                )}
              </div>
              <CustomButton type="submit">Continuar</CustomButton>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

const initialCountries = [
  { name: "Paraguay", iso: "PY", selected: true },
  { name: "Uruguay", iso: "UY", selected: true },
  { name: "Brasil", iso: "BR", selected: true },
  { name: "Guatemala", iso: "GT", selected: true },
  { name: "Costa Rica", iso: "CR", selected: true },
  { name: "El Salvador", iso: "SV", selected: true },
  { name: "Panamá", iso: "PA", selected: true },
  { name: "República Dominicana", iso: "DO", selected: true },
  { name: "España", iso: "ES", selected: true },
  { name: "India", iso: "IN", selected: true },
  { name: "Italia", iso: "IT", selected: true },
  { name: "Ucrania", iso: "UA", selected: true },
];

const EditTerritoriality: React.FC<{
  onSubmit: () => void;
}> = ({ onSubmit }) => {
  const dispatch = useAppDispatch();
  const createPhogramCurrentData = useAppSelector(
    (state) => state.createPhonogram
  );
  const [countries, setCountries] = useState(
    createPhogramCurrentData.territorios.length > 0
      ? initialCountries.map((c) => ({
          ...c,
          selected: createPhogramCurrentData.territorios.includes(c.iso)
            ? true
            : false,
        }))
      : initialCountries
  );

  const handleCheckboxChange = (iso: string) => {
    setCountries((prev) =>
      prev.map((country) =>
        country.iso === iso
          ? { ...country, selected: !country.selected }
          : country
      )
    );
  };

  const handleCheckAll = (checked: boolean) => {
    setCountries(countries.map((c) => ({ ...c, selected: checked })));
  };

  const handleSubmit = () => {
    const selectedISOs = countries.filter((c) => c.selected).map((c) => c.iso);
    dispatch(
      setCreatePhonogram({
        ...createPhogramCurrentData,
        territorios: selectedISOs,
      })
    );
    onSubmit();
  };

  return (
    <div className="w-full flex flex-col justify-center items-center mt-12 px-12">
      <div className="w-full flex justify-between items-center my-4 px-8">
        <CustomInput type="text" label="Buscar Países" />
        <CustomButton onClick={handleSubmit}>Continuar</CustomButton>
      </div>

      <CustomTable
        columnNames={[
          {
            name: "",
            isSortable: false,
            selectBox: true,
            onChecked: handleCheckAll,
          },
          { name: "PAÍS", isSortable: true },
          { name: "ISO", isSortable: true },
        ]}
        columnValues={countries.map((country) => [
          <input
            type="checkbox"
            checked={country.selected}
            onChange={() => handleCheckboxChange(country.iso)}
            className="w-4 h-4"
          />,
          country.name,
          country.iso,
        ])}
      />
    </div>
  );
};

const LoadAudio: FC<{
  audio: File | null;
  setAudio: Dispatch<SetStateAction<File | null>>;
  onSubmit: () => Promise<void>;
}> = ({ audio, setAudio, onSubmit }) => {
  const loadAudio = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length <= 0) {
      return;
    }
    if (!["mp3"].includes(e.target.files[0].name.split(".").at(-1) ?? "")) {
      toast.error("Por favor ingrese un archivo de audio.");
      return;
    }
    setAudio(e.target.files[0]);
  };

  const deleteAudio = () => {
    setAudio(null);
  };

  return (
    <div className="w-[100%] flex flex-col justify-center items-center mt-[3rem] pl-[3rem] pr-[3rem]">
      <p className="text-black font-bold">
        Seleccione el archivo de audio (opcional)
      </p>

      <div className="w-[60%] flex flex-col justify-center items-center gap-[0.8rem] mt-[0.5rem]">
        {audio ? (
          <div className="flex gap-[1rem]">
            <p className="text-black">{audio.name}</p>
            <button onClick={deleteAudio}>
              <RxCross2 color="#979797" size={15} />
            </button>
          </div>
        ) : (
          <button className="relative overflow-hidden p-[0.4rem] text-white cursor-pointer font-bold flex justify-center items-center bg-[#2ecc71] rounded-[0.3rem]">
            Seleccionar Audio
            <input
              onChange={loadAudio}
              className="absolute opacity-0 cursor-pointer w-[100%] h-[100%]"
              type="file"
            />
          </button>
        )}
        <CustomButton onClick={onSubmit} type="submit">
          Guardar y Finalizar
        </CustomButton>
      </div>
    </div>
  );
};

export default page;
