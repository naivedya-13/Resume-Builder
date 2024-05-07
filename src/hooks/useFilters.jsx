import {isError, useQuery} from "react-query";



const useFilters =()=>{
    const { data , isLoading} = useQuery(
   "globalFilter",
   ()=>{
    return {searchTerm:""};},
   {refetchOnWindowFocus : false}



    );

    return {data,isLoading,isError};
}

export default useFilters;