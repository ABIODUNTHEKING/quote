import { FriendFullDetails } from "./types";

export const determineLastMessageInfo = ({
  friend,
  currentUserId
}: {
  friend: FriendFullDetails;
  currentUserId: string
}) => {
  const messageLength = friend.messages.length - 1;
  const time =
    friend.messages.length > 0 ? friend.messages[messageLength].time : "";

  const lastMessage =
    friend.messages.length > 0 ? friend.messages[messageLength].text : "";

  const unreadMessage = friend.messages.filter(
    (message) => message.seen === false && message.senderId != currentUserId
  );

  return {time, lastMessage, unreadMessage}
};
