import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Banner = ({ images }: { images: BannerImg[] }) => {
  const router = useRouter();
  return (
    <div className='banner'>
      {images.map((banner, index) => (
        <div key={index}>
          <Image
            width={200}
            height={100}
            priority={true}
            layout='responsive'
            src={banner.imgUrl}
            alt='banner image'
          />
          <div
            onClick={() => router.push(banner.link)}
            className='hightight-btn'
          >
            <p>Shop Now</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Banner;
