import React, { useState } from 'react'
import { useEffect } from 'react';
import { filterEndpoints } from '../../Helper/filter';
import todoData from '../../recoil/todoData';
import { useRecoilState } from 'recoil';
import activeFilter from '../../recoil/activeFilter';
import filterDataAtom from '../../recoil/filterDataAtom';

const Filters = () => {

    const [activeFilterValue,setactiveFilterValue] = useRecoilState(activeFilter);
    const [todoapiData,settodoapiData] = useRecoilState(todoData);
    const [filterData,setfilterData] = useRecoilState(filterDataAtom);

    useEffect(() => {
      console.log("filterData")
      console.log(filterData)
    
    }, [filterData])
    
    
  return (
    <div>
        <div className='filter-container'>
            {Array.isArray(filterData) && filterData?.map((data,index) => {
                return (
                    <div key={index} className='filter-btn-container' onClick={() =>setactiveFilterValue(data?.label)
                    }>
                        <button onClick={ () =>{
                          fetch(`http://127.0.0.1:8000/${filterEndpoints[index]?.endpoint}`,{
                            method: 'GET',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            
                          }).then((response) => response.json())
                          .then((data) => {
                            
                            settodoapiData(data?.todo_data);
                            setfilterData(data?.status);
                              
                          }).catch((error) => {
                            alert(error);
                           
                          })
                        } }
                         className={`${activeFilterValue === data?.label ? "active-filter" : ""}` }>
                            <h3>{data?.label}</h3>
                            <p className={`${activeFilterValue === data?.label ? "active-filter-value" : ""}` }>{data?.values}</p>
                            </button>
                    </div>
                )
            }
        )}
        </div>
    </div>
  )
}

export default Filters