"use client";

import WelcomeBox from "@/components/WelcomeBox";
import useDisplayNewMessage from "@/lib/customHooks/useDisplayNewMessage";
import { socket } from "@/lib/utilis/socket";

export default function Chat() {
  useDisplayNewMessage(socket);

  return (
    <div onContextMenu={(e) => e.preventDefault()}>
      <WelcomeBox />
    </div>
  );
}
