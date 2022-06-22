import { useState } from "react";
import { Alert, StatesReturnType } from "../contex-type";

function States(): StatesReturnType {
  //all state start
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [alert, setAlert] = useState<Alert>({ msg: "", type: "info" });
  const [loading, setLoading] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [error, setError] = useState<boolean>(false);
  const [redirect, setRidirect] = useState<string>("");
  const [update, setUpdate] = useState(false);
  //all state end

  return {
    error,
    setError,
    alert,
    setAlert,
    quantity,
    setQuantity,
    loading,
    setLoading,
    orderInfo,
    setOrderInfo,
    categories,
    setCategories,
    redirect,
    setRidirect,
    update,
    setUpdate,
  };
}

export default States;
