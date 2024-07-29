import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Home} from "../pages/home/Home";
import {Register} from "../components/form/register";
import {Login} from "../components/form/login";

export const Navigation = () => {

    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/register' element={<Register />}/>
                <Route path='/login' element={<Login />}/>
            </Routes>
        </BrowserRouter>
    );
}