import React from "react";
import useStore from "../../../contex/hooks/useStore";

const InternalError = () => {
  const store = useStore();
  return (
    <div>
      <p>{store?.State.error}</p>
    </div>
  );
};

export default InternalError;
