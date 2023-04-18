import React from "react";
import {GrEdit} from "react-icons/gr";
import AddOrClose from "./AddOrClose.jsx";


const LogCard = ({backlog, edit}) => {


    return <div>
        <li className="rounded-lg border relative mt-3 hover:bg-gray-100 shadow-md p-3">
            {backlog.title}
            <button onClick={() => edit(backlog)}
                    className='rounded-lg ml-3 hover:bg-gray-300 p-2 absolute top-0 right-0'><GrEdit/>
            </button>
        </li>
    </div>;

}

export default LogCard;