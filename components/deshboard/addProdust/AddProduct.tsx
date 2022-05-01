import React, { useState } from "react";
import Input from "../../shared/utilitize/Input";
interface Props {
  value: number;
  index: number;
}
type TagAndFeature = { tags: string[] | null; features: string[] | null };

const AddProduct = ({ value, index }: Props) => {
  const [text, setText] = useState<string>("");
  const [tagAndFeature, setTagAndFeature] = useState<TagAndFeature>({
    tags: null,
    features: null,
  });
  return (
    <div hidden={value !== index}>
      <form className='add-product-container'>
        <Input label='Product name' multiline fullWidth required type='text' />
        <Input label='Product price' fullWidth required type='number' />
        <Input label='Previous price' fullWidth type='number' />
        <Input label='Product category' fullWidth required type='text' />
        <Input label='Product model' fullWidth required type='text' />
        <Input label='Brand' required fullWidth type='text' />
        <Input type='file' fullWidth required />
        <Input
          type='file'
          required
          fullWidth
          inputProps={{
            multiple: true,
            accept: "image/*",
          }}
        />
        <Input label='Key Features' fullWidth required type='text' />
        <Input
          className=""
          onChange={(e) => setText(e.target.value)}
          label='Tags'
          required
          fullWidth
          type='text'
        />
        <Input
          className='col-span-2'
          label='Description'
          fullWidth
          required
          type='text'
          minRows={10}
          multiline
        />
      </form>
    </div>
  );
};

export default AddProduct;
