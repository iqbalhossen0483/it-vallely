import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Container } from "@mui/material";
import Input from "./utilitize/Input";

type Props = {
  onSubmit: (data: any) => Promise<{ error: boolean }>;
};
type Specification = {
  showInput: boolean;
  inputValue: string;
  arr: any[];
};
type InputItem = {
  label:
    | "name"
    | "price"
    | "prevPrice"
    | "stock"
    | "category"
    | "productCode"
    | "brand"
    | "tags"
    | "keyFeatures";
  type: "text" | "number";
};

const ProductInputForm = ({ onSubmit }: Props) => {
  const { handleSubmit, register, reset } = useForm<Product>();
  const [disable, setDisable] = useState(false);
  const [specifications, setSpecifications] = useState<Specification>({
    showInput: false,
    inputValue: "",
    arr: [],
  });
  const inputItem: InputItem[] = [
    { label: "name", type: "text" },
    { label: "price", type: "number" },
    { label: "prevPrice", type: "number" },
    { label: "stock", type: "number" },
    { label: "category", type: "text" },
    { label: "productCode", type: "text" },
    { label: "brand", type: "text" },
    { label: "tags", type: "text" },
    { label: "keyFeatures", type: "text" },
  ];

  async function Submit(data: any) {
    setDisable(true);
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
    const { error } = await onSubmit(data);
    if (!error) {
      reset();
      setSpecifications(() => {
        return {
          showInput: false,
          inputValue: "",
          arr: [],
        };
      });
    }
    setDisable(false);
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
    <Container sx={{ position: "relative" }}>
      <form
        onSubmit={handleSubmit(Submit)}
        className='product-input-form-container'
      >
        {inputItem.map((item, index) => (
          <Input
            key={index}
            {...register(item.label, { required: true })}
            className={`${
              (item.label === "name" ||
                item.label === "tags" ||
                item.label === "keyFeatures") &&
              "col-span-2"
            }`}
            type={item.type}
            label={item.label}
            multiline={
              item.label === "name" ||
              item.label === "tags" ||
              item.label === "keyFeatures"
                ? true
                : false
            }
            fullWidth
            maxRows={
              item.label === "name" ||
              item.label === "tags" ||
              item.label === "keyFeatures"
                ? 5
                : 1
            }
            required={true}
          />
        ))}
        <input
          {...register("pImg", { required: true })}
          className='file'
          accept='image/*'
          type='file'
        />
        <input
          {...register("gImg", { required: true })}
          type='file'
          className='file'
          accept='image/*'
          multiple
        />
        {specifications.arr.map((item, index) => (
          <Input
            key={index}
            {...register(item, { required: true })}
            className='col-span-2'
            label={`${item}, give input like key: value | key:value`}
            required={true}
            fullWidth
            multiline
            maxRows={7}
          />
        ))}
        <Input
          {...register("description", { required: true })}
          style={{ marginTop: "70px" }}
          className='col-span-2'
          label={"Description"}
          required={true}
          multiline
          maxRows={15}
          fullWidth
        />
        <Button
          className='submit-btn'
          type='submit'
          disabled={disable}
          variant='contained'
        >
          Add product
        </Button>
      </form>

      {/* input for adding specification start */}
      <div className='specification-form'>
        <div
          hidden={!specifications.showInput}
          className={`specification-input`}
        >
          <Input
            label='Heading'
            required
            fullWidth
            value={specifications.inputValue}
            onKeyDown={(e) => handleSpecifications(e)}
            onChange={(e) =>
              setSpecifications((prev) => {
                return {
                  showInput: prev.showInput,
                  inputValue: e.target.value,
                  arr: prev.arr,
                };
              })
            }
          />
        </div>
        <Button
          onClick={() =>
            setSpecifications((prev) => {
              return {
                showInput: !prev.showInput,
                inputValue: prev.inputValue,
                arr: prev.arr,
              };
            })
          }
          variant='outlined'
        >
          More Features
        </Button>
      </div>
      {/* input for adding specification end */}
    </Container>
  );
};

export default ProductInputForm;
