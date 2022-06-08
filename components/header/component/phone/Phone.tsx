import { getScrollHeight } from "../../../../clientServices/shared/sharedFunction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import CallCart from "../window/conponent/Call&Cart";
import TopInfo from "../window/conponent/TopInfo";
import { useEffect, useState } from "react";
import LogoName from "../shared/Logo&Name";
import SearchBar from "../shared/SearchBar";
import { Button } from "@mui/material";
import Drawer from "./Drawer";

const Phone = () => {
  const [stricky, setStricky] = useState<boolean>(false);
  const [drawer, setDrawer] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const isOverScroll = getScrollHeight(250);
      setStricky(isOverScroll);
    });
  }, []);
  return (
    <>
      <div className='phone-wrapper'>
        <TopInfo />
        <div className='middle'>
          <SearchBar />
          <CallCart />
        </div>
        <div className={`${stricky && "stricky-header"}`}>
          <div className='content'>
            <LogoName />
            <Button onClick={() => setDrawer(!drawer)}>
              <FontAwesomeIcon icon={faBars} />
            </Button>
          </div>
        </div>

        <Drawer open={drawer} setDrawer={setDrawer} />
      </div>
    </>
  );
};

export default Phone;
