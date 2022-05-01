import React from "react";
interface Props {
  value: number;
  index: number;
}
const Deshboard = ({ value, index }: Props) => {
  return <div hidden={value !== index}>deshboard</div>;
};

export default Deshboard;
