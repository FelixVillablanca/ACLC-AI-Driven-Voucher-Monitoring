import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginAndRegister from "./landing/loginAndRegister";
import RegisterForm from "./Auth/Register";
import PendingRequest from "./UserInterfaces/PendingRegisterRequest";

export default function RootRouterApp() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <LoginAndRegister /> }></Route>  
                <Route path="/register" element={ <RegisterForm />}></Route>
                <Route path="/pending-register" element={ <PendingRequest />}></Route>              
            </Routes>
        </BrowserRouter>
    );

}