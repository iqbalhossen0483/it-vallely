import React from "react";
import useStore from "../../contex/hooks/useStore";
import InternalError from "./component/InternalAlert";
import ServerError from "./component/ServerAlert";

const Alert = () => {
  const store = useStore();
  if (store?.State.alert.internal) {
    return <InternalError />;
  } else if (store?.State.alert.server) {
    return <ServerError />;
  } else {
    return null;
  }
};

export default Alert;
