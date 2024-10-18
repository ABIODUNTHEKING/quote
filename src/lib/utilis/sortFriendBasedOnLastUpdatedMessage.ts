import { FriendFullDetails } from "./types";


function sortFriendBasedOnLastUpdatedMessage(
  friendFullDetails: FriendFullDetails[]
) {
  const sortedFriend = [...friendFullDetails].sort((info1, info2) => {
    const lastMessageTime1 =
      info1.messages.length > 0
        ? new Date(info1.messages[info1.messages.length - 1].time).getTime()
        : 0;

    const lastMessageTime2 =
      info2.messages.length > 0
        ? new Date(info2.messages[info2.messages.length - 1].time).getTime()
        : 0;

    return lastMessageTime2 - lastMessageTime1;
  });

  return sortedFriend.filter(friend => friend.messages);
}

export default sortFriendBasedOnLastUpdatedMessage;
