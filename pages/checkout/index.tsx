import CustomerInfo from "../../components/checkout/CustomerInfo";
import DelivaryInfo from "../../components/checkout/DelivaryInfo";
import PaymentInfo from "../../components/checkout/PaymentInfo";
import { fetchAPI } from "../../services/shared/sharedFunction";
import React, { useEffect, useRef, useState } from "react";
import useStore from "../../contex/hooks/useStore";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import Input from "../../components/shared/utilitize/Input";
import OrderReview from "../../components/checkout/OrderReview";
import { useForm } from "react-hook-form";

const Order = () => {
  const [paymentMethods, setPaymentMethods] = useState<string>("cash");
  const { register, handleSubmit, reset } = useForm<{ copon: string }>();
  const [products, setProducts] = useState<Product[] | null>(null);
  const [discount, setDiscount] = useState<number | null>(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [delivary, setDelivary] = useState<string>("home");
  const customerInfoForm = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const store = useStore();

  const { productId, multiple, q } = router.query;
  const coponData = [{ copon: "itvallely", discount: 1000 }];

  useEffect(() => {
    if (productId) {
      (async function () {
        const res = await fetchAPI<Product>(`/api/product?id=${productId}`);
        if (res.data) {
          if (q) {
            res.data.quantity = parseInt(q as string);
          }
          setProducts([res.data]);
        }
      })();
    } else if (multiple) {
      if (store?.Carts.cartProduct.products) {
        setProducts(store?.Carts.cartProduct.products);
      }
    }
  }, [multiple, productId, store, q]);

  function handleCopon(data: { copon: string }) {
    const checkingCopon = coponData.find((item) => item.copon === data.copon);
    if (totalAmount < 3000) {
      setDiscount(null);
    } else if (checkingCopon) {
      setDiscount(checkingCopon.discount);
      reset();
    } else {
      store?.State.setAlert("promo/copon code is invalid");
      setDiscount(null);
    }
  }

  return (
    <div className='checkout-container'>
      <h3>Checkout</h3>
      <CustomerInfo
        customerInfoForm={customerInfoForm}
        delivary={delivary}
        paymentMethods={paymentMethods}
        products={products}
        discount={discount}
      />
      <PaymentInfo setPaymentMethod={setPaymentMethods} />
      <DelivaryInfo setDelivary={setDelivary} />

      <div className='voucher-and-copon'>
        <form>
          <Input label='Gift Voucher' />
          <Button sx={{ padding: "10px 12px" }} variant='outlined'>
            apply voucher
          </Button>
        </form>

        {/* copon */}
        <form onSubmit={handleSubmit(handleCopon)}>
          <Input
            {...register("copon", { required: true })}
            required
            disabled={totalAmount < 3000 || discount !== null}
            label='Promo / Copon Code'
          />
          <Button
            type='submit'
            sx={{ padding: "10px 12px" }}
            variant='outlined'
          >
            apply copon
          </Button>
        </form>
      </div>

      <OrderReview
        product={products}
        customerInfoForm={customerInfoForm}
        delivary={delivary}
        discount={discount}
        setTotalAmount={setTotalAmount}
      />
    </div>
  );
};

export default Order;
