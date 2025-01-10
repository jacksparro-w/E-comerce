import { atom } from "recoil";

const filterDataAtom = atom({
    key: 'filterDataAtom', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
  });

  export default filterDataAtom;