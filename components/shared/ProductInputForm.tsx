import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./utilitize/Input";

type Props = { actionType: string; onSubmit: (peyLoad: Product) => void };
type Specifications = ["keyFeatures"];
type CMB = ["category", "tags"];

const ProductInputForm = ({ actionType, onSubmit }: Props) => {
  const [specificationsInput, setSpecificationsInput] = useState<string>("");
  const [showspecificationsInput, setShowSpecificationsInput] = useState(false);
  const [isRequired, setIsRequired] = useState<boolean>(true);
  const { handleSubmit, register } = useForm<Product>();
  const [cmb] = useState<CMB>(["category", "tags"]);
  const [specifications, setSpecifications] = useState<Specifications>([
    "keyFeatures",
  ]);

  useEffect(() => {
    if (actionType === "add") {
      setIsRequired(true);
    } else if (actionType === "update") {
      setIsRequired(false);
    }
  }, [actionType]);

  function Submit(data: Product) {
    onSubmit(data);
  }

  function handleSpecifications(key: string) {
    if (key === "Enter") {
      if (specificationsInput.length > 0) {
        setShowSpecificationsInput(false);
      }
    }
  }

  return (
    <form className='product-input-form-container'>
      <Input
        {...register("name", { required: isRequired })}
        label='Product name'
        className='col-span-2'
        multiline
        fullWidth
        required={isRequired}
        type='text'
      />
      <Input
        {...register("price", { required: isRequired })}
        label='Product price'
        fullWidth
        required={isRequired}
        type='number'
      />
      <Input
        {...register("prevPrice")}
        label='Previous price'
        fullWidth
        type='number'
      />
      {cmb.map((item) => (
        <Input
          key={item}
          {...register(item, { required: isRequired })}
          label={item}
          fullWidth
          required={isRequired}
          type='text'
        />
      ))}
      <input
        {...register("pImg", { required: isRequired })}
        className='file'
        type='file'
        accept='image/*'
      />
      <input
        {...register("gImg", { required: isRequired })}
        type='file'
        className='file'
        multiple
        accept='image/*'
      />
      {specifications.map((item) => (
        <Input
          key={item}
          {...register(item, {
            required: isRequired,
          })}
          className='col-span-2'
          label={item}
          fullWidth
          required={isRequired}
          type='text'
          multiline
        />
      ))}

      {/* input for adding specification start */}
      <div
        className={`specification-input ${
          showspecificationsInput ? "block" : "hidden"
        }`}
      >
        <Input
          label='Heading'
          required
          fullWidth
          value={specificationsInput}
          onKeyDown={(e) => handleSpecifications(e.key)}
          onChange={(e) => setSpecificationsInput(e.target.value)}
        />
      </div>
      <Button
        onClick={() => setShowSpecificationsInput(!showspecificationsInput)}
        variant='outlined'
      >
        More
      </Button>
      {/* input for adding specification end */}

      <Input
        {...register("description", {
          required: isRequired,
        })}
        className='col-span-2'
        label={"Description"}
        fullWidth
        required={isRequired}
        type='text'
        multiline
      />
      <Button
        className='submit-btn'
        disabled={!isRequired}
        onClick={handleSubmit(Submit)}
        variant='contained'
      >
        {actionType} product
      </Button>
    </form>
  );
};

export default ProductInputForm;
