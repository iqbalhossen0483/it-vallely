import Input from "../../../shared/utilitize/Input";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import React, { Dispatch, useEffect } from "react";
import AddSpecification from "./AddSpecification";
import { Box } from "@mui/material";
import StepperBtn from "./StepperBtn";
export type Specification = {
  showInput: boolean;
  inputValue: string;
  arr: any[];
};
type Props = {
  specifications: Specification;
  setSpecifications: Dispatch<React.SetStateAction<Specification>>;
  step: number;
  setStep: Dispatch<React.SetStateAction<number>>;
  productData: {} | Product;
  setProductData: Dispatch<React.SetStateAction<{} | Product>>;
  productAdded: boolean;
};

const Features = (props: Props) => {
  const { register, handleSubmit, reset } = useForm<any>();
  const {
    specifications,
    setSpecifications,
    step,
    setStep,
    setProductData,
    productData,
    productAdded,
  } = props;

  function onsubmit(data: any) {
    data.specifications = [];
    if (specifications.arr.length) {
      for (const item of specifications.arr) {
        const itemArray: any = data[item].replaceAll(" | ", ": ").split(": ");
        let obj: any = { header: item };
        let i = 0;
        while (i < itemArray.length) {
          obj[itemArray[i]] = itemArray[i + 1];
          i += 2;
        }
        data.specifications.push(obj);
        delete data[item];
      }
    }
    setProductData({ ...productData, ...data });
    setStep((prev) => prev + 1);
  }

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productAdded]);

  function deleteSpecification(label: string) {
    const exist = specifications.arr.filter((item) => item !== label);
    setSpecifications((prev) => {
      return {
        inputValue: prev.inputValue,
        showInput: prev.showInput,
        arr: exist,
      };
    });
  }

  function handleSpecifications(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (specifications.inputValue.length > 0) {
        setSpecifications((prev) => {
          return {
            showInput: false,
            inputValue: "",
            arr: [...prev.arr, prev.inputValue],
          };
        });
      }
    }
  }

  return (
    <Box
      component='form'
      sx={{ display: step == 2 ? "block" : "none" }}
      className='h-full space-y-3'
      onSubmit={handleSubmit(onsubmit)}
    >
      <Input
        {...register("tags", { required: true })}
        className='col-span-2'
        multiline
        required
        fullWidth
        maxRows={5}
        label='Tags'
      />
      <Input
        {...register("keyFeatures", { required: true })}
        className='col-span-2'
        multiline
        required
        fullWidth
        maxRows={5}
        label='keyFeatures'
      />
      {specifications.arr.map((item, index) => (
        <div key={index} className='specification-input-container'>
          <Input
            {...register(item, { required: true })}
            className='col-span-2'
            label={`${item}, give input like key: value | key:value`}
            required={true}
            fullWidth
            multiline
            maxRows={7}
          />
          <CloseIcon onClick={() => deleteSpecification(item)} />
        </div>
      ))}

      {/* input for adding specification start */}
      <AddSpecification
        handleSpecifications={handleSpecifications}
        setSpecifications={setSpecifications}
        specifications={specifications}
      />

      <StepperBtn step={step} setStep={setStep} />
    </Box>
  );
};

export default Features;
