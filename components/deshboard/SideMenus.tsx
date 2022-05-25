import { Tab, Tabs } from "@mui/material";
import React from "react";

type Props = { value: number; setValue: (prev: number) => void };

const SideMenus = ({ value, setValue }: Props) => {
  const menus = [
    "Deshboard",
    "Add Product",
    "Update Product",
    "Manage Products",
    "Manage Orders",
    "Manage Users",
    "Customization",
  ];
  function handleValue(e: React.SyntheticEvent, value: number) {
    setValue(value);
  }
  return (
    <>
      <Tabs value={value} onChange={handleValue} orientation='vertical'>
        {menus.map((menu, index) => (
          <Tab key={index} label={menu} />
        ))}
      </Tabs>
    </>
  );
};

export default SideMenus;
