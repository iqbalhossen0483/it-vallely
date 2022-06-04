import React from "react";
interface Props {
  value: number;
  index: number;
}
const Profile = ({ value, index }: Props) => {
  return <div hidden={value !== index}>profile</div>;
};

export default Profile;
