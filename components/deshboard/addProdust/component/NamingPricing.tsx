import { Box, Grid } from "@mui/material";
import React, { Dispatch, useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../../../shared/utilitize/Input";
import StepperBtn from "./StepperBtn";

type InputItem = {
  label:
    | "name"
    | "price"
    | "prevPrice"
    | "stock"
    | "category"
    | "productCode"
    | "brand";
  type: "text" | "number";
};

type Props = {
  step: number;
  setStep: Dispatch<React.SetStateAction<number>>;
  productData: {} | Product;
  setProductData: Dispatch<React.SetStateAction<{} | Product>>;
  productAdded: boolean;
};

const NamingPricing = (props: Props) => {
  const { step, setStep, setProductData, productData, productAdded } = props;
  const { register, handleSubmit, reset } = useForm<Product>();
  const inputItem: InputItem[] = [
    { label: "name", type: "text" },
    { label: "price", type: "number" },
    { label: "prevPrice", type: "number" },
    { label: "stock", type: "number" },
    { label: "category", type: "text" },
    { label: "productCode", type: "text" },
    { label: "brand", type: "text" },
  ];

  function onsubmit(data: Product) {
    setProductData({ ...productData, ...data });
    setStep((prev) => prev + 1);
  }

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productAdded]);

  return (
    <Box
      component='form'
      sx={{ display: step == 0 ? "block" : "none" }}
      onSubmit={handleSubmit(onsubmit)}
    >
      <Grid container spacing={2}>
        {inputItem.map((item, index) => (
          <Grid key={index} item xs={item.label === "name" ? 12 : 6}>
            <Input
              {...register(item.label, { required: true })}
              type={item.type}
              label={item.label}
              multiline={item.label === "name" ? true : false}
              fullWidth
              maxRows={item.label === "name" ? 5 : 1}
              required={true}
            />
          </Grid>
        ))}
      </Grid>
      <StepperBtn step={step} setStep={setStep} />
    </Box>
  );
};

export default NamingPricing;
