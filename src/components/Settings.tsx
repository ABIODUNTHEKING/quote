"use client";
import { useAppSelector } from "@/lib/stateManager/hooks";
import React, { useRef, useState } from "react";
import ProfileImage from "@/components/ProfileImage";
import { XMarkIcon } from "@heroicons/react/24/solid";
import useDeactivateMenuOnTouchOutside from "@/lib/customHooks/useDeactivateOnTouchOutsideMenu";

function Settings({
  onModalVisibility,
  isModalVisbile,
}: {
  onModalVisibility: () => void;
  isModalVisbile: boolean;
}) {
  const user = useAppSelector((state) => state.currentUser);
  const [temporaryImage, setTemporaryImage] = useState<File>();
  const settingModal = useRef<HTMLDivElement>(null)

  const image = user.profileImage !== "" ? user.profileImage : undefined;


  useDeactivateMenuOnTouchOutside({
    closeMenu: onModalVisibility,
    menuRef: settingModal
  })

  return isModalVisbile ? (
    <div className=" backdrop-blur-sm bg-black bg-opacity-40 flex justify-center items-center absolute top-0 w-screen h-screen z-40">
      <div className=" bg-white p-3 pt-10 rounded-xl grid gap-3 w-4/5 lg:w-96 relative" ref={settingModal}>
        <XMarkIcon
          className="w-6 absolute top-3 right-3 cursor-pointer"
          onClick={onModalVisibility}
        />
        <ProfileImage setTemporaryImage={setTemporaryImage} image={image} />

        <div className="  mb-3">
          <p className="text-sm font-bold">Username: </p>
          <p>{user.userName}</p>
        </div>
        <div className="  mb-3">
          <p className="text-sm font-bold">Email: </p>
          <p>{user.email}</p>
        </div>
        <div className="  mb-3">
          <p className="text-sm font-bold">Number Of Friends: </p>
          <p>{user.friends.length}</p>
        </div>

        <div className=" flex justify-between">
          <button className="bg-red-600 text-white text-xs p-3 rounded  ">
            Delete Account
          </button>
          <button className="bg-green-600 text-white text-xs p-3 rounded  ">
            Save changes
          </button>
        </div>
      </div>
    </div>
  ) : null;
}

export default Settings;
