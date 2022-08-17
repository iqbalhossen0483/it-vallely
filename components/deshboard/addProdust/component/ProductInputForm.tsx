import { Box, Container, Step, StepLabel, Stepper } from "@mui/material";
import React, { useState } from "react";
import NamingPricing from "./NamingPricing";
import Images from "./Images";
import Features, { Specification } from "./Features";
import Description from "./Description";

type Props = {
  onSubmit: (data: any) => Promise<{ error: boolean }>;
};

const ProductInputForm = ({ onSubmit }: Props) => {
  const [step, setStep] = useState(0),
    steps = ["Naming & Pricing", "Images", "Features", "Descriptions"],
    [productData, setProductData] = useState<Product | {}>({}),
    [productAdded, setProductAdded] = useState(false),
    [specifications, setSpecifications] = useState<Specification>({
      showInput: false,
      inputValue: "",
      arr: [],
    });

  async function addProduct(data: Product) {
    const { error } = await onSubmit(data);
    if (!error) {
      setSpecifications(() => {
        return {
          showInput: false,
          inputValue: "",
          arr: [],
        };
      });
      setProductAdded((prev) => !prev);
    }
  }

  return (
    <Container sx={{ position: "relative", height: "100%" }}>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={step} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <br />
      <br />

      <Box sx={{ width: "100%", height: "100%" }}>
        <NamingPricing
          step={step}
          setStep={setStep}
          productData={productData}
          setProductData={setProductData}
          productAdded={productAdded}
        />
        <Images
          step={step}
          setStep={setStep}
          productData={productData}
          setProductData={setProductData}
          productAdded={productAdded}
        />
        <Features
          setSpecifications={setSpecifications}
          specifications={specifications}
          step={step}
          setStep={setStep}
          productData={productData}
          setProductData={setProductData}
          productAdded={productAdded}
        />
        <Description
          step={step}
          setStep={setStep}
          productData={productData}
          addProduct={addProduct}
          productAdded={productAdded}
        />
      </Box>
    </Container>
  );
};

export default ProductInputForm;
