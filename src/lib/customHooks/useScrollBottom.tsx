"use client";
import { useEffect } from "react";
import { MutableDivElement } from "../utilis/types";
import { IChat } from "../utilis/interfaces";

export const useScrollToBottom = ({
  chats,
  dummyElementRef,
}: {
  chats: IChat[];
  dummyElementRef: MutableDivElement;
}) => {
  useEffect(() => {
    if (dummyElementRef.current) {
      dummyElementRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats, dummyElementRef]);
};
