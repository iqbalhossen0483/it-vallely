import { useRouter } from "next/router";
import React from "react";
import OverViewProducts from "../../components/shared/OverViewProducts";
import useStore from "../../contex/hooks/useStore";

const ViewCart = () => {
  const store = useStore();
  const router = useRouter();
  const cartProduct = store?.Carts.cartProduct.products;

  function goCheckoutPage() {
    router.push(`/checkout?multiple=true`);
  }
  return (
    <div className='bg-gray-100 py-7 px-5'>
      {cartProduct && cartProduct.length ? (
        <div className='viewcart-container'>
          <h3>Shopping Cart</h3>
          {cartProduct !== undefined && (
            <OverViewProducts product={cartProduct} action={goCheckoutPage} />
          )}
        </div>
      ) : (
        <div className='flex justify-center items-center h-32'>
          <p>The cart is empty</p>
        </div>
      )}
    </div>
  );
};

export default ViewCart;