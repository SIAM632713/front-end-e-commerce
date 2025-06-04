import React from 'react';
import {Outlet} from "react-router-dom";
import Navbar from "./component/navbar/Navbar.jsx";
import Footer from "./component/fotter/footer.jsx";
import {Toaster} from "react-hot-toast";

const App = () => {
    return (
        <>
            <Navbar/>
            <Toaster position="top-center"/>
         <Outlet/>
            <Footer/>
        </>
    );
};

export default App;