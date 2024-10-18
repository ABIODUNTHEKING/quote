import React from "react";
import IntroCard from "@/components/IntroCard";

function layout( {children} : {children: React.ReactNode}) {
  return (
    <main className=" grid lg:grid-cols-[2.3fr_5fr] gap-20 items-center ">
      <IntroCard />

      {children}
    </main>
  );
}

export default layout;
