import useStore from "../../contex/hooks/useStore";
import Input from "../shared/utilitize/Input";
import { useForm } from "react-hook-form";
import React, { RefObject, useState } from "react";
import { useRouter } from "next/router";
import { Checkbox, FormControlLabel, Paper } from "@mui/material";
import PostOrder from "./services/PostOrder";

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
  const [agreeTerms, setAgreeTerms] = useState(false);
  const router = useRouter();

  function onSubmit(peyload: OrderInfo) {
    store?.State.setLoading(true);
    //check user agree with terms & conditions;
    if (!agreeTerms) {
      store?.State.setAlert(
        "Please agree with our terms & conditions, Or read about this"
      );
      store?.State.setLoading(false);
      return;
    }

    //check is mobile number is valid;
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
      PostOrder(peyload, store, router);
    } else {
      store?.State.setOrderInfo(peyload);
      router.push(
        `/checkout/payment${router.query?.multiple ? "?multiple=true" : ""}`
      );
      store?.State.setLoading(false);
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
          type='text'
        />
        <Input {...register("email")} disabled label='Email' type={"email"} />
        <Input {...register("comment")} multiline minRows={5} label='Comment' />
        <button disabled={store?.State.loading} ref={customerInfoForm} hidden>
          submit
        </button>
      </form>
      <FormControlLabel
        onChange={(e, value) => setAgreeTerms(value)}
        className={`${agreeTerms ? "text-mui" : "text-primary"}`}
        control={<Checkbox />}
        label='Agree with Terms & Conditions'
      />
      <div>
        <b>This product will possibly be delivered within 5 days</b>
      </div>
    </div>
  );
};

export default CustomerInfo;
