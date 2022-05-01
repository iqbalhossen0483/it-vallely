import React from "react";
interface Props {
  value: number;
  index: number;
}
const ManageUser = ({ value, index }: Props) => {
  return <div hidden={value !== index}>ManageUser</div>;
};

export default ManageUser;
