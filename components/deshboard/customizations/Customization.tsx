import React from "react";
import BannerCustomization from "./BannerCustomization";
import SliderCustomize from "./SliderCustomize";
interface Props {
  value: number;
  index: number;
}

const Customization = ({ value, index }: Props) => {
  if (value !== index) return null;
  return (
    <div className='customization-container'>
      <SliderCustomize />
      <BannerCustomization />
      <div></div>
    </div>
  );
};

export default Customization;
