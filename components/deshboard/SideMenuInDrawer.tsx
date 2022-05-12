import { SwipeableDrawer } from "@mui/material";
import React from "react";
import SideMenus from "./SideMenus";

type Props = {
  open: boolean;
  setDrawer: (prev: boolean) => void;
  value: number;
  setValue: (prev: number) => void;
};

const SideMenuInDrawer = ({ open, setDrawer, value, setValue }: Props) => {
  return (
    <SwipeableDrawer
      open={open}
      anchor='right'
      onOpen={() => setDrawer(true)}
      onClose={() => setDrawer(false)}
    >
      <SideMenus value={value} setValue={setValue} />
    </SwipeableDrawer>
  );
};

export default SideMenuInDrawer;
