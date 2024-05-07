import React from "react";

import {PuffLoader} from "react-spinners";

const MainSpinner = ()=>{

    return (
        <div className="w-screen flex items-center justify-center">
            <PuffLoader color="#498FCD" size={80}/>
        </div>
    )
}

export default MainSpinner;