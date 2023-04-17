import React from "react";

const Button = ({innerText, classes, onClick}) => {

    return <button onClick={onClick} className={classes + ' hover:bg-gray-100 rounded-lg block w-full text-start'}
    >{innerText}
    </button>;
}

export default Button;