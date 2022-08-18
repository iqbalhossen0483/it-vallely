import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import useStore from "../../../../../contex/hooks/useStore";
import { Dispatch, SetStateAction } from "react";
type Props = { setShowCart: Dispatch<SetStateAction<boolean>> };

const CallCart = ({ setShowCart }: Props) => {
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
          <ShoppingCartOutlinedIcon
            onMouseEnter={() => {
              if (setShowCart) setShowCart(true);
            }}
          />
          <span className='count'>{store?.Carts.cartProduct.quantity}</span>
        </div>
        <div>
          <p>Shopping Cart:</p>
          <p className='amount'>৳{price === 0 ? `${price}.00` : price}</p>
        </div>
      </div>
    </>
  );
};

export default CallCart;
