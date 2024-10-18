"use client";
import { MouseEvent, useState } from "react";
import MessageContextMenu from "./MessageContextMenu";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/lib/stateManager/hooks";
import { actions } from "@/lib/stateManager/features/messages.slice";
import {
  useDeleteMessageForOneUserMutation,
  useDeleteMessageFromChatMutation,
} from "@/lib/stateManager/services/messages.service";
import { handleCopyText } from "@/lib/utilis/handleCopyText";
import { IMessageDetailProps } from "@/lib/utilis/interfaces";
import { MENU_LABELS } from "@/lib/data/constantValues.data";
import { socket } from "@/lib/utilis/socket";

export default function MessageDetail({
  currentUserId,
  message,
  timeSent,
  messageRoomId,
  chatId,
}: IMessageDetailProps) {
  const chats = useAppSelector((state) => state.messages);
  const dispatch = useAppDispatch();

  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [deleteMessage] = useDeleteMessageFromChatMutation();
  const [deleteMessageForUser] = useDeleteMessageForOneUserMutation();
  const [menuItems] = useState([
    {
      label: MENU_LABELS[0],
      action: () => handleCopyText(message.text),
    },
    {
      label: MENU_LABELS[1],
      action: () => handleDeleteMessageForMe(),
    },
    {
      label: MENU_LABELS[2],
      action: () => handleDeleteMessageForEveryone(),
    },
  ]);

  const handleDeleteMessageForMe = () => {
    dispatch(
      actions.deleteMessage({
        messageRoomId: messageRoomId,
        messageId: message._id,
      })
    );

    deleteMessageForUser({
      messageId: message._id,
      chatId,
      userId: currentUserId,
    });
  };

  const handleDeleteMessageForEveryone = () => {
    dispatch(
      actions.deleteMessage({
        messageRoomId: messageRoomId,
        messageId: message._id,
      })
    );

    socket.emit("delete message", {
      roomId: messageRoomId,
      messageId: message._id,
    });

    deleteMessage({ messageId: message._id, chatId });
  };

  const handleContextMenu = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    e.target as HTMLElement;

    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const halfWidthOfDiv = rect.width / 2

    setMenuPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });


   
    setIsContextMenuVisible(true);
  };

  const handleCloseContextMenu = () => {
    if (isContextMenuVisible) setIsContextMenuVisible(false);
  };

  return (
    <div
      key={message._id}
      onContextMenu={handleContextMenu}
      onClick={handleCloseContextMenu}
      className={`mb-2 p-2 rounded inline-block text-white relative whitespace-pre-wrap cursor-pointer ${
        message.senderId != currentUserId
          ? "  bg-black bg-opacity-50  mr-auto text-left "
          : " bg-green-700 shadow-xl self-end ml-auto"
      } hide_scroll_bar`}
      style={{ maxWidth: "70%", wordWrap: "break-word" }}
    >
      <p>{message.text}</p>

      <p className="text-xs text-right">{timeSent}</p>

      {isContextMenuVisible && (
        <MessageContextMenu
          position={menuPosition}
          items={menuItems}
          setIsContextMenuVisible={setIsContextMenuVisible}
          messageTime={message.time}
          isSender={currentUserId == message.senderId}
        />
      )}
    </div>
  );
}
