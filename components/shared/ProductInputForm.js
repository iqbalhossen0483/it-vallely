import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./utilitize/Input";

const ProductInputForm = ({ actionType, onSubmit }) => {
  const [showspecificationsInput, setShowSpecificationsInput] = useState(false);
  const [specificationsInput, setSpecificationsInput] = useState("");
  const [disable, setDisable] = useState(false);
  const [isRequired, setIsRequired] = useState(true);
  const { handleSubmit, register, reset } = useForm();
  const [pricesAndStock] = useState(["price", "prevPrice", "stock"]);
  const [ccb] = useState(["category", "productCode", "brand"]);
  const [specifications, setSpecifications] = useState([]);

  useEffect(() => {
    if (actionType === "add") {
      setIsRequired(true);
    } else if (actionType === "update") {
      setIsRequired(false);
    }
  }, [actionType]);

  async function Submit(data) {
    setDisable(true);
    if (specifications.length) {
      data.specifications = [];
      for (const item of specifications) {
        const itemArray = data[item].replaceAll(" | ", ": ").split(": ");
        let obj = { header: item };
        let i = 0;
        while (i < itemArray.length) {
          obj[itemArray[i]] = itemArray[i + 1];
          i += 2;
        }
        data.specifications.push(obj);
        delete data[item];
      }
    }
    await onSubmit(data);
    reset();
    setSpecifications([]);
    setDisable(false);
  }

  function handleSpecifications(key) {
    if (key === "Enter") {
      if (specificationsInput.length > 0) {
        setSpecifications([...specifications, specificationsInput]);
        setSpecificationsInput("");
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
      {pricesAndStock.map((item) => (
        <Input
          key={item}
          {...register(item, { required: isRequired })}
          label={item}
          fullWidth
          required={isRequired}
          type='number'
        />
      ))}
      {ccb.map((item) => (
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
      <Input
        {...register("tags", { required: isRequired })}
        className='col-span-2'
        label='tags, give input like tag | tag | tag'
        fullWidth
        required={isRequired}
        type='text'
      />
      <Input
        {...register("keyFeatures", {
          required: isRequired,
        })}
        className='col-span-2'
        label='keyFeatures, give input like key | key | key'
        fullWidth
        required={isRequired}
        type='text'
        multiline
      />
      {specifications.map((item, index) => (
        <Input
          key={index}
          {...register(item, {
            required: isRequired,
          })}
          className='col-span-2'
          label={`${item}, give input like key: value | key:value`}
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
        disabled={disable}
        onClick={handleSubmit(Submit)}
        variant='contained'
      >
        {actionType} product
      </Button>
    </form>
  );
};

export default ProductInputForm;
