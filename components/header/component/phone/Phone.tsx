import { getScrollHeight } from "../../../../clientServices/shared/sharedFunction";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CallCart from "../window/conponent/Call&Cart";
import TopInfo from "../window/conponent/TopInfo";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import LogoName from "../shared/Logo&Name";
import SearchBar from "../shared/SearchBar";
import { Button } from "@mui/material";
import Drawer from "./Drawer";
import CartProduct from "../shared/CartProduct";

type Props = {
  showCart: boolean;
  setShowCart: Dispatch<SetStateAction<boolean>>;
};

const Phone = ({ showCart, setShowCart }: Props) => {
  const [stricky, setStricky] = useState<boolean>(false);
  const [drawer, setDrawer] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const isOverScroll = getScrollHeight(250);
      setStricky(isOverScroll);
    });
  }, []);

  return (
    <div className='md:hidden'>
      <div className='phone-wrapper'>
        <TopInfo />
        <div className='middle'>
          <SearchBar />
          <CallCart setShowCart={setShowCart} />
        </div>
        <div className={`${stricky && "stricky-header"}`}>
          <div className='content'>
            <LogoName />
            <Button onClick={() => setDrawer(!drawer)}>
              <FormatListBulletedIcon />
            </Button>
          </div>
        </div>

        <Drawer open={drawer} setDrawer={setDrawer} />
        {showCart && <CartProduct setShowCart={setShowCart} />}
      </div>
    </div>
  );
};

export default Phone;
