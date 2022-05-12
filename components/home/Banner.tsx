import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Banner = () => {
  const datas = [
    { img: "https://i.ibb.co/nb2WJvp/download.jpg" },
    { img: "https://i.ibb.co/THyt3nZ/download-1.jpg" },
  ];
  const router = useRouter();
  return (
    <div className='banner'>
      {datas.map((banner, index) => (
        <div key={index}>
          <Image
            width={200}
            height={100}
            priority={true}
            layout='responsive'
            src={banner.img}
            alt='banner image'
          />
          <div onClick={() => router.push("/shop")} className='hightight-btn'>
            <Link href='/shop'>
              <a>Shop Now</a>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Banner;
