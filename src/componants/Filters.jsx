import React, { useState } from 'react'
import { MdLayersClear } from "react-icons/md";
import {AnimatePresence , motion} from "framer-motion";
import {slideupdownWithScale} from "../animations";
import { FiltersData } from '../utils/helper';

import useFilters from '../hooks/useFilters';
import {useQueryClient} from "react-query";

function Filters() {
    const [isClearHover , setIsClearHover] = useState(false);


    const {data : filterData , isLoading,isError}=useFilters();

const queryclient = useQueryClient()
     const handleFilterValue =(value)=>{
    //     // const previousState = queryclient.getQueryData("globalFilter");
    //     // const updatedState = {...previousState , searchTerm: value} 
    //     // queryclient.setQueryData("globalFilter" , updatedState)

         queryclient.setQueryData("globalFilter" ,
         {...queryclient.getQueryData("globalFilter"),
         searchTerm: value
     });
     }


     const clearFilter =()=>{
        queryclient.setQueryData("globalFilter" ,
        {...queryclient.getQueryData("globalFilter"),
        searchTerm :""
        });
      }
  return (
    <div className="w-full flex items-center justify-start py-4">

   <div className='border border-gray-300 rounded-md px-3 py-2 mr-2 cursor-pointer group hover:shawdow-md bg-gray-200 relative' 
   onMouseEnter={()=> setIsClearHover(true)}
   onMouseLeave={()=> setIsClearHover(false)}
   onClick={clearFilter}
   >
      <MdLayersClear className="text-xl"/>

      <AnimatePresence>
   {isClearHover && (
   <motion.div 
        {...slideupdownWithScale}
        
       
        className='absolute -top-8 -left-2 bg-white shadow-md rounded-md px-2 py-1'>
            <p className='whitespace-nowrap text-xs'>Clear all</p>
        </motion.div>)}

        
      </AnimatePresence>
   </div>

<div className='w-full flex items-center justify-start overflow-x-scroll gap-6 scrollbar-none'>

{FiltersData  && FiltersData.map((item)=>(

    <div 
     onClick={()=>handleFilterValue(item.value)}
    key={item.id} 
    className={`border border-gray-200 rounded-md px-6 py-2 cursor-pointer group hover:shadow-md ${filterData?.searchTerm===item.value && "bg-gray-300 shadow-md"} `}>
        <p className='text-sm text-textPrimary group-hover:text-txtDark whitespace-nowrap '>{item.label}</p>
    </div>
   
))};

</div>
    </div>
  )
}

export default Filters