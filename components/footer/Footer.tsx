import { Copyright } from "@mui/icons-material";
import { ListItem } from "@mui/material";
import React from "react";
import useStore from "../../contex/hooks/useStore";
import StayConnected from "./component/StayConnected";
import Support from "./component/Support";

const Footer = () => {
  const links = [
    "Terms & Conditions",
    "Privacy Policy",
    "Star Point Policy",
    "Brands",
    "About Us",
    "Contact Us",
    "Online Delivary",
    "Refund & Return Policy",
  ];

  return (
    <footer id='footer'>
      <Support />
      <div className='links'>
        <h3>IMPORTANT LINKS</h3>
        {links.map((item) => (
          <ListItem key={item}>{item}</ListItem>
        ))}
      </div>
      <StayConnected />
      <div className='copy-right'>
        <p>
          <Copyright /> 2022, it vallely. All right reserved.
        </p>
        <p>
          Designed & Developed by
          <span className='text-[#EF4A23] ml-1'>Md Iqbal</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
