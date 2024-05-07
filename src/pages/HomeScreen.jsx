import React ,{Suspense} from "react";
import {Header }  from "../componants";
import MainSpinner from "../componants/MainSpinner";
import { HomeConatiner } from "../conatiners";
import {Route,Routes} from "react-router-dom";
import {CreateResume, CreateTemplate, TemplateDesignPinD, UserProfile} from "../pages";
const HomeScreen =()=>{
    return(
        <div className="w-full flex flex-col items-center justify-center">

            <Header/>

            <main className="w-full">
                <Suspense fallback={<MainSpinner/>}>
                    <Routes>
                        <Route path = "/" element={<HomeConatiner/>}/>
                        <Route path = "/template/create" element={<CreateTemplate/>}/>
                        <Route path = "/profile/:uid" element={<UserProfile/>}/>
                        <Route path = "/resume/*" element={<CreateResume/>}/>
                        <Route path = "/resumeDetail/:templateID" element={<TemplateDesignPinD/>}/>
                      
                    </Routes>

                </Suspense>
                
            </main>
        </div>
    )
}

export default HomeScreen;