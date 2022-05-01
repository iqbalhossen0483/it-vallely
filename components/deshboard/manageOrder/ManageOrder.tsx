import React from "react";
interface Props {
  value: number;
  index: number;
}
const ManageOrder = ({ value, index }: Props) => {
  return <div hidden={value !== index}> ManageOrder</div>;
};

export default ManageOrder;
