import React from "react";
import BannerCustomization from "./BannerCustomization";
import SliderCustomize from "./SliderCustomize";
interface Props {
  value: number;
  index: number;
}

const Customization = ({ value, index }: Props) => {
  return (
    <div
      className={`${value !== index ? "hidden" : "customization-container"}`}
    >
      <SliderCustomize />
      <BannerCustomization />
      <div></div>
    </div>
  );
};

export default Customization;
