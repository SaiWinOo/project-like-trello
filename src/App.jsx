import React, {useEffect, useState} from 'react';
import LogCard from "./components/LogCard.jsx";
import Button from "./components/Button.jsx";
import AddOrClose from "./components/AddOrClose.jsx";
import {getLocalStorage, updateLocalStorage} from "./components/CommonFunctions.js";

const App = () => {
    const [listCard, setListCard] = useState(false);
    const [lists, setLists] = useState([]);
    const [shouldUpdateLocalStorage, setShouldUpdateLocalStorage] = useState(false);
    const [cardTitle, setCardTitle] = useState('');
    const [editingCard, setEditingCard] = useState(null);
    const [type, setType] = useState('Add');
    useEffect(() => {
        shouldUpdateLocalStorage && updateLocalStorage('data', lists)
        console.log(lists)
    }, [lists]);

    useEffect(() => {
        setLists(getLocalStorage('data'));
    }, [])

    const addNewCard = (listId) => {
        toggleAddNewCard(listId)
        lists.map((list) => {
            if (list.id === listId) {
                return list.cards.push({title: cardTitle, id: Math.random(), openModal: false});
            }
            return list;
        });
        setCardTitle('');
        setShouldUpdateLocalStorage(true);
    }
    const cardTypeHandler = (e, listId) => {
        setCardTitle(e.target.value)
        if (e.keyCode === 13) {
            addNewCard(listId);
            toggleAddNewCard(listId, 'toggle')
        }
    };
    const listTypeHandler = (e) => {
        if (e.keyCode === 13) {
            !lists && setLists([{title: e.target.value, id: Math.random(), cards: [], openModal: false}])
            lists && setLists([...lists, {
                title: e.target.value,
                id: Math.random(),
                cards: [],
                openModal: false
            }]);
            setListCard(false);
        }
        setShouldUpdateLocalStorage(true);
    }


    const editCard = (card, listId) => {
        setCardTitle(card.title);
        setType('Save');
        toggleAddNewCard(listId, 'open');
        setEditingCard(card);
        console.log(card)
    };
    const toggleAddNewCard = (id, actions) => {
        const newLists = lists.map((list) => {
            if (list.id === id) {
                if (actions === 'toggle')
                    return {...list, openModal: !list.openModal}
                if (actions === 'close')
                    return {...list, openModal: false}
                if (actions === 'open')
                    return {...list, openModal: true}
            }
            return list;
        });
        setLists(newLists);
        setShouldUpdateLocalStorage(false);
    }
    const openModal = () => {
        setListCard(true);
        setType('Add');
        setCardTitle('');
    }
    return (
        <div className='bg-yellow-300 h-screen w-screen'>
            <div className='flex overflow-x-auto h-full overflow-y-hidden gap-2 justify-start items-start mx-20
                pt-10'>
                {lists && lists.map((list) => {
                    return <div key={list.title} className='bg-white relative shrink-0 w-[300px] rounded-xl p-4'>
                        <div>
                            <h5 className='font-semibold '>{list.title}</h5>
                        </div>
                        <ul className={'mt-4 overflow-y-scroll ' + (list.openModal ? 'max-h-[678px]' : 'max-h-[630px]')}>
                            {list.cards && list.cards.map((backlog) => {
                                return <LogCard edit={(backlog) => editCard(backlog, list.id)} key={backlog.id}
                                                backlog={backlog}/>
                            })}
                            {list.openModal && <div className='mt-4 '>
                        <textarea
                            defaultValue={cardTitle}
                            onKeyUp={(e) => cardTypeHandler(e, list.id)}
                            className='h-[60px] w-full rounded-lg focus:outline-none focus:border-none border shadow p-2'
                            placeholder="Add a card"></textarea>
                                <AddOrClose addItem={() => addNewCard(list.id)} btnText={`+ ${type} a card`}
                                            onClick={() => toggleAddNewCard(list.id, 'close')}/>
                            </div>}
                            {!list.openModal &&
                                <div className='absolute w-full bottom-[-50px] rounded-b-xl left-0 bg-white'>
                                    <button onClick={() => toggleAddNewCard(list.id, 'open')}
                                            className='hover:bg-gray-100 mt-4 rounded-lg block w-full text-start p-3'>
                                        + Add a card
                                    </button>
                                </div>}
                        </ul>

                    </div>
                })}
                <div
                    className='bg-white shrink-0 w-[300px] min-h-[50px] max-h-[120px] rounded-xl p-4'>
                    <div>
                        {listCard && <div>
                            <input onKeyUp={listTypeHandler} type="text" placeholder='Enter a list name'
                                   className='w-full rounded-lg focus:outline-blue-400 mb-2 focus:border-none border shadow p-2'/>
                            <AddOrClose btnText='+ Add a list name' onClick={() => setListCard(false)}/>
                        </div>}
                        {!listCard && <Button onClick={openModal} innerText='+ Add another list'
                                              classes='py-2 px-3'/>}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default App;