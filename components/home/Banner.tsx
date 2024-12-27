import Image from "next/image";
import Link from "next/link";

const Banner = ({ images }: { images: BannerImg[] }) => {
  return (
    <div className='banner'>
      {images.map((banner, index) => (
        <div key={index}>
          <Image
            width={200}
            height={100}
            priority={true}
            src={banner.imgUrl}
            alt='banner image'
          />
          <Link
            href={`${process.env.NEXT_PUBLIC_SERVER_URL}${banner.link}`}
            className='hightight-btn'
          >
            Shop Now
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Banner;
