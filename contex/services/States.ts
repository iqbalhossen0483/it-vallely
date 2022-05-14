import { useState } from "react";

function States(): StatesReturnType {
  //all state start
  const [alert, setAlert] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  //all state end

  return {
    error,
    setError,
    alert,
    setAlert,
    quantity,
    setQuantity,
  };
}

export default States;
