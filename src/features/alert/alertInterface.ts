export interface IAlertState {
  message: string;
  type: "success" | "error" | "info" | "";
}

export interface IAlertNewPayload extends IAlertState {}
