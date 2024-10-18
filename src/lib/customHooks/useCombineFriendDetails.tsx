import { useAppSelector } from "../stateManager/hooks";
import { useGetAllMessagesQuery } from "../stateManager/services/messages.service";
import { useGetAllUsersQuery } from "../stateManager/services/users.service";
import { FriendFullDetails } from "../utilis/types";
import { IChat } from "../utilis/interfaces";
import { IUser } from "../utilis/interfaces";

export const useCombineFriendsDetails = () => {
  let currentUser = useAppSelector((state) => state.currentUser);
  let chats = useAppSelector((state) => state.messages);

  const { data: users = [], isSuccess: usersSuccess } = useGetAllUsersQuery("");

  const userId = currentUser._id;

  const friendFullDetails: FriendFullDetails[] = [];

  if (usersSuccess) {
    const usersFriend = currentUser.friends;

    users.forEach((user: IUser) => {
      if (usersFriend.includes(user._id)) {
        let friend = {
          id: user._id,
          username: user.userName,
          profileImage: user.profileImage,
          messageId: "",
          roomId: "",
          messages: [],
        };
        friendFullDetails.push(friend);
      }
    });

    chats.forEach((userChat: IChat) => {
      const match = friendFullDetails.find(
        (friend) =>
          userChat.roomId.includes(friend.id) &&
          userChat.roomId.includes(userId)
      );

      if (match) {
        match.messages = userChat.messages;
        match.roomId = userChat.roomId;
        match.messageId = userChat._id;
      }
    });
  }

  return friendFullDetails;
};
