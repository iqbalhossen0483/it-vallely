import { SwipeableDrawer } from "@mui/material";
import React from "react";
import SideMenus from "./SideMenus";

type Props = {
  open: boolean;
  setDrawer: (prev: boolean) => void;
  value: number;
  setValue: (prev: number) => void;
  menus: string[];
};

const SideMenuInDrawer = ({
  open,
  setDrawer,
  value,
  setValue,
  menus,
}: Props) => {
  return (
    <SwipeableDrawer
      open={open}
      anchor='right'
      onOpen={() => setDrawer(true)}
      onClose={() => setDrawer(false)}
    >
      <SideMenus value={value} setValue={setValue} menus={menus} />
    </SwipeableDrawer>
  );
};

export default SideMenuInDrawer;
