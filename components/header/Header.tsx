import { useEffect, useState } from "react";
import Phone from "./component/phone/Phone";
import Window from "./component/window/Window";

const Header = () => {
  const [BOM, setBOM] = useState<(Window & typeof globalThis) | null>(
    null
  );

  useEffect(() => {
    setBOM(window);
  }, []);

  return (
    <header className='header-wrapper'>
      {BOM && BOM.innerWidth > 480 && <Window />}
      <Phone />
    </header>
  );
};

export default Header;
