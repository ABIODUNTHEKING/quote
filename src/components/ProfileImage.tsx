"use client";

import defaultProfileImage from "/public/profile.png";
import Image from "next/image";

import { CameraIcon } from "@heroicons/react/20/solid";
import { useForm, UseFormRegister } from "react-hook-form";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { ISignForm } from "@/lib/utilis/interfaces";
import {
  MAX_IMAGE_SIZE_IN_MB,
  VALID_IMAGE_TYPES,
} from "@/lib/data/constantValues.data";

interface IProfileImageProps {
  setTemporaryImage: Dispatch<SetStateAction<File | undefined>>;
  image?: string
}

const maxSizeInBytes = MAX_IMAGE_SIZE_IN_MB * 1024 * 1024;

function ProfileImage({ setTemporaryImage, image }: IProfileImageProps) {
  const { register } = useForm();
  const { ref: registerRef, ...rest } = register("profileImage");
  const [selectedImage, setSelectedImage] = useState<string>();

  const handleUploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];

    if (!VALID_IMAGE_TYPES.includes(file.type)) {
      toast.error("Please upload a valid image file");
      return;
    }

    if (event.target.files[0].size > maxSizeInBytes) {
      toast.error(`Image should be less than ${MAX_IMAGE_SIZE_IN_MB}MB`);
      return;
    }

    setTemporaryImage(file);
    const urlImage = URL.createObjectURL(file);
    setSelectedImage(urlImage);
  };

  return (
    <div className=" flex items-center">
      <label
        htmlFor="profileImage"
        className="text-sm cursor-pointer relative w-24 h-24  inline-block mx-auto"
      >
        <Image
          src={selectedImage || image || defaultProfileImage}
          alt="Default Profile Image"
          className="w-24 rounded-full  object-fill"
          sizes="500"
          fill
          priority
        />
        <CameraIcon className="w-6 absolute bottom-[2px] right-2 bg-gray-200 rounded-full p-1" />
      </label>
      <input
        type="file"
        id="profileImage"
        className={` hidden`}
        {...rest}
        accept="image/*"
        onChange={handleUploadImage}
      />
    </div>
  );
}

export default ProfileImage;
