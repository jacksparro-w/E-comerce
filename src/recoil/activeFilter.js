
import { atom } from "recoil";

const activeFilter = atom({
    key: 'activeFilter', // unique ID (with respect to other atoms/selectors)
    default: "ALL", // default value (aka initial value)
  });

  export default activeFilter;