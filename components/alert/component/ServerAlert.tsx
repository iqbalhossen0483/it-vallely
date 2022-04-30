import React from "react";
import useStore from "../../../contex/hooks/useStore";

const ServerError = () => {
  const store = useStore();
  setTimeout(() => {
    store?.State.setAlert({
      internal: false,
      server: false,
      message: "",
    });
  }, 5000);
  return (
    <div>
      <p>{store?.State.alert.message}</p>
    </div>
  );
};

export default ServerError;
