import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useRecoilState } from 'recoil';
import searchtextAtom from '../../recoil/searchtextAtom';
import todoData from '../../recoil/todoData';
import activeFilter from '../../recoil/activeFilter';
import editTaskAtom from '../../recoil/editTaskAtom';
import filterDataAtom from '../../recoil/filterDataAtom';


const Todos = () => {
 //global variable
  const [todoapiData,settodoapiData] = useRecoilState(todoData);
  const [activeFilterValue,setactiveFilterValue] = useRecoilState(activeFilter);
  const [filterData,setfilterData] = useRecoilState(filterDataAtom);

  const[selectedEditTask,setselectedEditTask] = useRecoilState(editTaskAtom);
//local variable
  const [inputData, setinputData] = useRecoilState(searchtextAtom);

  return (
    <div className='todo-main-container'>
       <div>
        {todoapiData?.filter((filtered_data) => {
          if(inputData === ""){
            return filtered_data;
          }else if(
           filtered_data?.title
           ?.toLowerCase()
           ?.includes(inputData?.toLowerCase())){
              return filtered_data; 
            }
          
        }
        )?.map((data,index) => {
             return(
                <div key={index} className='todo-card'>
                  <div>
                  <div 
                  onClick={ () =>{

                    const bodyData ={
                      id:data?.id,
                    };

                     fetch('http://127.0.0.1:8000/complete_task',{
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(bodyData),
                    }).then((response) => response.json())
                    .then((res) => {
                      console.log(res);
                       
                      settodoapiData(res?.todo_data);
                      setfilterData(res?.status)
                     
                    }).catch((error) => {
                      console.log("Error",error)
                    })
                  } }className={`${data?.status === 'completed'? 'checkbox-active' :'checkbox'}`}></div>
                  </div>
                    <div className='todo-cotent-container'>
                        <div className='todo-card-header'>
                        <h2 className={`${data?.status === 'completed' ? 'completed-todo-title':'todo-title'}`}>{data?.title}</h2>
                       
                        {activeFilterValue === 'All' &&<div className='icon-container'>
                        <ArchiveOutlinedIcon className='archive' onClick={ () =>{

const bodyData ={
  id:data?.id,
};

 fetch('http://127.0.0.1:8000/archived_task',{
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(bodyData),
}).then((response) => response.json())
.then((res) => {
  console.log(res);
   
  settodoapiData(res?.todo_data);
  setfilterData(res?.status)
 
}).catch((error) => {
  console.log("Error",error)
})
} } />

                        <EditIcon className='edit' onClick={() =>{
                          setselectedEditTask({
                            id:data?.id,
                            title:data?.title,
                            desc:data?.desc,
                          })
                        }}/>
                        
                        <DeleteForeverOutlinedIcon  className='delete' onClick={ () =>{

                          const bodyData ={
                            id:data?.id,
                          };

                           fetch('http://127.0.0.1:8000/delete_task',{
                            method: 'DELETE',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(bodyData),
                          }).then((response) => response.json())
                          .then((res) => {
                            console.log(res);
                             
                            settodoapiData(res?.todo_data);
                            setfilterData(res?.status)
                           
                          }).catch((error) => {
                            console.log("Error",error)
                          })
                        } }/>
                        </div>}
                        </div>
                        <p className='todo-desc'>{data?.desc}</p>
                    </div>
                    
                </div>
             )
})}
       </div>
    </div>
  )
}

export default Todos