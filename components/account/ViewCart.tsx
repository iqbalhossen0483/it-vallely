import { useRouter } from "next/router";
import React from "react";
import useStore from "../../contex/hooks/useStore";
import OverViewProducts from "../shared/OverViewProducts";
interface Props {
  value: number;
  index: number;
}
const ViewCart = ({ value, index }: Props) => {
  const store = useStore();
  const router = useRouter();
  const cartProduct = store?.Carts.cartProduct.products;

  function goCheckoutPage() {
    router.push(`/checkout?multiple=true`);
  }
  return (
    <div
      className={`${cartProduct && "bg-gray-100 p-5 rounded"}`}
      hidden={value !== index}
    >
      {cartProduct && cartProduct.length ? (
        <div className='viewcart-container'>
          <h3>Shopping Cart</h3>
          {cartProduct !== undefined && (
            <OverViewProducts product={cartProduct} action={goCheckoutPage} />
          )}
        </div>
      ) : (
        <div className='empty-message'>
          <p>The cart is empty</p>
        </div>
      )}
    </div>
  );
};

export default ViewCart;
