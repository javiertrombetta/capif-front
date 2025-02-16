"use client";
import { Form, Formik } from "formik";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
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
import { setCreatePhonogram } from "@/store/createPhonogramSlice";
import {
  createPhonogram,
  getPrefixIsrc,
  uploadPhonogramFile,
  validateISRC,
} from "@/services/repertoire";
import { isrcValidation } from "@/utils/formValidations";

function page() {
  const router = useRouter();
  const [isNewPhonogram, setIsNewPhonogram] = useState<boolean>(true);
  const [flowState, setFlowState] = useState<
    | "start"
    | "existing_phonogram"
    | "new_phonogram"
    | "load_audio"
    | "add_participation"
    | "edit_territoriality"
  >("start");
  const [audio, setAudio] = useState<File | null>(null);
  const authData = useAppSelector((state) => state.auth);
  const createPhonogramData = useAppSelector((state) => state.createPhonogram);
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

      case "edit_territoriality":
        setFlowState("add_participation");
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
      participaciones,
      territorios,
    } = createPhonogramData;

    if (
      territorios &&
      participaciones &&
      anio_lanzamiento &&
      duracion &&
      productora_id &&
      artista &&
      album &&
      titulo
    ) {
      const response = await createPhonogram({
        ...createPhonogramData,
        codigo_designacion: "00001",
      });
      return response;
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
      await sendPhonogramFile(phonogram.id_fonograma as string);
      toast.success("¡Fonograma creado correctamente!");
      router.push("/repertoires");
    } catch (error: unknown) {
      console.log(error);
      toast.error(`${error}`);
    }
  };

  return (
    <CustomLayout>
      <Header title="Declaración de Repertorio" />

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

            {isNewPhonogram && (
              <>
                <p
                  className={`${flowState === "load_audio" ? "text-black" : "text-[#a6acaf]"} font-bold`}
                >
                  Cargar Audio
                </p>
              </>
            )}
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
          setExisting={() => {
            setFlowState("existing_phonogram");
            setIsNewPhonogram(false);
          }}
          setNew={() => {
            setFlowState("new_phonogram");
            setIsNewPhonogram(true);
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

      {flowState === "existing_phonogram" && (
        <ExistingPhonogram
          onSubmit={() => {
            setFlowState("add_participation");
          }}
        />
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

const SearchForISRC: FC<{ setExisting: () => void; setNew: () => void }> = ({
  setExisting,
  setNew,
}) => {
  const [prefixIsrc, setPrefixIsrc] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const createPhogramCurrentData = useAppSelector(
    (state) => state.createPhonogram
  );

  const handleGetPrefixIsrc = async () => {
    const prefix = await getPrefixIsrc();
    setPrefixIsrc(prefix.data);
  };
  const initialValues = {
    ISRC: "",
  };

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    values: { ISRC: string }
  ) => {
    e.preventDefault();

    const available = await validateISRC(`${prefixIsrc}${values.ISRC}`);
    if (available) {
      setNew();
    } else {
      setExisting();
    }
    dispatch(
      setCreatePhonogram({
        ...createPhogramCurrentData,
        codigo_designacion: values.ISRC,
      })
    );
  };

  useEffect(() => {
    handleGetPrefixIsrc();
  }, []);

  return (
    <div className="w-[100%] h-[20%] flex flex-col justify-center items-center mt-[3rem] pl-[3rem] pr-[3rem]">
      <p className="text-black font-bold">Ingresa el ISRC del fonograma.</p>
      {prefixIsrc ? (
        <Formik
          onSubmit={() => {}}
          validationSchema={isrcValidation}
          initialValues={initialValues}
        >
          {({ isSubmitting, isValid, dirty, values }) => (
            <Form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                onSubmit(e, values)
              }
              className="w-[60%] flex flex-col justify-center items-center"
            >
              <div className="mt-[2rem] flex items-start gap-[0.5rem]">
                <p className="text-black text-[1.3rem] font-bold">
                  {prefixIsrc}
                </p>
                <CustomField
                  width="w-[10rem]"
                  type="text"
                  id="ISRC"
                  name="ISRC"
                />
              </div>
              {isSubmitting || !isValid || !dirty ? (
                <CustomButton
                  type="submit"
                  background="disabled"
                  disabled={isSubmitting || !isValid || !dirty}
                >
                  Buscar ISRC
                </CustomButton>
              ) : (
                <CustomButton type="submit">Buscar ISRC</CustomButton>
              )}
            </Form>
          )}
        </Formik>
      ) : null}
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
    titulo: "",
    artista: "",
    album: "",
    productor_originario: authData.productoraActiva?.productora || "",
    sello_discografico: "",
    año_lanzamiento: "",
    registro_desde: "",
    registro_hasta: "",
  };

  const [year, setYear] = useState("");
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

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    values: {
      titulo: string;
      artista: string;
      album: string;
      año_lanzamiento: string;
      sello_discografico: string;
    }
  ) => {
    e.preventDefault();
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
      <Formik onSubmit={() => {}} initialValues={initialValues}>
        {({ isSubmitting, isValid, dirty, values }) => (
          <Form
            onSubmit={(e) =>
              handleSubmit(e, {
                titulo: values.titulo,
                artista: values.artista,
                album: values.album,
                año_lanzamiento: values.año_lanzamiento as string,
                sello_discografico: values.sello_discografico,
              })
            }
            className="w-[60%] flex flex-col justify-center items-center mb-[2rem]"
          >
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
              <TimerInput onChange={handleTime} />
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
              labelText="Sello Discográfico"
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

const LoadAudio: FC<{
  audio: File | null;
  setAudio: Dispatch<SetStateAction<File | null>>;
  onSubmit: () => Promise<void>;
}> = ({ audio, setAudio, onSubmit }) => {
  const loadAudio = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAudio(e.target.files[0]);
    }
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

const AddParticipation: FC<{ onSubmit: () => void }> = ({ onSubmit }) => {
  const authData = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const createPhogramCurrentData = useAppSelector(
    (state) => state.createPhonogram
  );
  const year = new Date().getFullYear();
  const initialValues: {
    cuit_productora: string;
    porcentaje_participacion: number | string;
    fecha_participacion_inicio: string;
    fecha_participacion_hasta: string;
  } = {
    cuit_productora: authData.productoraActiva?.cuit_cuil || "",
    porcentaje_participacion: "",
    fecha_participacion_inicio: `${year}-01-01`,
    fecha_participacion_hasta: "2099-12-31",
  };

  const [participacion, setParticipacion] =
    useState<typeof initialValues>(initialValues);
  const [participaciones, setParticipaciones] = useState<
    Array<typeof initialValues>
  >([]);

  const handleChangePercentage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseInt(e.target.value ? e.target.value : "0");

    if (inputValue <= 100) {
      setParticipacion({
        ...participacion,
        porcentaje_participacion: inputValue || "",
      });
    }
  };

  const handleSubmit = () => {
    if (participaciones.length > 0) {
      const titulares = participaciones.map((participacion) => {
        return {
          cuit: participacion.cuit_productora,
          porcentaje_participacion: Number(
            participacion.porcentaje_participacion
          ),
          fecha_inicio: participacion.fecha_participacion_inicio,
          fecha_hasta: participacion.fecha_participacion_hasta,
        };
      });

      dispatch(
        setCreatePhonogram({
          ...createPhogramCurrentData,
          participaciones: titulares,
        })
      );

      onSubmit();
    }
  };
  /*
  const handleSetCuitCuilCompany = () => {
    setParticipacion({
      ...participacion,
      cuit_productora: authData.productoraActiva?.cuit_cuil || "",
    });
  };

  useEffect(() => {
    handleSetCuitCuilCompany();
  }, []);
*/

  return (
    <div className="w-[100%] flex flex-col justify-center items-center mt-[3rem] pl-[3rem] pr-[3rem]">
      <p className="text-black font-bold text-[1.3rem]">Agregar Titulares</p>
      <div className="w-[100%] flex flex-row justify-center items-end space-x-3 py-[1rem]">
        <div className={" w-[100%] flex flex-col"}>
          <label style={{ color: "black" }} className="font-bold">
            CUIT Productora
          </label>

          <input
            value={participacion.cuit_productora}
            onChange={(e) =>
              setParticipacion({
                ...participacion,
                cuit_productora: e.target.value,
              })
            }
            type="text"
            id="nombre_productora"
            name="nombre_productora"
            className={
              "padding-left border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] text-[black]"
            }
          />
        </div>
        <div className={" w-[100%] flex flex-col"}>
          <label style={{ color: "black" }} className="font-bold">
            Fecha Inicio de Titularidad
          </label>

          <input
            value={participacion.fecha_participacion_inicio}
            onChange={(e) =>
              setParticipacion({
                ...participacion,
                fecha_participacion_inicio: e.target.value,
              })
            }
            type="date"
            id="fecha_participacion_inicio"
            name="fecha_participacion_inicio"
            className={
              "padding-left border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] text-[black]"
            }
          />
        </div>
        <div className={" w-[100%] flex flex-col"}>
          <label style={{ color: "black" }} className="font-bold">
            Fecha Hasta de Titularidad
          </label>

          <input
            value={participacion.fecha_participacion_hasta}
            onChange={(e) =>
              setParticipacion({
                ...participacion,
                fecha_participacion_hasta: e.target.value,
              })
            }
            type="date"
            id="fecha_participacion_hasta"
            name="fecha_participacion_hasta"
            className={
              "padding-left border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] text-[black]"
            }
          />
        </div>
        <div className={"w-[100%] flex flex-col"}>
          <label style={{ color: "black" }} className="font-bold">
            Porcentaje de Titularidad
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
        </div>
        <CustomButton
          onClick={() =>
            setParticipaciones([...participaciones, participacion])
          }
        >
          Agregar
        </CustomButton>
      </div>
      <div className="w-[100%] my-[1rem]">
        <CustomTable
          columnNames={[
            { name: "CUIT", isSortable: true },
            { name: "PORCENTAJE", isSortable: true },
            { name: "REGISTRO DESDE", isSortable: true },
            { name: "REGISTRO HASTA", isSortable: true },
          ]}
          columnValues={participaciones.map((p) => [
            p.cuit_productora,
            p.porcentaje_participacion,
            p.fecha_participacion_inicio,
            p.fecha_participacion_hasta,
          ])}
        />
      </div>
      <CustomButton onClick={() => handleSubmit()} type="button">
        Continuar
      </CustomButton>
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
  const [countries, setCountries] = useState(initialCountries);

  const handleCheckboxChange = (iso: string) => {
    setCountries((prev) =>
      prev.map((country) =>
        country.iso === iso
          ? { ...country, selected: !country.selected }
          : country
      )
    );
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
          { name: "", isSortable: false, selectBox: true },
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

export default page;
