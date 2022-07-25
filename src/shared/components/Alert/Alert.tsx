import React, { useEffect, useState } from "react";
import { Alert as MuiAlert, Snackbar } from "@mui/material";
import { useAppSelector } from "../../../app/hooks";
import { selectAlertInfo } from "../../../features/alert/alertSlice";

export default function Alert() {
  const alertInfo = useAppSelector(selectAlertInfo);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (alertInfo.type) {
      setOpen(true);
    }
  }, [alertInfo?.type]);

  return alertInfo.type ? (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={() => setOpen(false)}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <MuiAlert
        severity={alertInfo.type}
        sx={{ margin: "20px", width: "100%" }}
      >
        {alertInfo.message}
      </MuiAlert>
    </Snackbar>
  ) : null;
}
