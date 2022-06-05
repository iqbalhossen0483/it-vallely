import useStore from "../../contex/hooks/useStore";
import Input from "../shared/utilitize/Input";
import { useForm } from "react-hook-form";
import React, { RefObject } from "react";
import { useRouter } from "next/router";

type Props = {
  customerInfoForm: RefObject<HTMLButtonElement>;
  delivary: string;
  paymentMethods: string;
  products: OrderedProducts[] | null;
  discount: number | null;
};

const CustomerInfo = ({
  customerInfoForm,
  delivary,
  paymentMethods,
  products,
  discount,
}: Props) => {
  const store = useStore();
  const { register, handleSubmit } = useForm<OrderInfo>({
    defaultValues: { email: store?.firebase.user?.email || "" },
  });
  const router = useRouter();

  function onSubmit(peyload: OrderInfo) {
    store?.State.setLoading(true);

    if (peyload.mobile.length < 11 || peyload.mobile.length > 11) {
      store?.State.setAlert("Phone number is invalid");
      store?.State.setLoading(false);
      return;
    }
    const delivaryCost = delivary === "home" ? 100 : 0;
    let subTotal = 0;
    for (const product of products!) {
      const price = product.quantity
        ? product.price * product.quantity
        : product.price;
      subTotal += price;
    }
    peyload.paymentMethod = paymentMethods;
    peyload.delivaryCost = delivaryCost;
    peyload.delivaryMethod = delivary;
    peyload.products = products;
    peyload.subTotal = subTotal;
    peyload.status = "Pending";
    if (discount) {
      peyload.discount = discount;
    }
    peyload.total = discount
      ? subTotal + delivaryCost - discount
      : subTotal + delivaryCost;

    if (paymentMethods === "cash") {
      if (router.query.productId) {
        postOrder(peyload, `/api/order?id=${router.query.productId}`);
      } else {
        postOrder(peyload, `/api/order?multiple=true`);
      }
    } else {
      store?.State.setOrderInfo(peyload);
      router.push(
        `/checkout/payment${router.query?.multiple ? "?multiple=true" : ""}`
      );
    }
    store?.State.setLoading(false);
  }

  async function postOrder(peyload: OrderInfo, url: string) {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(peyload),
    });
    const data = await res.json();
    if (res.ok) {
      if (data.insertedId) {
        store?.State.setAlert("Order placed successfully");
        peyload._id = data.insertedId;
        store?.State.setOrderInfo(peyload);
        if (router.query.multiple) {
          localStorage.removeItem("cart");
          store?.Carts.setCartProduct((prev) => {
            return { price: 0, products: null, quantity: 0 };
          });
        }
        router.push("/checkout/orderPlaced");
      } else {
        store?.State.setAlert("Something went wrong");
      }
    } else {
      store?.State.setAlert(data.message);
    }
  }

  return (
    <div className='customer-info'>
      <h3>Customer Information</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-2 gap-3'>
          <Input
            {...register("fname", { required: true })}
            required
            label='First Name'
          />
          <Input
            {...register("lname", { required: true })}
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
          type={"number"}
        />
        <Input {...register("email")} disabled label='Email' type={"email"} />
        <Input {...register("comment")} multiline minRows={5} label='Comment' />
        <button ref={customerInfoForm} hidden>
          submit
        </button>
      </form>
    </div>
  );
};

export default CustomerInfo;
