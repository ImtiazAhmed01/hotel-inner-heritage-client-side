import React from "react";
import errorImg from "../assets/images/errorImage/4121421_2153483.jpg"

const ErrorPage = () => {
    return (
        <div>
            <h1>404 - Page Not Found</h1>
            <img src={errorImg} alt="" />
        </div>
    );
};

export default ErrorPage;