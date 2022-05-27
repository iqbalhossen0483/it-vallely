import React from "react";
interface Props {
  value: number;
  index: number;
}
const Deshboard = ({ value, index }: Props) => {
  return (
    <div className={`${value !== index ? "hidden" : "block"}`}>deshboard</div>
  );
};

export default Deshboard;
