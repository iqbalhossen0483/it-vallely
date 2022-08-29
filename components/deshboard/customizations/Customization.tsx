import React from "react";
import BannerCustomization from "./BannerCustomization";
import SliderCustomize from "./SliderCustomize";

const Customization = () => {
  return (
    <div className='customization-container'>
      <SliderCustomize />
      <BannerCustomization />
      <div></div>
    </div>
  );
};

export default Customization;
