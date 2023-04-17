import React from "react";

function AddOrClose(props) {
    return <div>
        <button
            className="bg-blue-600  hover:bg-blue-700 text-white py-1 px-2 rounded">{props.btnText}
        </button>
        <button onClick={props.onClick} style={{fontSize: "20px"}}
                className="ml-3">&times;</button>
    </div>;
}

export default AddOrClose;