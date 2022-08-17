import Input from "../../../shared/utilitize/Input";
import { useForm } from "react-hook-form";
import React, { Dispatch, useEffect, useState } from "react";
import StepperBtn from "./StepperBtn";
import { Box } from "@mui/material";
type Props = {
  step: number;
  setStep: Dispatch<React.SetStateAction<number>>;
  productData: {} | Product;
  addProduct(data: Product): Promise<void>;
  productAdded: boolean;
};
const Description = (props: Props) => {
  const { step, setStep, productData, addProduct, productAdded } = props;
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm<Product>();

  async function onsubmit(data: Product) {
    setLoading(true);
    await addProduct({ ...productData, ...data });
    setLoading(false);
  }

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productAdded]);

  return (
    <Box
      component='form'
      sx={{ display: step == 3 ? "block" : "none" }}
      onSubmit={handleSubmit(onsubmit)}
    >
      <Input
        {...register("description", { required: true })}
        className='col-span-2'
        label={"Description"}
        required={true}
        multiline
        minRows={10}
        fullWidth
      />
      <StepperBtn step={step} setStep={setStep} loading={loading} />
    </Box>
  );
};

export default Description;
