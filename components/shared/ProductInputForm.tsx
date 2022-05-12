import { Button } from "@mui/material";
import React, { KeyboardEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./utilitize/Input";

type TagAndFeature = { tags: string[] | []; features: string[] | [] };
type Text = { tag: string; feature: string };
type Props = { actionType: string; onSubmit: (peyLoad: Product) => void };

const ProductInputForm = ({ actionType, onSubmit }: Props) => {
  const [text, setText] = useState<Text>({ tag: "", feature: "" });
  const { handleSubmit, register } = useForm<Product>();
  const [isRequired, setIsRequired] = useState<boolean>(true);
  const [tagAndFeature, setTagAndFeature] = useState<TagAndFeature>({
    tags: [],
    features: [],
  });

  useEffect(() => {
    if (actionType === "add") {
      setIsRequired(true);
    } else if (actionType === "update") {
      setIsRequired(false);
    }
  }, [actionType]);

  // feature and tag input handler start....
  function handleInput(value: string, action: string) {
    if (action === "tag") {
      setText({ tag: value, feature: text.feature });
    } else if (action === "feature") {
      setText({ tag: text.tag, feature: value });
    }
  }
  function handleKeyboard(e: KeyboardEvent<HTMLDivElement>, action: string) {
    if (e.key === "Enter") {
      if (!text.feature && !text.tag) {
        return;
      } else if (action === "tag") {
        setTagAndFeature({
          tags: [...tagAndFeature.tags, text.tag],
          features: [...tagAndFeature.features],
        });
        setText({ tag: "", feature: text.feature });
      } else if (action === "feature") {
        setTagAndFeature({
          tags: [...tagAndFeature.tags],
          features: [...tagAndFeature.features, text.feature],
        });
        setText({ tag: text.tag, feature: "" });
      }
    }
  } // end;;;

  function Submit(data: Product) {
    data.keyFeatures = tagAndFeature.features;
    data.tags = tagAndFeature.tags;
    onSubmit(data);
  }
  return (
    <form className='product-input-form-container'>
      <Input
        {...register("name", { required: isRequired })}
        label='Product name'
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
      <Input
        {...register("category", { required: isRequired })}
        label='Product category'
        fullWidth
        required={isRequired}
        type='text'
      />
      <Input
        {...register("model", { required: isRequired })}
        label='Product model'
        fullWidth
        required={isRequired}
        type='text'
      />
      <Input
        {...register("brand", { required: isRequired })}
        label='Brand'
        required={isRequired}
        fullWidth
        type='text'
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
      {tagAndFeature.features.length ? (
        <div className='tag-and-feature'>
          {tagAndFeature.features.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </div>
      ) : tagAndFeature.tags.length ? (
        <div></div>
      ) : null}
      {tagAndFeature.tags.length ? (
        <div className='tag-and-feature'>
          {tagAndFeature.tags.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </div>
      ) : tagAndFeature.features.length ? (
        <div></div>
      ) : null}
      <Input
        {...register("keyFeatures", {
          required: tagAndFeature.features.length < 1 && isRequired,
        })}
        onChange={(e) => handleInput(e.target.value, "feature")}
        onKeyDown={(e) => handleKeyboard(e, "feature")}
        label='Key Features'
        value={text.feature}
        fullWidth
        required={tagAndFeature.features.length < 1 && isRequired}
        type='text'
      />
      <Input
        {...register("tags", {
          required: tagAndFeature.tags.length < 1 && isRequired,
        })}
        onChange={(e) => handleInput(e.target.value, "tag")}
        onKeyDown={(e) => handleKeyboard(e, "tag")}
        label='Tags'
        value={text.tag}
        required={tagAndFeature.tags.length < 1 && isRequired}
        fullWidth
        type='text'
      />
      <Input
        className='col-span-2'
        {...register("description", { required: isRequired })}
        label='Description'
        multiline
        fullWidth
        required={isRequired}
        type='text'
      />
      <Button
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
