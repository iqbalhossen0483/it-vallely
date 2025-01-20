import Image from "next/image";
import Slider from "react-slick";

const BannerSlider = ({ images }: { images: SliderImg[] | null }) => {
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
                height={400}
                className='object-contain'
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
