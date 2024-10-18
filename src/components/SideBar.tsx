"use client";
import { useParams } from "next/navigation";
import {
  ArrowLeftEndOnRectangleIcon,
  Cog6ToothIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import logo from "/public/QUOTE.png";
import Settings from "./Settings";
import { useState } from "react";
import NavLink from "./NavLink";

function SideBar() {
  const { slug: selectedFriendId } = useParams();
  const [isModalVisbile, setIsModalVisible] = useState(false);
  const handleModalVisibility = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <nav
        className={`bg-green-10 lg:w-1/6 lg:h-svh z-50 flex justify-between items-center lg:items-start lg:flex-col py-2 px-6 lg:p-10 lg:pl-3 lg:pr-16 shadow-lg left-1/2 transform -translate-x-1/2 lg:translate-x-0 fixed bottom-1 w-[90vw] max-w-96 lg:max-w-max rounded-full mx-auto lg:mx-0 lg:rounded-none lg:static  ${
          selectedFriendId ? "hidden lg:flex" : ""
        }`}
      >
        <ul className="flex lg:flex-col gap-3 justify-between lg:justify-normal w-full items-center lg:items-start">
          <li className="hidden lg:block">
            <Link
              href="/chat"
              className="flex items-center text-white gap-2 mb-5"
            >
              <Image
                src={logo}
                alt="Quote logo"
                className=" w-7  mx-auto lg:mx-0"
                priority
              />
              <p className="text-xs font-medium lg:font-bold lg:text-xl">
                QOUTE
              </p>
            </Link>
          </li>

          <li>
            <NavLink
              href="/chats"
              icon={ChatBubbleOvalLeftEllipsisIcon}
              label="Chats"
              desktop={true}
            />
          </li>
          <li>
            <NavLink
              href="/calls"
              icon={PhoneIcon}
              label="Calls"
              desktop={true}
            />
          </li>

          <li>
            <NavLink
              action={() => setIsModalVisible((prev) => !prev)}
              icon={Cog6ToothIcon}
              label="Settings"
              desktop={false}
            />
          </li>

          <li>
            <NavLink
              href="/"
              icon={ArrowLeftEndOnRectangleIcon}
              label="Log out"
              desktop={false}
            />
          </li>
        </ul>

        <ul className="hidden lg:flex flex-col gap-3">
          <li>
            <NavLink
              action={() => setIsModalVisible((prev) => !prev)}
              icon={Cog6ToothIcon}
              label="Settings"
              desktop={true}
            />
          </li>
          <li>
            <NavLink
              href="/"
              icon={ArrowLeftEndOnRectangleIcon}
              label="Log out"
              desktop={true}
            />
          </li>
        </ul>
      </nav>

      <Settings
        onModalVisibility={handleModalVisibility}
        isModalVisbile={isModalVisbile}
      />
    </>
  );
}

export default SideBar;
