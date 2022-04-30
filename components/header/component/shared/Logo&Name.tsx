import Image from "next/image";
import { useRouter } from "next/router";

const LogoName = () => {
  const route = useRouter();
  return (
    <div className='logo-and-name'>
      <Image
        width={"48px"}
        height={"48px"}
        priority={true}
        className='logo'
        src='https://i.ibb.co/ZYgSW6L/IMG-20220218-WA0000-removebg-preview.png'
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
