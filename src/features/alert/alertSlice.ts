import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IAlertNewPayload, IAlertState } from "./alertInterface";

const initialState: IAlertState = {
  message: "",
  type: "",
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    newAlert: (state, action: PayloadAction<IAlertNewPayload>) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    clearAlert: (state) => {
      state.message = "";
      state.type = "";
    },
  },
});

export const { newAlert, clearAlert } = alertSlice.actions;

export const selectAlertInfo = (state: RootState) => state.alert;

export default alertSlice.reducer;
