import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import Input from "./utilitize/Input";
import { useRouter } from "next/router";

type Props = {
  actionType: string;
  onSubmit: (data: any) => Promise<{ error: boolean }>;
  product: Product | null;
};

const ProductInputForm = ({ actionType, onSubmit, product }: Props) => {
  const [showspecificationsInput, setShowSpecificationsInput] = useState(false);
  const [specificationsInput, setSpecificationsInput] = useState<string>("");
  const [specifications, setSpecifications] = useState<any[]>([]);
  const { handleSubmit, register, reset } = useForm<any>();
  const [isRequired, setIsRequired] = useState(true);
  const [disable, setDisable] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (actionType === "add") {
      setIsRequired(true);
    } else if (actionType === "update") {
      setIsRequired(false);
    }
  }, [actionType]);
  useEffect(() => {
    if (router.query.id) {
      const specification: any = [];
      product?.specifications.forEach((item: any) => {
        specification.push(item.header);
      });
      setSpecifications(specification);
    }
  }, [router.query, product]);

  async function Submit(data: any) {
    setDisable(true);
    if (specifications.length) {
      data.specifications = [];
      for (const item of specifications) {
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
      setSpecifications([]);
    }
    setDisable(false);
  }

  function handleSpecifications(key: string) {
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
        className='col-span-2'
        label='Product name'
        multiline
        fullWidth
        focused={product ? true : false}
        defaultValue={product?.name || ""}
        required={isRequired}
      />
      <Input
        {...register("price", {
          required: isRequired,
        })}
        label='price'
        defaultValue={product?.price || ""}
        focused={product ? true : false}
        required={isRequired}
        fullWidth
        type='number'
      />
      <Input
        {...register("prevPrice", {
          required: isRequired,
        })}
        label='prev price'
        fullWidth
        defaultValue={product?.prevPrice || ""}
        focused={product ? true : false}
        required={isRequired}
        type='number'
      />
      <Input
        {...register("stock", {
          required: isRequired,
        })}
        label='stock'
        defaultValue={product?.stock || ""}
        focused={product ? true : false}
        required={isRequired}
        fullWidth
        type='number'
      />
      <Input
        {...register("category", { required: isRequired })}
        label='category'
        focused={product ? true : false}
        defaultValue={product?.category || ""}
        required={isRequired}
        fullWidth
      />
      <Input
        {...register("productCode", { required: isRequired })}
        label='product code'
        focused={product ? true : false}
        defaultValue={product?.productCode || ""}
        required={isRequired}
        fullWidth
      />
      <Input
        {...register("brand", { required: isRequired })}
        label='brand'
        focused={product ? true : false}
        defaultValue={product?.brand || ""}
        required={isRequired}
        fullWidth
      />
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
        focused={product ? true : false}
        defaultValue={`${product?.tags?.join(" | ") || ""}`}
        required={isRequired}
        multiline
        fullWidth
      />
      <Input
        {...register("keyFeatures", {
          required: isRequired,
        })}
        className='col-span-2'
        label='keyFeatures, give input like key | key | key'
        focused={product ? true : false}
        required={isRequired}
        defaultValue={`${product?.keyFeatures?.join(" | ") || ""}`}
        multiline
        fullWidth
      />
      {specifications.map((item, index) => (
        <Input
          key={index}
          {...register(item, {
            required: isRequired,
          })}
          className='col-span-2'
          label={`${item}, give input like key: value | key:value`}
          focused={product ? true : false}
          required={isRequired}
          defaultValue='default'
          fullWidth
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
        required={isRequired}
        focused={product ? true : false}
        defaultValue={product?.description || ""}
        multiline
        fullWidth
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
