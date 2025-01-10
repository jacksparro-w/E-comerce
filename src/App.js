import { Routes,Route,Link, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import userinfoAtom from "./recoil/userinfoAtom";
import { useRecoilState } from 'recoil'
import { useEffect } from "react";


function App() {

  const [userInfo ,setuserInfo] = useRecoilState(userinfoAtom);

  useEffect(() => {
    if(localStorage?.getItem("userStatus")?.includes("true")){
    setuserInfo(true)
    }else{
      setuserInfo(false);
    }
  },[localStorage?.getItem("userStatus")]);

  return (
    <div>
      
      <Routes>
        
          <Route path="/"
           element={ userInfo=== true ?<Home /> : <Navigate to="/login"/>} />
          <Route path="/login" element={ userInfo=== false ?<Login /> : <Navigate to="/"/>} />
      </Routes>
      
    </div>
  );
}

export default App;
