import React from "react";
import logo from "/public/logo.png";
import aWoman from "/public/a-lady-pressing-her-phone.png";
import Image from "next/image";

function IntroCard() {
  return (
    <div className="bg-green-10 h-svh  hidden lg:block relative pt-10">
      <Image src={logo} alt="logo" className=" w-40 mb-5 mx-auto" />

      <p className="text-lg text-center text-white">
        Share Ideas Effortlessly with Quote
      </p>

      <Image
        src={aWoman}
        alt="A woman pressing her phone"
        className=" absolute bottom-0 w-3/4 max-w-sm  left-6 mx-auto"
        priority
      />
    </div>
  );
}

export default IntroCard;
