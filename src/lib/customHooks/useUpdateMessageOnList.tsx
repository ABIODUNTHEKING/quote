import React, { useEffect, useMemo } from "react";
import { IChat } from "../utilis/interfaces";
import { useAppDispatch, useAppSelector } from "../stateManager/hooks";
import { useGetAllMessagesQuery } from "../stateManager/services/messages.service";
import { actions } from "../stateManager/features/messages.slice";

function useUpdateMessageOnList() {
  const dispatch = useAppDispatch();
  const { data: messages = [], isSuccess: messageSuccess } =
    useGetAllMessagesQuery("");
  const currentUser = useAppSelector((state) => state.currentUser);

  const userMessages = useMemo(() => {
    if (messageSuccess) {
      return messages.filter((message: IChat) =>
        message.roomId.includes(currentUser._id)
      );
    } else {
      return [];
    }
  }, [currentUser._id, messageSuccess, messages]);

  useEffect(() => {
    if (messageSuccess) {
      dispatch(actions.addAllMessage(userMessages));
    }
  }, [dispatch, messageSuccess, userMessages]);
}

export default useUpdateMessageOnList;
