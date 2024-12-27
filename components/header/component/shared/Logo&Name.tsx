import Image from "next/image";
import { useRouter } from "next/router";

const LogoName = () => {
  const route = useRouter();
  return (
    <div className='logo-and-name'>
      <Image
        width={48}
        height={48}
        priority={true}
        className='logo'
        src='/logo.webp'
        alt=''
      />
      <div onClick={() => route.push("/")} className='site-name'>
        <h3 className='name'>it vallely</h3>
        <p className='tag'>electronics</p>
      </div>
    </div>
  );
};

export default LogoName;
