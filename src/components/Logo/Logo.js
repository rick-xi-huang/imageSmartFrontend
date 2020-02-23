import React from "react";
import "./Logo.css";
import photo from "./Digital_AI.jpg";

const Logo = () => {

    return(
        <div >
            <img className = "Logo-img" alt = "Logo-img" src={photo}/>
        </div>
    );

};

export default Logo;