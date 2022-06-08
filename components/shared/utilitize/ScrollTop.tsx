import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { getScrollHeight } from "../../../clientServices/shared/sharedFunction";

const ScrollTop = () => {
  const [stricky, setStricky] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const isOverScroll = getScrollHeight(350);
      setStricky(isOverScroll);
    });
  }, []);

  function gotoTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return (
    <div
      onClick={gotoTop}
      className={`scroll-top ${stricky ? "flex" : "hidden"}`}
    >
      <FontAwesomeIcon icon={faArrowUp} />
    </div>
  );
};

export default ScrollTop;
