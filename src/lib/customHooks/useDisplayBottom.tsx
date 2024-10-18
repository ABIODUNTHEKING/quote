"use client"
import { useEffect, useLayoutEffect } from "react";
import { MutableDivElement } from "../utilis/types";

  
  export const useDisplayBottom = ({
    chatRef,
    selectedFriend,
  }: {
    chatRef: MutableDivElement;
    selectedFriend: string;
  }) => {
    useLayoutEffect(() => {
      if (chatRef.current) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
    }, [selectedFriend, chatRef]);
  };