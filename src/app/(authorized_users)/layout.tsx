
import SideBar from "@/components/SideBar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Qoute",
  description: "A chat app that helps connect you easily with your friends",
};

export default function AuthorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex z-20">
      <SideBar />

      {children}
    </main>
  );
}
