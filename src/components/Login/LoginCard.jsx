import React, { useEffect, useState ,useRef} from 'react'

import userinfoAtom from '../../recoil/userinfoAtom'
import { useRecoilState } from 'recoil'

const LoginCard = () => {

const [userInfo ,setuserInfo] = useRecoilState(userinfoAtom);


const usernameRef = useRef(null)
const passwordRef= useRef(null)

const onSubmit = (e) => {
e.preventDefault();
console.log("user name is:",usernameRef?.current?.value);
console.log("user password is:",passwordRef?.current?.value);

const userCredentials = {
  username: usernameRef?.current?.value,
  password: passwordRef?.current?.value
  }

  fetch('http://127.0.0.1:8000/login',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userCredentials),
  }).then((response) => response.json())
  .then((data) => {
    console.log(data);
    if(data?.status === "succesful"){
      localStorage.setItem("userUtatus",true);
      setuserInfo(true);
    }else{
      localStorage.setItem("userStatus",false);
    }
  }).catch((error) => {
    console.log("Error",error)
  })
};




  return (
    <div>
    
    <div className='login-card-container'>
      <div>
        <h1 className='login-heading'>TodoX</h1>
      </div>
        <form onSubmit={onSubmit}>
          <input className="login-inputs" 
          type='text'
           placeholder='username' 
           ref={usernameRef}/>

          <input className="login-inputs" 
          type='password' 
          placeholder='Password'
          ref={passwordRef}/>
          
          <button className='login-button' type='submit'>Login</button>
          

    </form>
    </div>
    </div>
  )
}

export default LoginCard