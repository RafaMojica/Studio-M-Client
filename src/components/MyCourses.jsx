import React, { useEffect, useState } from "react";
import Link from "next/link";
import Cards from "./Cards";
import IconButton from "@/common/IconButton";
import { ArrowBlack1, ArrowBlack2 } from "@/common/Icons";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const MyCourses = ({ decodedToken, arrCourses }) => {
  const [userCourses, setUserCourses] = useState([]);
  const [startCourse, setStartCourse] = useState(0);
  const cardsPerPage = 3;
  const { coursesUser } = useSelector((state) => state.myAccount);

  useEffect(() => {
    setUserCourses(coursesUser);
  }, [coursesUser]);

  const handlePrevPage = () => {
    if (startCourse > 0) {
      setStartCourse(startCourse - 1);
    }
  };

  const handleNextPage = () => {
    if (startCourse < userCourses.length - 1) {
      setStartCourse(startCourse + 1);
    }
  };

  return (
    <>
      {coursesUser?.length == 0 ? (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="h-[380px] flex justify-center items-center"
        >
          <p className="text-xl font-ms-gothic md:text-2xl">
            Aún no tienes cursos comprados
          </p>
        </motion.div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className={`py-14 flex overflow-x-auto md:bg-center md:h-[400px] items-center md:mx-[1%] lg:mx-[8%] xl:mx-[11%]`}
          >
            <div className="w-70 ml-6 mr-4 md:w-72 md:ml-6 md:mr-6 flex flex-row">
              <div className="flex items-center space-x-4 md:space-x-8 lg:space-x-11 xl:space-x-15 lg:ml-6 ">
                {userCourses
                  ?.slice(startCourse, startCourse + cardsPerPage)
                  .map((userCourse, index) => (
                    <div
                      key={index}
                      className="flex justify-center items-center"
                    >
                      <Link href={`/my-account/${userCourse.courseInfo._id}`}>
                        <Cards
                          title={userCourse.courseInfo.courseShortTitle}
                          buttonTitle={userCourse.progress + "%"}
                          progressBar={userCourse.progress.toString()}
                          img={userCourse.courseInfo.courseImg_url}
                          className="min-w-[12.5rem] max-w-[12.5rem] h-[15rem] max-h-[15rem]"
                          classNameButton="py-1 px-0.5 text-lg flex items-center flex-col"
                          classNameImg="h-[12rem] object-cover rounded-b-lg"
                          className2="h-full"
                          classNameBorder="h-14 mb-2"
                        />
                      </Link>
                    </div>
                  ))}
                {userCourses.length > cardsPerPage && (
                  <div className="hidden xl:flex bg-pink">
                    <IconButton
                      className="absolute left-0 ml-[20%]"
                      onClick={handlePrevPage}
                    >
                      <ArrowBlack1 />
                    </IconButton>
                    <IconButton
                      className="absolute right-50"
                      onClick={handleNextPage}
                    >
                      <ArrowBlack2 />
                    </IconButton>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
};

export default MyCourses;
