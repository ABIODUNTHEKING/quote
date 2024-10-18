import ListOfFriends from "@/components/ListOfFriends";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode, }) {
  return (
    <div className="grid lg:grid-cols-[1.2fr_3fr] w-full">
      <ListOfFriends />
      {children}
    </div>
  );
}
