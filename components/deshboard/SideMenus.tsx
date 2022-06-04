import { Tab, Tabs } from "@mui/material";
import React from "react";
import { useRouter } from "next/router";

type Props = {
  value: number;
  setValue: (prev: number) => void;
  menus: string[];
};

const SideMenus = ({ value, setValue, menus }: Props) => {
  const router = useRouter();

  function handleValue(e: React.SyntheticEvent, value: number) {
    setValue(value);
    if (menus[0] !== "My Profile") router.push(`/deshboard`);
  }
  return (
    <>
      <Tabs
        className='mt-10 md:mt-0'
        value={value}
        onChange={handleValue}
        orientation='vertical'
      >
        {menus.map((menu, index, arr) => (
          <Tab
            key={index}
            disabled={menus[0] !== "My Profile" && arr.length === index + 1}
            label={menu}
          />
        ))}
      </Tabs>
    </>
  );
};

export default SideMenus;
