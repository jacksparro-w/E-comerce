import React from 'react'
import todoData from '../../recoil/todoData';
import addtaskAtom from '../../recoil/addtaskAtom';
import editTaskAtom from '../../recoil/editTaskAtom';
import { useRecoilState } from 'recoil';
import { useRef } from 'react';
import filterDataAtom from '../../recoil/filterDataAtom';


const EditTask = () => {

    const[addTaskOverlay,setaddTaskOverlay] = useRecoilState(addtaskAtom);
    const [todoapiData,settodoapiData] = useRecoilState(todoData);
    const[selectedEditTask,setselectedEditTask] = useRecoilState(editTaskAtom);
    const [filterData,setfilterData] = useRecoilState(filterDataAtom);

    
    const titleRef = useRef(null);
    const descRef = useRef(null);


    const editTaskHandler = (e) => {
        e.preventDefault()
        const data ={
            id:selectedEditTask?.value,
            title:titleRef?.current?.value,
            desc:descRef?.current?.value,
        }
        
  fetch('http://127.0.0.1:8000/update_task',{
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((response) => response.json())
  .then((data) => {
    console.log(data);
    setselectedEditTask(false)
    settodoapiData(data?.todo_data);
    setfilterData(data?.status)
  }).catch((error) => {
    console.log("Error",error)
  })
    }
  return (
    <div className='add-task-container'>
        <div className='add-task-contents'>
            <h1> Edit Task</h1>

            <form onSubmit={editTaskHandler} className='add-task-form' >
                <input ref={titleRef} type='text' placeholder='Title' defaultValue={selectedEditTask?.title} />
                <textarea ref={descRef} cols="30" rows='10' placeholder='Description' defaultValue={selectedEditTask?.desc}></textarea>
                <button>Add</button>
            </form>
        </div>
    </div>
  )
}

export default EditTask