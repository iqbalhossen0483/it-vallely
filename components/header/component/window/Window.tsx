import { getScrollHeight } from "../../../../clientServices/shared/sharedFunction";
import CallCart from "./conponent/Call&Cart";
import SearchBar from "../shared/SearchBar";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import LogoName from "../shared/Logo&Name";
import TopInfo from "./conponent/TopInfo";
import Menus from "../shared/Menus";
import CartProduct from "../shared/CartProduct";

type Props = {
  showCart: boolean;
  setShowCart: Dispatch<SetStateAction<boolean>>;
};

const Window = ({ showCart, setShowCart }: Props) => {
  const [stricky, setStricky] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const isOverScroll = getScrollHeight(300);
      setStricky(isOverScroll);
    });
  }, []);

  return (
    <div className='hidden md:block relative'>
      <TopInfo />
      <div className='header-window-middle'>
        <LogoName />
        <SearchBar />
        <CallCart setShowCart={setShowCart} />
      </div>
      <div className={`main-menus-wrapper ${stricky && "stricky-header"}`}>
        <Menus />
      </div>
      {showCart && <CartProduct setShowCart={setShowCart} />}
    </div>
  );
};

export default Window;
