import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../stateManager/hooks";
import { actions } from "@/lib/stateManager/features/messages.slice";
import { useSeenMessageMutation } from "@/lib/stateManager/services/messages.service";

function useSeenMessages(friendId: string) {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.currentUser);
  const chats = useAppSelector((state) => state.messages);
  const [update] = useSeenMessageMutation();
  
  useEffect(() => {
    dispatch(actions.seenMessage({ friendId, userId: currentUser._id }));
    const selectedMessage = chats.find(
      (chat) =>
        chat.roomId.includes(friendId) &&
        chat.roomId.includes(currentUser._id)
    );
    if (selectedMessage && selectedMessage._id) {
      update({ id: selectedMessage?._id, receiverId: currentUser._id });
    }
  }, [currentUser._id, dispatch, friendId, chats, update]);
}

export default useSeenMessages;
