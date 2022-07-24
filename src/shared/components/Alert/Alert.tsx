import React from "react";
import { Alert as MuiAlert } from "@mui/material";
import { useAppSelector } from "../../../app/hooks";
import { selectAlertInfo } from "../../../features/alert/alertSlice";

export default function Alert() {
  const alertInfo = useAppSelector(selectAlertInfo);

  return alertInfo.type ? (
    <MuiAlert severity={alertInfo.type} sx={{ margin: "20px" }}>
      {alertInfo.message}
    </MuiAlert>
  ) : null;
}
