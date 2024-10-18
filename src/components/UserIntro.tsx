"use client";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import defaultUserImage from "/public/profile.png";
import formatTime from "@/lib/utilis/formatTime";
import { IUserIntroProp } from "@/lib/utilis/interfaces";
import { LAST_MESSAGE_MAX_LENGTH } from "@/lib/data/constantValues.data";
import { useAppSelector } from "@/lib/stateManager/hooks";

function UserIntro({
  image,
  name,
  numOfUnreadMessages,
  lastMessage,
  time,
  friendId,
  action,
}: IUserIntroProp) {
  const messageTime = new Date(time);
  const timeSent = formatTime(time);

  return (
    <Link
      href={`/chats/${friendId}`}
      replace={action ? true : false}
      onClick={() => action && action(friendId)}
      className="flex justify-between gap-3 items-center w-full px-2 py-1 mb-5 cursor-pointer hover:bg-black hover:bg-opacity-10 rounded"
    >
      <div className="w-16 h-12   rounded-full">
        <Image
          src={image !== "" ? image : defaultUserImage}
          alt={name}
          className=" bg-green-10 bg-opacity-35 object-cover w-full h-full rounded-full"
          height={100}
          width={100}
          priority
         
        />
      </div>

      <div className="flex w-full items-center justify-between">
        <div className="">
          <p className=" font-bold">{name}</p>
          <p className="text-sm text-ellipsis overflow-hidden text-gray-700">
            {lastMessage.length > LAST_MESSAGE_MAX_LENGTH
              ? lastMessage.slice(0, LAST_MESSAGE_MAX_LENGTH) + "..."
              : lastMessage}
          </p>
        </div>
        <div className=" text-right">
          {messageTime instanceof Date && !isNaN(messageTime.getTime()) && (
            <p>{timeSent}</p>
          )}
          {numOfUnreadMessages > 0 && (
            <p className=" bg-green-10 rounded-full inline py-[0.5px] px-[4px]  text-white ">
              {numOfUnreadMessages}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

export default UserIntro;
