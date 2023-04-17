import React from "react";

const LogCard = (props) => {
    return <li className="rounded-lg border mt-3 shadow-md p-3">
        {props.backlog}
    </li>;
}

export default LogCard;