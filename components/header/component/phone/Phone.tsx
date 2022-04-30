import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { getScrollHeight } from "../../../../services/shared/sharedFunction";
import LogoName from "../shared/Logo&Name";
import SearchBar from "../shared/SearchBar";
import CallCart from "../window/conponent/Call&Cart";
import TopInfo from "../window/conponent/TopInfo";
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
