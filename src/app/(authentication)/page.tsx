"use client";
import { useAppDispatch } from "@/lib/stateManager/hooks";
import { useGetUserByEmailAndPasswordMutation } from "@/lib/stateManager/services/users.service";
import {  useState } from "react";
import { useForm } from "react-hook-form";
import { CurrentUserActions } from "@/lib/stateManager/features/currentUser.slice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useLimitToast from "@/lib/customHooks/useLimitToast";
import Link from "next/link";
import { ILoginForm } from "@/lib/utilis/interfaces";

const inputStyle = "border border-solid border-black w-full rounded-xl p-2 ";
const TOAST_LIMIT = 1;

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();
  const dispatch = useAppDispatch();
  const [userDetail, setUserDetail] = useState<ILoginForm | null>(null);
  const router = useRouter();
  useLimitToast(TOAST_LIMIT);

  const [update, { isLoading, isError, isSuccess }] =
    useGetUserByEmailAndPasswordMutation();

  const onSubmit = async (formData: ILoginForm) => {
    try {
      const data = await update(formData).unwrap();

      dispatch(CurrentUserActions.getUserData(data));

      router.push("/chats");
    } catch (err) {
      const errorMessage =
        (err as any)?.data?.msg ||
        "An unexpected error ocuured, please try again";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="  grid lg:w-2/3 mx-auto px-5 place-content-center min-h-svh lg:h-auto">
      <div>
        <h2 className=" text-2xl mb-2">Welcome Back!</h2>
        <p className=" text-gray-600 mb-4">
          Send information instantly and keep conversations flowing with ease.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" mb-5">
          <label htmlFor="email" className="mb-10  text-sm ">
            Email Address
          </label>
          <input
            type="text"
            id="email"
            className={inputStyle}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className=" mb-5">
          <label htmlFor="email" className="mb-10 text-sm ">
            Password
          </label>

          <input
            type="password"
            className={inputStyle}
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>
        <button
          className={` bg-green-10 px-16 block mx-auto rounded-xl py-3 text-lg text-white font-bold ${
            isLoading ? "cursor-not-allowed" : "cursor-pointer"
          } `}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Sign in"}
        </button>
      </form>

      <p className=" text-center text-sm mt-5">
        Do not have an account?{" "}
        <Link href="/sign-up" className="text-blue-400 hover:underline">
          Create account
        </Link>
      </p>
    </div>
  );
}
