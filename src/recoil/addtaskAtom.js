
import { atom } from "recoil";

const addtaskAtom = atom({
    key: 'addtaskAtom', // unique ID (with respect to other atoms/selectors)
    default: null, // default value (aka initial value)
  });

  export default addtaskAtom;