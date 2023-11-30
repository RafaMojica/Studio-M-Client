"use client";

import React from "react";

import { UilArrow1, UilArrow2 } from "@/common/Icons";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export default function ActiveUsers() {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 10;
  const totalPages = Math.ceil(users.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/adminCourse/all-courses`)
      .then((res) => {
        const courses = res.data;
        setCourses(courses);
      })
      .catch((error) => {
        console.error("Error getting courses:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/adminUser/allUsers`)
      .then((res) => {
        const users = res.data;
        setUsers(users);
      })
      .catch((error) => {
        console.error("Error getting users:", error);
      });
  }, []);

  const calculateTotalUsersPerCourse = (userId) => {
    const user = users.find((user) => user._id === userId);
    if (!user || user.course.length === 0) {
      return "";
    }

    const courseNames = user.course.map((course) => {
      const matchingCourse = courses.find((c) => c._id === course.courseId);
      return matchingCourse
        ? matchingCourse.courseShortTitle
        : "Course not found";
    });
    return courseNames.join(", ");
  };

  const handleCourseSelection = (userId, selectedCourse) => {
    // Copia del array de usuarios para no modificar el estado directamente
    const updatedUsers = [...users];
    // Encuentra el usuario correspondiente
    const selectedUser = updatedUsers.find((user) => user._id === userId);
    // Actualiza la información del curso seleccionado para el usuario
    selectedUser.course = [
      {
        courseId: courses.find(
          (course) => course.courseShortTitle === selectedCourse
        )?._id,
      },
    ];
    // Actualiza el estado local de los usuarios
    setUsers(updatedUsers);
  };

  return (
    <section className="my-20 mb-60">
      <h2 className="text-4xl md:text-5xl xl:text-6xl font-mystery-mixed mt-10 mb-10 md:mb-15 xl:mb-20 text-center flex justify-center">
        Usuarios activos
      </h2>
      <div className="flex justify-center px-4 font-ms-gothic md:ml-10 xl:ml-10 md:mr-10 xl:mr-10 ">
        <table className="w-full xl:table-fixed">
          <thead className="max-sm:hidden">
            <tr className="w-full md:w-[740px] xl:w-[1211px] h-[48px] border-b-[0.5px] md:border-l-[0.5px] border-lightGrey  md:border-r-[0.5px] rounded-t-lg text-[#757575] border-t-[0.05px]">
              <td className="p-4">Nombre completo</td>
              <td>&nbsp;</td>
              <td className="sm:pr-10 md:pr-10">Documento</td>
              <td>&nbsp;</td>
              <td className="sm:pr-10 md:pr-10">Cursos comprados</td>
            </tr>
          </thead>
          <tbody>
            {users?.slice(startIndex, endIndex).map((user) => (
              <tr
                key={user._id}
                className="w-full md:w-[740px] xl:w-[1211px] h-[48px] border-b-[0.5px] md:border-l-[0.5px] border-lightGrey md:border-r-[0.5px] "
              >
                <td className="p-4">{user.name + " " + user.lastname}</td>
                <td>&nbsp;</td>
                <td>{user.dni.toLocaleString().replace(/,/g, ".")}</td>
                <td>&nbsp;</td>
                <td>
                  <select
                    value={calculateTotalUsersPerCourse(user._id)}
                    onChange={(e) =>
                      handleCourseSelection(user._id, e.target.value)
                    }
                  >
                    <option value="">Ver curso</option>
                    {user.course.map((userCourse) => {
                      const matchingCourse = courses.find(
                        (course) => course._id === userCourse.courseId
                      );
                      return matchingCourse ? (
                        <option
                          key={matchingCourse._id}
                          value={matchingCourse.courseShortTitle}
                        >
                          {matchingCourse.courseShortTitle}
                        </option>
                      ) : null;
                    })}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="w-full md:w-[740px] xl:w-[1211px] h-[48px] max-sm:hidden border-t-[0.5px] border-lightGrey shadow-xl md:border-r-[0.5px] md:border-l-[0.5px] rounded-b-lg">
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>Filas por página</td>
              <td className="flex justify-between mt-3">
                &nbsp; {currentPage} de {totalPages}
                <button
                  onClick={() =>
                    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  <UilArrow1
                    color={currentPage === 1 ? "lightGrey" : "black"}
                  />
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((prevPage) =>
                      Math.min(prevPage + 1, totalPages)
                    )
                  }
                  disabled={currentPage === totalPages}
                >
                  <UilArrow2
                    color={currentPage === totalPages ? "lightGrey" : "black"}
                  />
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}
