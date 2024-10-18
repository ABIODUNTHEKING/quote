"use client";

import { useCreateUserMutation } from "@/lib/stateManager/services/users.service";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CurrentUserActions } from "@/lib/stateManager/features/currentUser.slice";
import { useRouter } from "next/navigation";
import useLimitToast from "@/lib/customHooks/useLimitToast";
import Link from "next/link";
import ProfileImage from "@/components/ProfileImage";
import { ISignForm } from "@/lib/utilis/interfaces";
import { TOAST_LIMIT } from "@/lib/data/constantValues.data";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/lib/stateManager/hooks";
import { totalmem } from "os";
import axios from "axios";
import generateImageURL from "@/lib/utilis/generateImageURL";

const inputStyle = "border border-solid border-black w-full rounded-xl p-2 ";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignForm>();
  const [createUser, { isLoading }] = useCreateUserMutation();
  const dispatch = useAppDispatch();

  const [temporaryImage, setTemporaryImage] = useState<File>();

  const router = useRouter();
  useLimitToast(TOAST_LIMIT);

  const onSubmit = async (data: ISignForm) => {
    if (isLoading) return;
    
    const { email, password, userName } = data;

    let imageUrl = "";
    let deleteToken = "";

    if (temporaryImage) {
      ({ imageUrl, deleteToken } = await generateImageURL(temporaryImage));
    }

    try {
      const user = await createUser({
        userData: {
          userName,
          email,
          password,
          profileImage: imageUrl,
          friends: [],
        },
      }).unwrap();

      dispatch(CurrentUserActions.getUserData(user));

      router.push("/chats");
    } catch (err: any) {
      console.log(err);
      if (deleteToken != "") {
        axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_ACCOUNT_NAME}/delete_by_token`,
          {
            token: deleteToken,
          }
        );
      }

      if (err.data.msg.includes("duplicate")) {
        toast.error("Email address already exist");
        return;
      }

      const errorMessage =
        err.data.msg || "An unexpected error ocuured, please try again";

      toast.error(errorMessage);
    }
  };

  return (
    <div className="grid lg:w-2/3 mx-auto px-5 place-content-center min-h-svh lg:h-auto">
      <div>
        <h2 className=" text-2xl mb-2"> Get Started!</h2>
        <p className=" text-gray-600 mb-4">
          Sign up now to connect instantly and enjoy seamless conversations.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <ProfileImage setTemporaryImage={setTemporaryImage} />

        <div className=" mb-5">
          <label htmlFor="userName" className="mb-10  text-sm ">
            Username
          </label>
          <input
            type="text"
            id="userName"
            className={inputStyle}
            {...register("userName", { required: "User name is required" })}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className=" mb-5">
          <label htmlFor="email" className="mb-10  text-sm ">
            Email Address
          </label>
          <input
            type="text"
            id="email"
            className={inputStyle}
            {...register("email")}
          />
        </div>
        <div className=" mb-5">
          <label htmlFor="password" className="mb-10 text-sm ">
            Password
          </label>

          <input
            type="password"
            className={inputStyle}
            {...register("password")}
          />
        </div>
        <button
          className={` bg-green-10 px-16 block mx-auto rounded-xl py-3 text-lg text-white font-bold `}
        >
          {isLoading ? "Loading..." : "Sign up"}
        </button>
      </form>
      <p className=" text-center text-sm mt-5">
        Already have an account?{" "}
        <Link href="/" className="text-blue-400 hover:underline">
          login
        </Link>
      </p>
    </div>
  );
}
