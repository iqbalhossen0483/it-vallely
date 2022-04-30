import React from "react";
import { Instagram, YouTube } from "@mui/icons-material";
import Facebook from "@mui/icons-material/Facebook";

const StayConnected = () => {
  return (
    <div className='stay-connected'>
      <h3>STAY CONNECTED</h3>
      <p className='name'>It Vallely</p>
      <p className='address'>
        Level #7, Shop No: 721, Multiplane, Dhaka 1200.
      </p>
      <p className='email'>info@itvallely.com</p>
      <p className='icons'>
        <Facebook />
        <YouTube />
        <Instagram />
      </p>
    </div>
  );
};

export default StayConnected;
