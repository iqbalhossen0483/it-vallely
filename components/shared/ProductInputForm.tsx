import { makeInputDataForAddProduct } from "../../services/updateProduct/makeInputData";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Box } from "@mui/material";
import Input from "./utilitize/Input";

type Props = {
  onSubmit: (data: any) => Promise<{ error: boolean }>;
};
type Specification = {
  showInput: boolean;
  inputValue: string;
  arr: any[];
};

const ProductInputForm = ({ onSubmit }: Props) => {
  const { handleSubmit, register, reset, control } = useForm<any>();
  const [disable, setDisable] = useState(false);
  const inputItem = makeInputDataForAddProduct();
  const [specifications, setSpecifications] = useState<Specification>({
    showInput: false,
    inputValue: "",
    arr: [],
  });

  async function Submit(data: any) {
    setDisable(true);
    if (specifications.arr.length) {
      data.specifications = [];
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
    <Box
      component={"form"}
      onClick={handleSubmit(Submit)}
      className='product-input-form-container'
    >
      {inputItem.map((item, index) => (
        <Controller
          name={item.label}
          key={index}
          control={control}
          rules={{ required: `Please give the ${item.label}` }}
          render={({ field }) => (
            <Input
              {...field}
              className={`${
                (item.label === "name" ||
                  item.label === "tags" ||
                  item.label === "keyFeatures") &&
                "col-span-2"
              }`}
              type={item.type}
              label={item.label}
              multiline
              fullWidth
              maxRows={5}
              required={true}
            />
          )}
        />
      ))}

      <Controller
        name='pImg'
        control={control}
        rules={{ required: "Please give an image" }}
        render={({ field }) => (
          <input {...field} className='file' accept='image/*' type='file' />
        )}
      />
      <Controller
        name='gImg'
        control={control}
        rules={{ required: "Please give at least one image" }}
        render={({ field }) => (
          <input
            {...field}
            type='file'
            className='file'
            accept='image/*'
            multiple
            max={3}
          />
        )}
      />
      {specifications.arr.map((item, index) => (
        <Controller
          key={index}
          name={item}
          control={control}
          rules={{ required: "It is required" }}
          render={() => (
            <Input
              className='col-span-2'
              label={`${item}, give input like key: value | key:value`}
              required={true}
              fullWidth
              multiline
              maxRows={7}
            />
          )}
        />
      ))}

      {/* input for adding specification start */}
      <div
        className={`specification-input ${
          specifications.showInput ? "block" : "hidden"
        }`}
      >
        <Controller
          name='Heading'
          control={control}
          render={({ field }) => (
            <Input
              {...field}
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
          )}
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
      {/* input for adding specification end */}

      <Controller
        name='description'
        control={control}
        rules={{ required: "It is required" }}
        render={({ field }) => (
          <Input
            {...field}
            className='col-span-2'
            label={"Description"}
            required={true}
            multiline
            maxRows={15}
            fullWidth
          />
        )}
      />
      <Button
        className='submit-btn'
        type='submit'
        disabled={disable}
        variant='contained'
      >
        Add product
      </Button>
    </Box>
  );
};

export default ProductInputForm;
