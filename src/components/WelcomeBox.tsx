import Image from "next/image";
import logo from "/public/QUOTE.png";

function MessageBox() {
  return (
    <div className="border-l-[0.5px] border-solid border-green-600 hidden h-svh w-[61vw] lg:flex flex-col justify-center  items-center">
      <Image src={logo} alt="Quote logo" className="w-12" />
      <p className="text-2xl font-bold mt-2 text-green-10">Welcome to Quote</p>
    </div>
  );
}

export default MessageBox;
