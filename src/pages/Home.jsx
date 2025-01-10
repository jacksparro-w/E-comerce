import React from 'react'
import Header from '../components/Home/Header';
import "./Home.css"
import SearchBar from '../components/Home/SearchBar';
import Filters from '../components/Home/Filters';
import Todos from '../components/Home/Todos';
import AddTask from '../components/Home/AddTask';
import { useRecoilState } from 'recoil';
import addtaskAtom from '../recoil/addtaskAtom';
import apiDataAtom from '../recoil/apiDataAtom';
import { useEffect } from 'react';
import todoData from '../recoil/todoData';
import editTaskAtom from '../recoil/editTaskAtom';
import EditTask from '../components/Home/EditTask';
import filterDataAtom from '../recoil/filterDataAtom';


const Home = (props) => {
//global variable
  const [addTaskOverlay,setaddTaskOverlay] = useRecoilState(addtaskAtom);
  const [apiData,setapiData] = useRecoilState(apiDataAtom);
  const [todoapiData,settodoapiData] = useRecoilState(todoData);
  const[selectedEditTask,setselectedEditTask] = useRecoilState(editTaskAtom);
  const [filterData,setfilterData] = useRecoilState(filterDataAtom)


//local variable
    const homeData = {
      status :[
      {label:"All",
        value: 4},
    {label:"completed",
      value: 6},
      {label:"inprogress",
        value: 2},
      {label:"Archived",  
        value: 10},
      ],
      todo_Data:[
        
          
            {
              title:"Title1",
              desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias mollitia ex nobis et ea quis.",
              
              status:"completed",
            },
            {
              title:"Title2",
              desc:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore, ea.",
              
              status:"in progres",
            },
            {
              title:"Title3",
              desc:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio atque tenetur modi itaque. Corporis, fugit enim.",
              
              status:"archived",
            },
            {
              title:"Title4",
              desc:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio.",
              
              status:"completed",
            },]
          
          
    
   
  };

useEffect(() => {
       
  fetch('http://127.0.0.1:8000/initial_call',{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    
  }).then((response) => response.json())
  .then((data) => {
    console.log(data);
    setapiData(data);
    settodoapiData(data?.todo_data);
    setfilterData(data?.status);
   
  }).catch((error) => {
    alert(error);
   
  })
}, [])


  return (
    <div className='relative'>
{addTaskOverlay && ( <div> 
      <div className="add-overlay" onClick={() => setaddTaskOverlay(null) 
      }></div>
      
      
      
      <AddTask/> 
      </div>)}

      {selectedEditTask && ( <div> 
      <div className="add-overlay" onClick={() => setselectedEditTask(null) 
      }></div>
      
      
      
      <EditTask/> 
      </div>)}
     
      <div className='home-container'>
        <Header/>
        <SearchBar/>

       
        <Filters/>
        <Todos />
      </div>
    </div>
  )
}

export default Home;



