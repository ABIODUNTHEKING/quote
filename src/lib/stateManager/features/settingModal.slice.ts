import { createSlice } from "@reduxjs/toolkit";

const settingModal = createSlice({
  name: "setting-modal",
  initialState: false,
  reducers: {
    displayModal: (state) => {
      return !state;
    },
  },
});

export const { actions: settingAction, reducer } = settingModal;
