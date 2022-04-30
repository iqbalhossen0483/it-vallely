import { SwipeableDrawer } from "@mui/material";
import React, { FC } from "react";
import SideMenuBar from "./SideMenuBar";

interface Props {
  open: boolean;
  setDrawer: (prev: boolean) => void;
}

const SideMenuInDrawer: FC<Props> = ({ open, setDrawer }) => {
  return (
    <SwipeableDrawer
      open={open}
      anchor='right'
      onOpen={() => setDrawer(true)}
      onClose={() => setDrawer(false)}
    >
      <div className='side-menu-container p-5'>
        <SideMenuBar />
      </div>
    </SwipeableDrawer>
  );
};

export default SideMenuInDrawer;
