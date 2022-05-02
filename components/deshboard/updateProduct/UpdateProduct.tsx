import React from "react";
import ProductInputForm from "../../shared/ProductInputForm";
interface Props {
  value: number;
  index: number;
}
const UpdateProduct = ({ value, index }: Props) => {
  function handleSubmit(peyLoad: Product) {
    console.log(peyLoad);
  }
  return (
    <div hidden={value !== index}>
      <ProductInputForm actionType='update' onSubmit={handleSubmit} />
    </div>
  );
};

export default UpdateProduct;
