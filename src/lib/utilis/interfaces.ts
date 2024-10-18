import { StaticImageData } from "next/image";
import { RefObject, SetStateAction } from "react";

//MESSAGES
export interface IMessage {
  text: string;
  time: string;
  senderId: string;
  seen: boolean;
  _id: string;
  deletedForUser: string;
}

export interface IChat {
  _id: string;
  roomId: string;
  messages: IMessage[];
}

//USER
export interface IUser {
  _id: string;
  userName: string;
  profileImage: string;

  friends: string[];
  createdAt: string;
  updatedAt: string;
  email: string
}

//PROPS
export interface IUseDeactivateOnTouchOutsideProps {
  menuRef: RefObject<HTMLDivElement>;
  closeMenu: () => void;
}

export interface IMessageContextMenuProps {
  position: {
    x: number;
    y: number;
  };
  items: {
    label: string;
    action: () => void;
  }[];
  messageTime: string;
  isSender: boolean;
  setIsContextMenuVisible: (value: SetStateAction<boolean>) => void;
}

export interface IMessageDetailProps {
  message: IMessage;
  currentUserId: string;
  timeSent: string;
  messageRoomId: string;
  chatId: string;
}

export interface IUserIntroProp {
  image: StaticImageData | string;
  name: string;
  numOfUnreadMessages: number;
  lastMessage: string;
  time: string;
  friendId: string;

  action?: (id: string) => void
}

//ARGUMENTS
export interface ILoginForm {
  email: string;
  password: string;
}

export interface ISignForm extends ILoginForm {
  userName: string;
  profileImage: string;
}

export interface ITextMessage {
  message: string;
}
