import React from "react";
import errorImg from "../assets/images/errorImage/4121421_2153483.jpg"
import { useNavigate } from 'react-router-dom';



const ErrorPage = () => {
    const navigate = useNavigate();
    const handlehome = () => {
        navigate("/")
    }
    return (
        <div className="bg-black">
            <button className="mx-10 mt-4 px-6 py-2 bg-[#DDA15E] text-[#3F0113] btn hover:bg-[#3F0113] hover:text-[#BC6C25]" onClick={() => handlehome()}>GO TO HOME</button>
            <h1 className="text-white font-bold text-center pt-24">404 - Page Not Found</h1>
            <img className="mx-auto w-2/5" src={errorImg} alt="" />

        </div>
    );
};

export default ErrorPage;