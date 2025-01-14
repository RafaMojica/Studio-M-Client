import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { Arrow, ArrowBack, Download, Share } from "@/common/Icons";
import Border from "@/common/Border";
import IconButton from "@/common/IconButton";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
const MyCertificates = ({ decodedToken }) => {
  //estados para mostrar el arreglo de certificados y contar la paginacion
  const [userCertificates, setUserCertificates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  //configuracion para la paginacion
  //con el window.innerWidth determinamos el tamaño de la pantalla para mostrar 3 o 2 certificados dependiendo del modo
  const certificatesPerPage = window.innerWidth < 768 ? 3 : 2;
  const totalPages = Math.ceil(userCertificates.length / certificatesPerPage);
  const startIndex = (currentPage - 1) * certificatesPerPage;
  const endIndex = startIndex + certificatesPerPage;
  const { certificates } = useSelector((state) => state.myAccount);

  useEffect(() => {
    setUserCertificates(certificates);
  }, [certificates]);

  const handlePDFdownload = (userId, courseId) => {
    const pdfPath = `${process.env.NEXT_PUBLIC_API_URL}/api/user/certificate/download/${userId}/${courseId}`;

    window.open(pdfPath, "_blank");
  };

  return (
    <>
      {/*modo desktop*/}
      {userCertificates.length == 0 ? (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="h-[380px] flex justify-center items-center"
        >
          <p className="text-xl md:text-2xl font-ms-gothic">
            Aún no tienes certificados
          </p>
        </motion.div>
      ) : (
        <>
          {/*modo mobile*/}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className=" py-12 md:hidden"
          >
            {userCertificates
              .slice(startIndex, endIndex)
              .map((userCertificate, index) => (
                <div className="flex justify-center py-4" key={index}>
                  <Border className="border-pink border-2 w-[70%] max-w-[19rem]">
                    <div className="flex items-center w-full">
                      <div className="w-[70%] flex flex-col items-center border-r-2 border-solid border-pink">
                        <h2 className=" font-mystery-mixed text-3xl">
                          {userCertificate.courseShortTitle}
                        </h2>
                        <h3 className=" font-ms-gothic text-sm">
                          {userCertificate.createdAt.slice(0, 10)}
                        </h3>
                      </div>
                      <div className="w-[30%] flex justify-center flex-col gap-1">
                        <IconButton
                          onClick={() =>
                            handlePDFdownload(
                              decodedToken._id,
                              userCertificate.courseId
                            )
                          }
                        >
                          <Download />
                        </IconButton>
                        <IconButton>
                          <Share />
                        </IconButton>
                      </div>
                    </div>
                  </Border>
                </div>
              ))}
            <div className="flex flex-row gap-2 mt-4 items-center justify-end mr-[15%]">
              &nbsp; {currentPage} de {totalPages}
              <button
                onClick={() =>
                  setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
                }
                disabled={currentPage === 1}
              >
                <ArrowBack color={currentPage === 1 ? "lightGrey" : "black"} />
              </button>
              <button
                onClick={() =>
                  setCurrentPage((prevPage) =>
                    Math.min(prevPage + 1, totalPages)
                  )
                }
                disabled={currentPage === totalPages}
              >
                <Arrow
                  color={currentPage === totalPages ? "lightGrey" : "black"}
                />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden md:flex md:flex-col md:justify-center items-center"
          >
            {userCertificates
              .slice(startIndex, endIndex)
              .map((userCertificate, index) => (
                <div className="relative" key={index}>
                  <Image
                    src="/img/paper-background.png"
                    width={900}
                    height={900}
                    alt="Picture"
                    className="mt-3"
                  />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-[70%]">
                    {" "}
                    {/*pt-8 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center */}
                    <div className="flex flex-col align-center items-center my-2 gap-y-1">
                      <h2 className="text-[20px] font-mystery-mixed mb-1 lg:text-[24px]">
                        Certificado
                      </h2>
                      <h3 className="text-2xl font-mystery-mixed lg:text-3xl">
                        {userCertificate.courseLongTitle}
                      </h3>
                      <p className="text-sm font-ms-gothic lg:text-base">
                        {userCertificate.name + " " + userCertificate.lastname}
                      </p>
                      <p className="text-sm font-ms-gothic lg:text-base">
                        {userCertificate.dni}
                      </p>
                      <p className="text-sm font-ms-gothic mb-2 mt-2 lg:text-base">
                        {userCertificate.description}
                      </p>
                      <p className="text-sm font-ms-gothic lg:text-base">
                        {userCertificate.createdAt.slice(0, 10)}
                      </p>
                      <div className="flex flex-row justify-around align-center items-center w-full">
                        <div>
                          <h3 className=" font-mystery-mixed text-[18px] lg:text-[22px]">
                            Studio by M
                          </h3>
                        </div>
                        <div className="flex flex-col items-center align-center">
                          <Image
                            src="/img/firma.png"
                            width={100}
                            height={100}
                            alt="Signature"
                            className="w-[35px] h-[60px] lg:w-[39px] lg:h-[64px]"
                          />
                          <div className="">
                            <h4 className=" font-ms-gothic text-xs text-center lg:text-sm ">
                              Macarena <br />
                              Bernal
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-16 right-10">
                    <div className="flex flex-col gap-1">
                      <IconButton
                        onClick={() =>
                          handlePDFdownload(
                            decodedToken._id,
                            userCertificate.courseId
                          )
                        }
                      >
                        <Download />
                      </IconButton>
                      <IconButton>
                        <Share />
                      </IconButton>
                    </div>
                  </div>
                </div>
              ))}
            <div className="w-full flex flex-row gap-2 mt-4 mb-4 items-center justify-end mr-[15%]">
              &nbsp; {currentPage} de {totalPages}
              <button
                onClick={() =>
                  setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
                }
                disabled={currentPage === 1}
              >
                <ArrowBack color={currentPage === 1 ? "lightGrey" : "black"} />
              </button>
              <button
                onClick={() =>
                  setCurrentPage((prevPage) =>
                    Math.min(prevPage + 1, totalPages)
                  )
                }
                disabled={currentPage === totalPages}
              >
                <Arrow
                  color={currentPage === totalPages ? "lightGrey" : "black"}
                />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
};

export default MyCertificates;
