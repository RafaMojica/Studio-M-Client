"use client";

import Button from "@/common/Button";
import Input from "@/common/Input";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../state/features/authSlice";
import useInput from "@/hooks/useInput";

export default function Login() {
  const userInfo = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [messageAlert, setmessageAlert] = useState("");
  const [messageAlertOk, setmessageAlertOk] = useState("");

  const {
    OnChange: OnChangeMail,
    value: valueMail,
    blur: BlurMail,
    focus: FocusMail,
    message: MessageMail,
  } = useInput("mail");

  const {
    OnChange: OnChangePassword,
    value: valuePassword,
    blur: BlurPassword,
    focus: FocusPassword,
    message: MessagePassword,
  } = useInput("passwordLogin");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    //Verificacion campos de los input
    if (valueMail.trim() == "" || valuePassword.trim() == "") {
      setmessageAlert("¡Completar todos los campos!");
      setTimeout(() => {
        setmessageAlert("");
      }, 1300);
    } else {
      //Verificacion campos de los mensajes de error
      if (MessageMail || MessagePassword) {
        setmessageAlert("¡Verificar campos!");
        setTimeout(() => {
          setmessageAlert("");
        }, 1300);
      } else {
        //Registro de usuario
        try {
          await axios
            .post(
              "http://localhost:8081/api/user/login",
              {
                mail: valueMail,
                password: valuePassword,
              },
              { withCredentials: true }
            )
            .then((res) => res.data)
            .then((user) => {
              dispatch(
                setCredentials({
                  dni: user.dni,
                  name: user.name,
                  lastname: user.lastname,
                  mail: user.mail,
                })
              );
              setmessageAlert("");
              setmessageAlertOk("¡Bienvenido!");
              router.push("/");
            });
        } catch (error) {
          console.error(error);
          setmessageAlert("Error en el login");
          setTimeout(() => {
            setmessageAlert("");
          }, 1300);
        }
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-[#fff] py-[115px]">
      <h2 className="font-mystery-mixed text-[35px] min-[320px]:text-[45px] sm:text-[55px] leading-3">
        Iniciar sesión
      </h2>
      <form
        onSubmit={onSubmitForm}
        className="
            mt-[50px] 
            w-[80%] 
            min-[450px]:max-w-[350px]
            sm:max-w-[450px] 
            "
      >
        <div
          className="
        mb-4 
        w-[100%] 
        sm:px-3
        flex-col
        justify-center
        items-center"
        >
          <Input
            label={"Mail"}
            name={"mail"}
            classNameLabel={"block text-[23px]"}
            type={"text"}
            className={"w-full sm:max-w-[85%]"}
            classNameInput={`p-[5px] outline-none w-[100%] h-[40px] rounded-[3px] bg-black/20`}
            placeholder={"ingresa tu mail"}
            onFocus={FocusMail}
            value={valueMail}
            onChange={OnChangeMail}
            onBlur={BlurMail}
          />
          <div className="h-[.5rem]">
            {MessageMail && (
              <p className="text-red text-[.9rem] leading-3">{MessageMail}</p>
            )}
          </div>
        </div>
        <div
          className="
        mb-4 
        w-[100%] 
        sm:px-3
        flex-col
        justify-center
        items-center"
        >
          <Input
            label={"Contraseña"}
            name={"password"}
            classNameLabel={"text-[23px]"}
            type={"password"}
            className={"w-full sm:max-w-[85%]"}
            classNameInput={`p-[5px] outline-none w-[100%] h-[40px] rounded-[3px] bg-black/20`}
            placeholder={"ingresa tu contraseña"}
            value={valuePassword}
            onFocus={FocusPassword}
            onChange={OnChangePassword}
            onBlur={BlurPassword}
          />
          <div className="h-[.5rem]">
            {MessagePassword && (
              <p className="text-red text-[.9rem] leading-3">
                {MessagePassword}
              </p>
            )}
          </div>
        </div>

        <div
          className="
        flex
        flex-col 
        justify-center 
        items-center 
        mt-[60px]"
        >
          <div className="h-[.5rem] mb-[1.2rem]">
            {messageAlert ? (
              <p className="text-red text-[1rem] leading-3">{messageAlert}</p>
            ) : (
              <p className="text-darkGreen text-[1rem] leading-3">
                {messageAlertOk}
              </p>
            )}
          </div>

          <Button
            className={`bg-black 
          text-white 
          py-[16px] 
          px-[55px] 
          rounded-[5px] 
          leading-3 
          text-[19px]
          block
          sm:w-[13rem]
          md:w-[14rem]`}
          >
            Confirmar
          </Button>
        </div>
        <div
          className="
        flex 
        text-black 
        gap-x-3 
        justify-center 
        items-center 
        mt-3 
        flex-col
        sm:text-[17px] 
        sm:flex-row"
        >
          <p>¿No tenés cuenta?</p>
          <a href="#" className="underline">
            Registrate
          </a>
        </div>
      </form>
    </div>
  );
}
