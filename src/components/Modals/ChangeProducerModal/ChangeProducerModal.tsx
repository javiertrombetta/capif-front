import { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { selectProductionCompany } from "@/services/auth";
import { getProducerById } from "@/services/producers";
import { setAuthData } from "@/store/authSlice";
import useModal from "@/hooks/useModal";

export const ChangeProducerModal = () => {
  const dispatch = useAppDispatch();
  const authData = useAppSelector((state) => state.auth);
  const { closeModal } = useModal();

  const selectProductora = async (element: {
    id: string;
    productora: string;
  }) => {
    try {
      await selectProductionCompany(element.id);
      const company = await getProducerById(element.id);
      const productionCompany = { ...element, cuit_cuil: company.cuit_cuil };
      if (window && window.localStorage) {
        localStorage.setItem("company", JSON.stringify(productionCompany));
      }
      dispatch(
        setAuthData({ ...authData, productoraActiva: productionCompany })
      );
    } catch (error) {
      console.log(error);
    } finally {
      closeModal();
    }
  };

  useEffect(() => {
    if (
      authData.productoras &&
      authData.id_usuario &&
      !authData.productoras[0].id
    ) {
      console.log("Cerrando");
      closeModal();
    }
  }, [authData]);

  return (
    <div className="relative bg-white h-[13rem] w-[30rem] mb-[6rem] rounded-[2rem] gap-[0.5rem] flex flex-col justify-center items-center">
      <button onClick={closeModal} className="absolute top-[5%] right-[5%]">
        <IoClose size={25} color="black" />
      </button>

      <p className="text-black font-bold text-[1.2rem] text-center w-[95%]">
        Selecciona una productora.
      </p>
      {authData.productoras && authData.productoras.length > 0
        ? authData.productoras.map((element, index) => (
            <div
              key={index}
              className="w-[100%] cursor-pointer"
              onClick={() => selectProductora(element)}
            >
              <p className="text-center text-black hover:bg-[#d8d8d8]">
                {element.productora}
              </p>
            </div>
          ))
        : null}
    </div>
  );
};
