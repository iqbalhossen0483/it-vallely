import { getScrollHeight } from "../../../../clientServices/shared/sharedFunction";
import CallCart from "./conponent/Call&Cart";
import SearchBar from "../shared/SearchBar";
import { useEffect, useState } from "react";
import LogoName from "../shared/Logo&Name";
import TopInfo from "./conponent/TopInfo";
import Menus from "../shared/Menus";

const Window = () => {
  const [stricky, setStricky] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const isOverScroll = getScrollHeight(300);
      setStricky(isOverScroll);
    });
  }, []);

  return (
    <>
      <TopInfo />
      <div className='header-window-middle'>
        <LogoName />
        <SearchBar />
        <CallCart />
      </div>
      <div className={`main-menus-wrapper ${stricky && "stricky-header"}`}>
        <Menus />
      </div>
    </>
  );
};

export default Window;
