import OverViewProducts from "../shared/OverViewProducts";
import React from "react";

type Props = {
  setTotalAmount: React.Dispatch<React.SetStateAction<number>>;
  customerInfoForm: React.RefObject<HTMLButtonElement>;
  product: OrderedProducts[] | null;
  discount: number | null;
  delivary: string;
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
