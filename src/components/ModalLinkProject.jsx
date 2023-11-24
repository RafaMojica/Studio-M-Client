"use client";

import Border from "@/common/Border";
import Button from "@/common/Button";
import { useMediaQuery } from "@react-hook/media-query";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useRef, useEffect, useState } from "react";

export default function ModalLinkProject({ status, closeModal, courseId }) {
  const dialofRef = useRef(null);
  const [link, setLink] = useState("");
  const [showThanksModal, setShowThanksModal] = useState(false);
  const isMdBreakpoint = useMediaQuery("(min-width: 768px)");
  const userToken = sessionStorage.getItem("token");
  const { mail } = jwtDecode(userToken);

  const handleInputLink = (event) => {
    event.preventDefault();
    setLink(event.target.value);
  };

  const handleModalContentClick = (event) => {
    event.stopPropagation();
  };

  const handleButtonClick = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/project//addProject/${courseId}`,
        { project_url: link, mail }
      );
      setShowThanksModal(true);
    } catch (error) {
      console.error("Error al entregar el link:", error);
    }
  };

  const handleThanksModalClose = () => {
    setShowThanksModal(false);
    closeModal(); // Cerrar el modal principal después de cerrar el modal de agradecimiento
  };

  useEffect(() => {
    if (status) {
      dialofRef.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialofRef.current?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [status]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        status &&
        dialofRef.current &&
        !dialofRef.current.contains(event.target)
      ) {
        console.log("Cerrando modal con click por fuera");
        closeModal();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [status, closeModal]);

  return (
    <>
      {status && !showThanksModal && (
        <div
          onClick={() => closeModal()}
          className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div
            onClick={(event) => handleModalContentClick(event)}
            className="flex items-center justify-center w-[80%] h-[27%] border-[2px] border-dashed border-purple rounded-md
        min-[560px]:w-[90%] min-[560px]:h-[35%]
        md:w-[90%] md:h-[50%]
        lg:w-[90%] lg:h-[90%]"
          >
            <div className="flex flex-col justify-center items-center bg-[url(../../public/img/background.png)] bg-no-repeat bg-cover bg-center w-[97%] h-[97%] md:justify-normal md:pt-5 lg:justify-center min-[820]:justify-center">
              <h2
                className=" py-1 font-mystery-mixed text-white text-xl min-[390px]:text-2xl min-[390px]:pb-3
              min-[560px]:text-4xl md:text-5xl md:pb-7 md:pt-9 min-[820px]:pt-16 lg:text-6xl lg:py-10 xl:text-7xl
              "
              >
                Link de Entrega
              </h2>
              <p className="pb-3 font-ms-gothic text-[10px] text-white px-3 text-center min-[390px]:text-xs min-[390px]:pb-4 min-[560px]:text-lg min-[560px]:leading-6  min-[560px]:pb-4 md:text-2xl md:w-[87%] lg:text-4xl lg:w-[95%] lg:px-3 lg:pb-8 xl:w-[85%] xl:pb-10">
                El proyecto debe presentarse con un link de behance, drive (pdf)
                o a la presentación realizada en figma
              </p>

              <form onSubmit={handleButtonClick} className="w-[75%] md:w-[80%]">
                {isMdBreakpoint ? (
                  <div className="flex flex-col justify-start items-start pb-2 ">
                    <h3 className=" font-mystery-mixed text-white text-start text-3xl lg:text-4xl">
                      Link
                    </h3>
                  </div>
                ) : null}
                <div className="flex flex-col justify-center items-center">
                  <input
                    onChange={handleInputLink}
                    type="text"
                    value={link}
                    className=" bg-lightGrey w-[100%] h-[18px] md:h-10 lg:h-12"
                  ></input>
                </div>
              </form>
              <div className="pt-2 flex items-center justify-center w-full min-[390px]:pt-4 md:pt-7">
                <Border
                  className="flex flex-col justify-center items-center w-[120px] h-[25px] border-[1px] border-pink md:w-[300px] md:h-[55px] lg:h-[60px] 
                "
                >
                  <Button
                    onClick={handleButtonClick}
                    className=" w-[95%] h-[80%] text-center text-sm font-mystery-mixed md:text-3xl"
                  >
                    {isMdBreakpoint ? "Entregar Proyecto" : "Entregar"}
                  </Button>
                </Border>
              </div>
            </div>
          </div>
        </div>
      )}

      {showThanksModal && (
        <div
          onClick={handleThanksModalClose}
          className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div
            className="flex items-center justify-center w-[80%] h-[27%] border-[2px] border-dashed border-purple rounded-md
        min-[560px]:w-[90%] min-[560px]:h-[35%]
        md:w-[90%] md:h-[40%]
        lg:w-[90%] lg:h-[90%]"
          >
            <div className="flex flex-col justify-center items-center bg-[url(../../public/img/background.png)] bg-no-repeat bg-cover bg-center w-[97%] h-[97%]">
              <h2 className="py-2 font-mystery-mixed text-white text-lg min-[390px]:text-2xl min-[390px]:pb-12 md:text-5xl lg:text-6xl">
                ¡Gracias por tu entrega!
              </h2>
              <p className="pb-3 font-ms-gothic text-xs font-light text-white text-center w-[80%] leading-3 min-[390px]:text-sm min-[390px]:leading-3  md:text-3xl md:pt-8 lg:text-4xl">
                Recibirás la corrección en hasta 7 días hábiles. Cuando este la
                corrección aprobada se habilitará el certificado en la sección
                “Mi cuenta”
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
