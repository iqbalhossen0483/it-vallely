import React from "react";
import BannerCustomization from "./BannerCustomization";
import SliderCustomize from "./SliderCustomize";
interface Props {
  value: number;
  index: number;
}

const Customization = ({ value, index }: Props) => {
  return (
    <div hidden={value !== index} className='customization-container'>
      <SliderCustomize />
      <BannerCustomization />
      <div>another</div>
    </div>
  );
};

export default Customization;
