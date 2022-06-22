import CustomerInfo from "../../components/checkout/CustomerInfo";
import DelivaryInfo from "../../components/checkout/DelivaryInfo";
import PaymentInfo from "../../components/checkout/PaymentInfo";
import { fetchAPI } from "../../clientServices/shared/sharedFunction";
import OrderReview from "../../components/checkout/OrderReview";
import Input from "../../components/shared/utilitize/Input";
import React, { useEffect, useRef, useState } from "react";
import useStore from "../../contex/hooks/useStore";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Button } from "@mui/material";

const Order = () => {
  const { register, handleSubmit, reset } = useForm<{ copon: string }>();
  const [paymentMethods, setPaymentMethods] = useState<string>("cash");
  const [products, setProducts] = useState<OrderedProducts[] | null>(null);
  const [discount, setDiscount] = useState<number | null>(null);
  const customerInfoForm = useRef<HTMLButtonElement>(null);
  const [delivary, setDelivary] = useState<string>("home");
  const [totalAmount, setTotalAmount] = useState(0);
  const router = useRouter();
  const store = useStore();

  const { productId, multiple, q } = router.query;
  const coponData = [{ copon: "itvallely", discount: 1000 }];

  useEffect(() => {
    if (productId) {
      (async function () {
        const res = await fetchAPI<Product>(`/api/product?id=${productId}`, {
          headers: {
            token: `${process.env.NEXT_PUBLIC_APP_TOKEN}`,
          },
        });
        if (res.data) {
          const product: OrderedProducts = {
            _id: res.data._id,
            quantity: parseInt(q as string) || 1,
            productImg: res.data.productImg,
            name: res.data.name,
            price: res.data.price,
            productCode: res.data.productCode,
          };
          setProducts([product]);
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
      store?.State.setAlert({
        msg: "promo/copon code is invalid",
        type: "error",
      });
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
            apply <span className='hideOnPhone'>voucher</span>
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
            apply <span className='hideOnPhone'>copon</span>
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
