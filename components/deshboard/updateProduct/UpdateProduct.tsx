import {
  MakeInputDataForUpdateProduct,
  ProductInputs,
} from "../../../services/updateProduct/makeInputData";
import { fetchAPI } from "../../../services/shared/sharedFunction";
import useStore from "../../../contex/hooks/useStore";
import React, { useEffect, useRef, useState } from "react";
import Input from "../../shared/utilitize/Input";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
interface Props {
  value: number;
  index: number;
}
const UpdateProduct = ({ value, index }: Props) => {
  const [productInputs, setProductInputs] = useState<ProductInputs | null>(
    null
  );
  const { handleSubmit, reset, control, register } = useForm<any>();
  const router = useRouter();
  const store = useStore();

  useEffect(() => {
    (async () => {
      if (router.query.id) {
        const res = await fetchAPI<Product>(
          `/api/product?id=${router.query.id}`
        );
        if (res.data) {
          reset();
          MakeInputDataForUpdateProduct(res.data, setProductInputs);
        }
      }
    })();
  }, [reset, router.query.id]);

  async function OnSubmit(peyLoad: any) {
    console.log(peyLoad);
  }

  return (
    <div hidden={value !== index} style={{ width: "70%" }}>
      <form
        onSubmit={handleSubmit(OnSubmit)}
        className='product-input-form-container'
      >
        {productInputs &&
          productInputs?.others.map((inputValue, index) => (
            <Input
              key={index}
              {...register(inputValue.label)}
              defaultValue={inputValue.defaltValue}
              label={`${inputValue.label} ${
                inputValue.label === "tags" ||
                inputValue.label === "keyFeatures"
                  ? ", give input like key: value | key:value"
                  : ""
              }`}
              className={`${
                (inputValue.label === "name" ||
                  inputValue.label === "tags" ||
                  inputValue.label === "keyFeatures") &&
                "col-span-2"
              }`}
              type={inputValue.type}
              focused
              fullWidth
              multiline
              maxRows={5}
            />
          ))}
        <input
          {...register("pImg")}
          className='file'
          type='file'
          accept='image/*'
        />
        <input
          {...register("gImg")}
          type='file'
          className='file'
          multiple
          max={3}
          accept='image/*'
        />

        {productInputs &&
          productInputs?.specipications.map((item, index) => (
            <Input
              key={index}
              {...register(item.label)}
              defaultValue={item.defaltValue}
              className='col-span-2'
              label={item.label}
              type={item.type}
              focused
              fullWidth
              multiline
              maxRows={15}
            />
          ))}
        <Button type='submit' variant='contained' className='submit-btn'>
          update product
        </Button>
      </form>
    </div>
  );
};

export default UpdateProduct;
