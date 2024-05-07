import React, { Suspense } from "react";
import { Route,Routes } from "react-router-dom";

import { HomeScreen ,Authentication } from "../pages";

import { QueryClient, QueryClientProvider } from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const App =()=>{

    const queryclient = new QueryClient();

    return(
        <QueryClientProvider client={queryclient}>
        <Suspense fallback ={<div>Loading.......</div>}>
            <Routes>
                <Route path="/*" element={<HomeScreen/>}/>
                <Route path="/auth" element={<Authentication/>}/>
            </Routes>
        </Suspense>
        <ToastContainer position="top-right" theme="dark" />
        <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    )
}

export default App;