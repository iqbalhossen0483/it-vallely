import { Box, Grid } from "@mui/material";
import React, { Dispatch, useEffect } from "react";
import { useForm } from "react-hook-form";
import useStore from "../../../../contex/hooks/useStore";
import StepperBtn from "./StepperBtn";
type Props = {
  step: number;
  setStep: Dispatch<React.SetStateAction<number>>;
  productData: {} | Product;
  setProductData: Dispatch<React.SetStateAction<{} | Product>>;
  productAdded: boolean;
};
const Images = (props: Props) => {
  const { step, setStep, setProductData, productData, productAdded } = props;
  const { register, handleSubmit, reset } = useForm<Product>();
  const store = useStore();

  function onsubmit(data: Product) {
    if (!data.pImg.length) {
      store?.State.setAlert({ msg: "Product Image requied", type: "warning" });
      return;
    } else if (!data.gImg.length) {
      store?.State.setAlert({
        msg: "Product gallery Image requied",
        type: "warning",
      });
      return;
    }
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
      sx={{ display: step == 1 ? "block" : "none" }}
      onSubmit={handleSubmit(onsubmit)}
    >
      <Grid container spacing={2}>
        <Grid item>
          <input
            {...register("pImg")}
            className='file'
            accept='image/*'
            type='file'
          />
        </Grid>
        <Grid item>
          <input
            {...register("gImg")}
            type='file'
            className='file'
            accept='image/*'
            multiple
          />
        </Grid>
      </Grid>
      <StepperBtn step={step} setStep={setStep} />
    </Box>
  );
};

export default Images;
