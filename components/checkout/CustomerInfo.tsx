import { useRouter } from "next/router";
import React, { RefObject } from "react";
import { useForm } from "react-hook-form";
import useStore from "../../contex/hooks/useStore";
import Input from "../shared/utilitize/Input";

type Props = {
  customerInfoForm: RefObject<HTMLButtonElement>;
  delivary: string;
  paymentMethods: string;
  products: Product[] | null;
  discount: number | null;
};

const CustomerInfo = ({
  customerInfoForm,
  delivary,
  paymentMethods,
  products,
  discount,
}: Props) => {
  const { register, handleSubmit } = useForm<OrderInfo>();
  const store = useStore();
  const router = useRouter();

  function onSubmit(peyload: OrderInfo) {
    const delivaryCost = delivary === "home" ? 100 : 0;
    let subTotal = 0;
    for (const product of products!) {
      const price = product.quantity
        ? parseInt(product.price) * product.quantity
        : parseInt(product.price);
      subTotal += price;
    }
    peyload.delivaryMethod = delivary;
    peyload.paymentMethod = paymentMethods;
    peyload.products = products;
    peyload.subTotal = subTotal;
    peyload.delivaryCost = delivaryCost;
    if (discount) {
      peyload.discount = discount;
    }
    peyload.total = discount
      ? subTotal + delivaryCost - discount
      : subTotal + delivaryCost;

    if (paymentMethods === "cash") {
      postOrder(peyload);
    } else {
      
    }
  }

  async function postOrder(peyload: OrderInfo) {
    const res = await fetch("/api/order", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(peyload),
    });
    if (res.ok) {
      store?.State.setAlert("Order placed successfully");
      if (router.query.multiple) {
        localStorage.removeItem("cart");
        store?.Carts.setCartProduct((prev) => {
          return { price: 0, products: null, quantity: 0 };
        });
      }
      router.push("/");
    } else {
      const data = await res.json();
      store?.State.setAlert(data.message);
    }
  }

  return (
    <div className='customer-info'>
      <h3>Customer Information</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-2 gap-3'>
          <Input
            {...register("lname", { required: true })}
            required
            label='First Name'
          />
          <Input
            {...register("fname", { required: true })}
            required
            label='Last Name'
          />
        </div>
        <Input
          {...register("address", { required: true })}
          multiline
          required
          label='Address'
        />
        <Input
          {...register("mobile", { required: true })}
          required
          label='Mobile'
        />
        <Input {...register("email", { required: true })} label='Email' />
        <Input {...register("comment")} multiline minRows={5} label='Comment' />
        <button ref={customerInfoForm} hidden>
          submit
        </button>
      </form>
    </div>
  );
};

export default CustomerInfo;
