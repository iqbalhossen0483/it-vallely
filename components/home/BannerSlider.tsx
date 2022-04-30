import Image from "next/image";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import useStore from "../../contex/hooks/useStore";
import { fetchAPI } from "../../services/shared/sharedFunction";

const BannerSlider = () => {
  const [images, setImages] = useState<SliderImg[] | null>(null);
  const store = useStore();

  useEffect(() => {
    (async () => {
      const slider = await fetchAPI<SliderImg[]>(
        "https://cyclemart.herokuapp.com/sliders"
      );
      if (!slider.error.internal && !slider.error.server) {
        setImages(slider.data);
      } else {
        store?.State.setError(slider.error);
      }
    })();
  }, [store?.State]);

  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  return (
    <div className='slider'>
      <Slider {...settings}>
        {images &&
          images.map((item) => (
            <div key={item._id}>
              <Image
                width={1000}
                height={450}
                layout='responsive'
                priority={true}
                src={item.imgUrl}
                alt=''
              />
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default BannerSlider;
