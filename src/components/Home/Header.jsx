import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';

import { useRecoilState } from 'recoil';
import userinfoAtom from '../../recoil/userinfoAtom';
import addtaskAtom from '../../recoil/addtaskAtom';
import { useEffect } from 'react';

const Header = () => {

  const [userInfo ,setuserInfo] = useRecoilState(userinfoAtom);
  const [addTaskOverlay,setaddTaskOverlay] = useRecoilState(addtaskAtom);

  useEffect(() => {
   console.log(addTaskOverlay);
  }, [addTaskOverlay])
  

  const navigate = useNavigate();

  return (
    <header>
        <div className='home-header-container'>
            
                <h1 className='header-logo-text'>TodoX</h1>
            <div className='btn-container'>
            
                <button className='new-task-btn' onClick={() => {
                  if(addTaskOverlay){
                    setaddTaskOverlay(null);
                  }else {
                    setaddTaskOverlay(true);
                  }
                }}>
                    <span>
                        <AddIcon fontSize='large'/>
                    </span>{" "}
                         New
                 </button>
           <button className='new-task-btn'
           onClick={() => { navigate('/login');
             localStorage?.clear();
             setuserInfo(false);
            }}>
         
            < ExitToAppIcon fontSize='large'/></button>
        </div>
        </div>
    </header>
  )
}

export default Header