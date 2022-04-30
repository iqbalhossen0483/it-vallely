import React from "react";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";

const Support = () => {
  return (
    <div className='support'>
      <h3 className='md:mb-10'>SUPPORT</h3>
      <div className='item'>
        <PhoneInTalkOutlinedIcon />
        <div>
          <p className='title'>9:30AM - 8:00 PM</p>
          <p className='des'>01846770635</p>
        </div>
      </div>
      <div className='item'>
        <AddLocationAltOutlinedIcon />
        <div>
          <p className='title'>Shop Location</p>
          <p className='des'>Find Our Shop</p>
        </div>
      </div>
    </div>
  );
};

export default Support;
