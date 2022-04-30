import { useContext } from "react";
import { StoreContext } from "../providers/StoreProvider";

const useStore = () => {
  return useContext(StoreContext);
};

export default useStore;
