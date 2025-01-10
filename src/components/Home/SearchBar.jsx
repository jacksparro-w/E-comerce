import React from 'react'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useRecoilState } from 'recoil';
import searchtextAtom from '../../recoil/searchtextAtom';
import { useEffect } from 'react';

const SearchBar = () => {
const [inputData,setinputData] = useRecoilState(searchtextAtom);

useEffect(() => {
 console.log(inputData);
}, [inputData])


  return (
    <div className='search-container'>
        <input type='text' placeholder='Search here...' className='search-bar' value={inputData} 
        onChange={(e) => setinputData(e.target.value)} />
        <div className='search-icon'>
            <SearchRoundedIcon fontSize='larger' />
        </div>
    </div>
  );
};

export default SearchBar