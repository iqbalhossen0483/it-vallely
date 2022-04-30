import React, { useEffect, useState } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { getScrollHeight } from "../../../services/shared/sharedFunction";
import useStore from "../../../contex/hooks/useStore";

const Cart = () => {
  const [stricky, setStricky] = useState<boolean>(false);
  const store = useStore();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const isOverScroll = getScrollHeight(350);
      setStricky(isOverScroll);
    });
  }, []);
  return (
    <div className={`cart ${stricky ? "flex" : "hidden"}`}>
      <div>
        <ShoppingCartOutlinedIcon />
        <span className='count'>
          {store?.Carts.cartProduct.quantity}
        </span>
      </div>
    </div>
  );
};

export default Cart;
