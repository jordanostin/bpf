import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Header} from "../components/header/header";
import {Home} from "../pages/home/Home";

export const Navigation = () => {
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/' element={<Home />}/>
            </Routes>
        </BrowserRouter>
    );
}