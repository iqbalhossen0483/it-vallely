import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import useStore from "../../../../../contex/hooks/useStore";
import CartProduct from "../../shared/CartProduct";
import { useState } from "react";

const CallCart = () => {
  const [showCart, setShowCart] = useState<boolean>(false);
  const store = useStore();
  const price = store?.Carts.cartProduct.price;

  return (
    <>
      <div className='header-call'>
        <PhoneInTalkOutlinedIcon />
        <div>
          <p>Call Us Now:</p>
          <p className='number'>01846770635</p>
        </div>
      </div>
      <div className='header-cart'>
        <div className='icon-wrapper'>
          <ShoppingCartOutlinedIcon onMouseEnter={() => setShowCart(true)} />
          <span className='count'>{store?.Carts.cartProduct.quantity}</span>
        </div>
        <div>
          <p>Shopping Cart:</p>
          <p className='amount'>৳{price === 0 ? `${price}.00` : price}</p>
        </div>
        {showCart && <CartProduct setShowCart={setShowCart} />}
      </div>
    </>
  );
};

export default CallCart;
