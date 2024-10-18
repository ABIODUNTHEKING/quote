"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { FaceSmileIcon } from "@heroicons/react/24/outline";
import { KeyboardEvent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/lib/stateManager/hooks";
import TextareaAutosize from "react-textarea-autosize";
import { socket } from "@/lib/utilis/socket";
import {
  useCreateMessageMutation,
  useUpdateUserAndFriendMessagesMutation,
} from "@/lib/stateManager/services/messages.service";
import { actions } from "@/lib/stateManager/features/messages.slice";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { ITextMessage } from "@/lib/utilis/interfaces";

export default function TextBox() {
  const { register, handleSubmit, reset } = useForm<ITextMessage>();
  const { slug: selectedFriendId } = useParams();
  const dispatch = useAppDispatch();

  const [updateChat] = useUpdateUserAndFriendMessagesMutation();
  const [createNewChat] = useCreateMessageMutation();

  const currentUser = useAppSelector((state) => state.currentUser);
  const chats = useAppSelector((state) => state.messages);
  const roomId = [currentUser._id, selectedFriendId].sort().join("_");

  const roomExist = chats.find(
    (chat) =>
      chat.roomId.includes(currentUser._id) &&
      chat.roomId.includes(selectedFriendId as string)
  );

  useEffect(() => {
    socket.on("chat message", (msg) => {
      dispatch(actions.updateMessage(msg.messageInfo));
    });

    socket.on("delete message", (msg) => {
      dispatch(
        actions.deleteMessage({
          messageRoomId: msg.roomId,
          messageId: msg.messageId,
        })
      );
    });

    return () => {
      socket.off("chat message");
      socket.off("delete message");
    };
  }, [roomId, dispatch, chats]);

  const onSubmit = (data: ITextMessage) => {
    if (data.message.trim() == "") {
      return;
    }
    const messageInfo = {
      roomId,
      messages: {
        senderId: currentUser._id,
        text: data.message,
        time: `${new Date()}`,
        seen: false,
      },
    };

    console.log(roomExist)

    const messageResponse = roomExist
      ? updateChat({
          roomId: roomId,
          message: messageInfo.messages,
        })
      : createNewChat({
          messageData: {
            roomId,
            messages: [messageInfo.messages],
          },
        });

    messageResponse
      .then((res) => {
        const newMessageInfo = { ...messageInfo, messages: res.data };

        socket.emit("chat message", {
          roomId,
          messageInfo: newMessageInfo,
        });
        reset();
      })
      .catch((err) => toast.error("An unexpected error occurred"));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <form
      className="flex items-center border-t-[0.5px] border-solid border-green-600 px-2 py-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FaceSmileIcon className="w-6 items-baseline text-green-600 cursor-pointer" />
      <TextareaAutosize
        minRows={1}
        maxRows={4}
        placeholder="Type a message..."
        className="flex-1 py-2 px-1 outline-none hide_scroll_bar resize-none bg-transparent"
        style={{ wordWrap: "break-word" }}
        {...register("message")}
        onKeyDown={handleKeyDown}
      />
      <button type="submit">
        <PaperAirplaneIcon className="w-6 items-baseline text-green-600 cursor-pointer" />
      </button>
    </form>
  );
}
