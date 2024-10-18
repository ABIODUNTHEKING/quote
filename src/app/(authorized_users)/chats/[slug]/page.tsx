"use client";
import Messages from "@/components/Messages";
import TextBox from "@/components/TextBox";
import { useCombineFriendsDetails } from "@/lib/customHooks/useCombineFriendDetails";
import { PhoneIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import user from "/public/profile.png";
import useSeenMessages from "@/lib/customHooks/useSeenMessages";
import { useAppSelector } from "@/lib/stateManager/hooks";

export default function MessageBox({ params }: { params: { slug: string } }) {
  const friendId = params.slug;
  const allFriendsData = useCombineFriendsDetails();
  const friend = allFriendsData.find((friend) => friend.id == friendId);
  const currentUser = useAppSelector(state => state.currentUser)

  useSeenMessages(friendId);

  return (
    <div
      className={`lg:border-l-[0.5px] border-solid border-green-600 w-full min-h-svh flex flex-col `}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="flex justify-between border-b-[0.5px] border-solid border-green-600 p-2 px-4 items-center">
        <div className="flex items-center gap-1">
          <div className="w-10 h-10 rounded-full">
            {friend && (
              <Image
                src={friend.profileImage !== "" ? friend.profileImage : user}
                alt={friend.username}
                className=" bg-green-10 bg-opacity-35 object-cover w-full h-full rounded-full"
                height={500}
                width={500}
              />
            )}
          </div>
          <p className="font-bold text-2xl">{friend?.username}</p>
        </div>

        <PhoneIcon className="w-8 p-2 cursor-pointer bg-black bg-opacity-15 shadow-md rounded" />
      </div>

      <Messages friendId={friendId} />

      <TextBox />

      {/* <EmojiPicker open={isDisplayEmoji} className="fixed bottom-10 bg-black"  /> */}
    </div>
  );
}
