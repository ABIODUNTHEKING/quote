import { MutableRefObject } from "react";

export type MutableDivElement = MutableRefObject<HTMLDivElement | null>;

export type FriendFullDetails = {
  username: string;
  id: string;
  roomId: string;
  messageId: string;
  profileImage: string;
  messages: {
    _id: string;
    text: string;
    time: string;
    senderId: string;
    seen: boolean;
    deletedForUser: string;
  }[];
};
