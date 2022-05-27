import React from "react";
interface Props {
  value: number;
  index: number;
}
const ManageProduct = ({ value, index }: Props) => {
  return <div hidden={value !== index}>ManageProduct shala</div>;
};

export default ManageProduct;
