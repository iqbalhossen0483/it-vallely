import { Tab, Tabs } from "@mui/material";
import React from "react";
import { useRouter } from "next/router";

type Props = { value: number; setValue: (prev: number) => void };

const SideMenus = ({ value, setValue }: Props) => {
  const router = useRouter();
  const menus = [
    "Deshboard",
    "Add Product",
    "Manage Products",
    "Manage Orders",
    "Manage Users",
    "Customization",
    "",
  ];
  function handleValue(e: React.SyntheticEvent, value: number) {
    setValue(value);
    router.push(`/deshboard`);
  }
  return (
    <>
      <Tabs value={value} onChange={handleValue} orientation='vertical'>
        {menus.map((menu, index, arr) => (
          <Tab key={index} disabled={arr.length === index + 1} label={menu} />
        ))}
      </Tabs>
    </>
  );
};

export default SideMenus;
