export const Footer = () => {
  return (
    <div
      className="
    bg-[url('/Fondo.png')]
    sm:bg-[url('/Fondo_3.png')] 
    bg-no-repeat 
    w-full 
    h-full
    text-center 
    bg-cover 
    bg-center 
    "
    >
      <div
        className="
        relative
        grid
        grid-cols-1 
        sm:grid-cols-2
        sm:py-[100px]
        lg:py-[130px] 
        max-w-[80rem]
        place-content-center
        mx-auto     
        "
      >
        <h2
          className="
        font-mystery-mixed 
        text-white 
        mt-[90px] 
        text-[45px] 
        sm:text-[100px] 
        sm:text-left 
        sm:ml-[110px] 
        sm:flex 
        sm:flex-col 
        sm:items-start 
        sm:justify-center 
        sm:mt-0 
        sm:mb-0 
        sm:leading-none"
        >
          Studio by M
        </h2>
        <p
          className="
        font-ms-gothic 
        text-white 
        text-[16px] 
        text-left 
        leading-[20px] 
        mt-6 
        mx-[40px] 
        sm:text-[34px] 
        sm:leading-10  
        sm:ml-[110px] 
        sm:tracking-[-2.9px] 
        sm:w-[85%] 
        sm:col-start-1 
        sm:row-start-2 
        sm:mt-[90px]
        "
        >
          Soy Macarena Bernal. Me defino como una apasionada docente,
          desarrolladora Fullstack y diseñadora UX/UI. Mi camino en el mundo de
          la tecnología me ha permitido fusionar mi amor por la enseñanza con la
          creación de experiencias digitales accesibles y atractivas.
        </p>

        <h2
          className="
        font-mystery-mixed 
        text-white 
        text-[35px] 
        mt-[45px] 
        mb-[17px] 
        sm:text-[80px]  
        sm:col-start-2 
        sm:row-start-1 
        sm:flex 
        sm:flex-col 
        sm:items-center 
        sm:justify-center 
        sm:mt-0 
        sm:mb-0 
        sm:leading-none"
        >
          Contacto
        </h2>
        <div
          className="
        w-full 
        max-w-[250px] 
        h-auto 
        mx-auto 
        grid 
        place-items-center 
        grid-cols-2 
        mb-[30px] 
        sm:mt-0 
        sm:col-start-2 
        sm:row-start-2 
        sm:h-[200px]"
        >
          <div
            className="
          bg-[url('/behance.png')] 
          bg-no-repeat 
          w-[99px]
          h-[108px]
          md:w-[137px]
          md:h-[149px]
          bg-contain
          -mr-[1px]
          "
          ></div>
          <div
            className="
          bg-[url('/instagram.png')] 
          bg-no-repeat 
          w-[122px]
          h-[118px]
          md:bg-[url('/github.png')]
          md:w-[149px]
          md:h-[143px]
          md:ml-[50px]
          md:mt-[50px]
          bg-contain
          mt-[17px]
          ml-[10px]
          "
          ></div>
          <div
            className="
          bg-[url('/github.png')] 
          bg-no-repeat 
          w-[113px]
          h-[108px]
          md:bg-[url('/instagram.png')]
          md:w-[135px]
          md:h-[130px]
          bg-contain
          mr-[12px]
          "
          ></div>
          <div
            className="
          bg-[url('/wpp.png')] 
          bg-no-repeat 
          w-[127px]
          h-[119px]
          md:w-[127px]
          md:h-[119px]
          md:ml-[65px]
          bg-contain
          mt-[40px]
          ml-[20px]
          "
          ></div>
          <div
            className="
          bg-[url('/tiktok.png')] 
          bg-no-repeat 
          w-[115px]
          h-[124px]
          bg-contain
          row-start-auto col-[1/3]
          mt-[15px]
          mr-[25px]
          md:w-[115px]
          md:h-[124px]
          md:mr-0
          md:ml-[10px]
          "
          ></div>
        </div>
        {/* ICON SOL */}
        <div
          className="
          absolute
          bg-[url('/Star_blue_1.png')] 
          bg-no-repeat
          w-[67px]
          h-[64px]
          md:w-[113px]
          md:h-[106px]
          lg:w-[206px]
          lg:h-[197px] 
          -top-[32.1px]
          right-[10px]
          lg:-top-[102px]
          lg:right-[70px]
          bg-contain"
        ></div>
      </div>
    </div>
  );
};
