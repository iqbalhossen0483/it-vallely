import { useState } from "react";

function States(): StatesReturnType {
  //all state start
  const [alert, setAlert] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);
  //all state end

  return {
    error,
    setError,
    alert,
    setAlert,
  };
}

export default States;
