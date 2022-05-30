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
  const { handleSubmit, reset, control } = useForm<any>();
  const router = useRouter();
  const store = useStore();

  useEffect(() => {
    (async () => {
      if (router.query.id) {
        const res = await fetchAPI<Product>(
          `/api/product?id=${router.query.id}`
        );
        if (res.data) {
          setProductInputs(null);
          MakeInputDataForUpdateProduct(res.data, setProductInputs);
        }
      }
    })();
  }, [router.query.id]);

  async function OnSubmit(peyLoad: any) {
    console.log(peyLoad);
  }

  return (
    <div hidden={value !== index} style={{ width: "70%" }}>
      <form
        onReset={() => reset()}
        onSubmit={handleSubmit(OnSubmit)}
        className='product-input-form-container'
      >
        {productInputs &&
          productInputs?.others.map((inputValue, index) => (
            <Controller
              control={control}
              key={index}
              name={inputValue.label}
              defaultValue={inputValue.defaltValue}
              render={({ field }) => (
                <Input
                  {...field}
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
              )}
            />
          ))}
        <Controller
          name='pImg'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <input {...field} className='file' type='file' accept='image/*' />
          )}
        />
        <Controller
          control={control}
          name='gImg'
          defaultValue=''
          render={({ field }) => (
            <input
              {...field}
              type='file'
              className='file'
              multiple
              max={3}
              accept='image/*'
            />
          )}
        />
        {productInputs &&
          productInputs?.specipications.map((item, index) => (
            <Controller
              key={index}
              name={item.label}
              control={control}
              defaultValue={item.defaltValue}
              render={({ field }) => (
                <Input
                  {...field}
                  className='col-span-2'
                  label={item.label}
                  type={item.type}
                  focused
                  fullWidth
                  multiline
                  maxRows={15}
                />
              )}
            />
          ))}
        <Button type='submit' variant='contained' className='submit-btn'>
          update product
        </Button>
        <Button type='reset' variant='contained' className='submit-btn'>
          reset
        </Button>
      </form>
    </div>
  );
};

export default UpdateProduct;
