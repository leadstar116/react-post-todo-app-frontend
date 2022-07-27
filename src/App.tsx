import React, { useEffect } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { clearAlert, selectAlertInfo } from "./features/alert/alertSlice";
import AppRoutes from "./routes/AppRoutes";
import Alert from "./shared/components/Alert/Alert";

function App() {
  const dispatch = useAppDispatch();
  const alertInfo = useAppSelector(selectAlertInfo);

  useEffect(() => {
    if (alertInfo.type) {
      setTimeout(() => {
        dispatch(clearAlert());
      }, 5000);
    }
  }, [alertInfo.type, dispatch]);

  return (
    <div className="App">
      <div className="App-Body">
        {alertInfo.type && <Alert />}
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;
