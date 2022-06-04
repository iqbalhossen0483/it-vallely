import { useState } from "react";
import { StatesReturnType } from "../contex-type";

function States(): StatesReturnType {
  //all state start
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [alert, setAlert] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [error, setError] = useState<boolean>(false);
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
  };
}

export default States;
