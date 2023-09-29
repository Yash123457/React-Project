import React, { useContext, useState } from 'react'
// import { mockSearchResult } from '../constants/mock';
import { SearchIcon, XIcon } from "@heroicons/react/solid";
import SearchResult from './SearchResult';
import ThemeContext from '../context/ThemContext';
import { searchSymbol } from '../api/stock-api';

const Search = () => {
const [input,setInput] = useState("");
const [bestMatches, setBestMatches] = useState([]);

const {darkMode} = useContext(ThemeContext);

  const clear = () => {
    setInput("")
    setBestMatches([]);
  };
  const updateBestMatches = async () => {
    // setBestMatches(mockSearchResult.result);
    try{
      if(input){
        const searchResult = await searchSymbol(input);
        const result = searchResult.result;
        setBestMatches(result);
      }
    }catch(error){
      setBestMatches([])
      console.log(error);
    }
  }
  return (
<div className={`flex items-center my-4 border-2 rounded-md relative z-50 w-96  ${darkMode ? "bg-gray-900 border-gray-800" :"bg-white border-neutral-200"}`}>
<input type="text" 
  value={input} 
  className={`w-full px-4 py-2 focus:outline-none rounded-md ${darkMode ? "bg-gray-900":null}`} 
  placeholder='Search Stock...' 
  onChange={(event)=>{
      setInput(event.target.value)
  }}
  onKeyPress={(event)=>{
    if(event.key ==="Enter"){
      updateBestMatches();
    }
  }}
/>

    {input && 
     (<button onClick={clear} className='m-1'>
     <XIcon className="h-4 w-4 fill-gray-500"/>
     </button>
     )}
<button onClick={updateBestMatches} 
className="h-8w-8 bg-indigo-600 rounded-md-flex justify-center
items-center m-1 p-2 transition duration-300 
hover:ring-2 ring-indigo-400">
  <SearchIcon className="h-4 w-4 fill-gray-100"/>
</button>

{input && bestMatches.length > 0 ? <SearchResult results={bestMatches} /> : null}
</div>
  )
}

export default Search
