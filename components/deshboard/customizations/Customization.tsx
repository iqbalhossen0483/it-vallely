import React, { useEffect } from "react";
import { fetchAPI } from "../../../services/shared/sharedFunction";
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