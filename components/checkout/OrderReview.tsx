import React from "react";
import OverViewProducts from "../shared/OverViewProducts";

type Props = {
  product: Product[] | null;
  customerInfoForm: React.RefObject<HTMLButtonElement>;
  delivary: string;
  discount: number | null;
  setTotalAmount: React.Dispatch<React.SetStateAction<number>>;
};

const OrderReview = ({
  product,
  customerInfoForm,
  delivary,
  discount,
  setTotalAmount,
}: Props) => {
  function confirmOrder() {
    customerInfoForm.current?.click();
  }
  return (
    <div className='order-overview'>
      <h3>Order Overview</h3>

      <OverViewProducts
        product={product}
        action={confirmOrder}
        delivary={delivary}
        discount={discount}
        setTotalAmount={setTotalAmount}
      />
    </div>
  );
};

export default OrderReview;
