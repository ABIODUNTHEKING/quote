"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";

type FormValues = {
  search: string;
};

interface ISearchBarProps {
  text: string;
  textStyle: string;
  searchBarPlaceHolder: string
}

function SearchBar({ text, textStyle, searchBarPlaceHolder }: ISearchBarProps) {
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {};

  return (
    <form
      className="sticky top-0 bg-white py-2 "
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className={`font-bold  text-green-10 ${textStyle}`}>{text}</h2>

      <div className="flex mb-5 gap-1 rounded pl-2 pr-1 bg-black bg-opacity-20 py-2 lg:py-1 ">
        <MagnifyingGlassIcon className="w-4" />
        <input
          type="text"
          className=" outline-none w-full bg-transparent text-black"
          placeholder={searchBarPlaceHolder}
          {...register("search")}
        />
      </div>
    </form>
  );
}

export default SearchBar;
