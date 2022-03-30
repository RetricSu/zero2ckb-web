import { notify } from "../../../widget/notify";

export const errNotifyCallBack = (err: any) => {
  notify(err.message);
};
