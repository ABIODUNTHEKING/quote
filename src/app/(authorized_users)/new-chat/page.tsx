"use client";
import NewChat from "@/components/NewChat";

export default function NewChatPage() {
  return (
    <div className=" lg:bg-black/40 lg:flex lg:justify-center w-full  lg:absolute lg:w-screen lg:h-screen lg:backdrop-blur-sm">
      <div className="w-full px-2 bg-white overflow-y-scroll rounded-2xl lg:px-4 h-svh lg:mx-auto lg:mt-32 lg:h-96 lg:overflow-y-scroll  lg:w-96  lg:pt-6 z-40 bg-opacity-100 shadow hide_scroll_bar">
        <NewChat />
      </div>
    </div>
  );
}
