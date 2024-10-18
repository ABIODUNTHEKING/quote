import { useEffect, useMemo } from "react";
import { useCombineFriendsDetails } from "@/lib/customHooks/useCombineFriendDetails";
import { useAppDispatch, useAppSelector } from "@/lib/stateManager/hooks";
import { useGetAllMessagesQuery } from "@/lib/stateManager/services/messages.service";
import { actions } from "@/lib/stateManager/features/messages.slice";
import { IChat } from "@/lib/utilis/interfaces";
import { Socket } from "socket.io-client";

function useDisplayNewMessage(socket: Socket | null) {
  const friendFullDetails = useCombineFriendsDetails();

  const { _id: currentUserId } = useAppSelector((state) => state.currentUser);
  const dispatch = useAppDispatch();

  const {
    data: chats = [],
    isSuccess: messageSuccess,
    refetch,
  } = useGetAllMessagesQuery("");

  const userMessages = useMemo(() => {
    if (messageSuccess) {
      return chats
        .filter((chat: IChat) => chat.roomId.includes(currentUserId))
        .map((chat: IChat) => ({
          ...chat,
          messages: chat.messages.filter(
            (msg) => msg.deletedForUser !== currentUserId
          ),
        }));
    } else {
      return [];
    }
  }, [currentUserId, messageSuccess, chats]);

  useEffect(() => {
    if (messageSuccess) {
      refetch();
      dispatch(actions.addAllMessage(userMessages));
    }
  }, [dispatch, messageSuccess, refetch, userMessages]);

  useEffect(() => {
    if (!socket) return;
    friendFullDetails.forEach((friend) => {
      const friendId = friend.id;
      socket.emit("join room", { currentUserId, friendId });
    });

    socket.on("chat message", (msg) => {
      dispatch(actions.updateMessage(msg.messageInfo));
    });

    return () => {
      socket.off("chat message");
    };
  }, [
    currentUserId,
    dispatch,
    friendFullDetails,
    messageSuccess,
    chats,
    socket,
  ]);
}

export default useDisplayNewMessage;
