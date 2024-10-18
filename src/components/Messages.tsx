"use client";

import { useDisplayBottom } from "@/lib/customHooks/useDisplayBottom";
import { useScrollToBottom } from "@/lib/customHooks/useScrollBottom";
import { useAppSelector } from "@/lib/stateManager/hooks";
import { useRef } from "react";
import MessageDetail from "./MessageDetail";
import formatTime from "@/lib/utilis/formatTime";
import { LockClosedIcon } from "@heroicons/react/24/outline";

function Message({ friendId }: { friendId: string }) {
  const dummyElementRef = useRef<HTMLDivElement | null>(null);
  const chatRef = useRef<HTMLDivElement | null>(null);
  const currentUser = useAppSelector((state) => state.currentUser);
  const chats = useAppSelector((state) => state.messages);

  useDisplayBottom({ chatRef, selectedFriend: friendId });
  useScrollToBottom({ chats: chats, dummyElementRef });

  const currentFriendChat = chats.find(
    (chat) =>
      chat.roomId.includes(friendId) && chat.roomId.includes(currentUser._id)
  )!;

  return (
    <div
      className="flex-grow h-0 overflow-y-auto   px-5 flex flex-col gap-2 pt-5 "
      
      ref={chatRef}
    >
      <p className="text-xs  bg-gray-500 text-white rounded  mx-auto p-3 text-center">
        <LockClosedIcon className="w-3 inline-block mr-1 mb-[2px]" />
        Messages and calls are end-to-end encrypted. No one outside of this
        chat, not even Quote can read them.
      </p>
      {currentFriendChat
        ? currentFriendChat.messages.map((message) => {
            const timeSent = formatTime(message.time);
            return (
              <MessageDetail
                message={message}
                timeSent={timeSent}
                currentUserId={currentUser._id}
                key={message._id}
                messageRoomId={currentFriendChat.roomId}
                chatId={currentFriendChat._id}
              />
            );
          })
        : null}

      <div ref={dummyElementRef} />
    </div>
  );
}

export default Message;
