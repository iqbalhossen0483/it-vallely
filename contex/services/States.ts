import { useState } from "react";

function States(): StatesReturnType {
  //all state start
  const [alert, setAlert] = useState<DefaultAlert>({
    internal: false,
    server: false,
    message: "",
  });
  //all state end

  return {
    alert,
    setAlert,
  };
}

export default States;
