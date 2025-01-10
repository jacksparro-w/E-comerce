import { atom } from "recoil";

const searchtextAtom = atom({
    key: 'searchtextAtom', // unique ID (with respect to other atoms/selectors)
    default: "", // default value (aka initial value)
  });

  export default searchtextAtom;