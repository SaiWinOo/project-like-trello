import React, {useState} from 'react';
import LogCard from "./components/LogCard.jsx";
import Button from "./components/Button.jsx";
import AddOrClose from "./components/AddOrClose.jsx";
import {list} from "postcss";

const App = () => {
    const [backlogs, setBackLogs] = useState(['performance optimization']);
    const [card, setCard] = useState(false);
    const [listCard, setListCard] = useState(false);
    const [lists, setLists] = useState([{
        title: 'backlog',
        cards: [
            {
                title: 'hello world'
            }
        ]
    }]);
    const cardTypeHandler = (e) => {
        if (e.keyCode === 13) {
            setBackLogs([...backlogs, e.target.value]);
            setCard(false);
        }
    };
    const listTypeHandler = (e) => {
        if (e.keyCode === 13) {
            setBackLogs([...backlogs, e.target.value]);
            setListCard(false);
        }
    }

    return (
        <div className='bg-yellow-300 h-screen w-screen'>
            <div className='flex justify-center pt-10'>
                {lists.length && lists.map((list) => {
                    return <div key={list.title} className='bg-white mr-3 w-[300px] rounded-xl p-4'>
                        <div>
                            <h5 className='font-semibold '>{list.title}</h5>
                        </div>
                        <ul className='mt-4'>
                            {list.cards.length && list.cards.map((backlog) => {
                                return <LogCard key={backlog.title} backlog={backlog.title}/>
                            })}
                        </ul>
                        {card && <div className='mt-4 '>
                        <textarea
                            onKeyUp={cardTypeHandler}
                            className='h-[60px] w-full rounded-lg focus:outline-none focus:border-none border shadow p-2'
                            placeholder="Add a card"></textarea>
                            <AddOrClose btnText='+ Add a card' onClick={() => setCard(false)}/>
                        </div>}
                        {!card && <button onClick={() => setCard(true)}
                                          className='hover:bg-gray-100 mt-4 rounded-lg block w-full text-start p-3'>
                            + Add a card
                        </button>}
                    </div>
                })}
                <div className='bg-white w-[300px] min-h-[50px] max-h-[120px] rounded-xl p-4'>
                    <div>
                        {listCard && <div>
                            <input onKeyUp={listTypeHandler} type="text" placeholder='Enter a list name'
                                   className='w-full rounded-lg focus:outline-blue-400 mb-2 focus:border-none border shadow p-2'/>
                            <AddOrClose btnText='+ Add a list name' onClick={() => setListCard(false)}/>
                        </div>}
                        {!listCard && <Button onClick={() => setListCard(true)} innerText='+ Add another list'
                                              classes='py-2 px-3'/>}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default App;