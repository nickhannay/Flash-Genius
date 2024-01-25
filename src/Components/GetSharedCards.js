import React, { useState, useEffect } from "react";
import { InputGroup, FormGroup, Button, Icon, NonIdealState } from "@blueprintjs/core";

import { api } from "../api";

export function GetSharedCards({ setShowFlashCardsModal, handleFocus, activeTab }) {
    const [cardSets, setCardSets] = useState([]);
    // Array of all the user IDs
    const [userIDs, setUserIDs] = useState([]);
    const [selectedUserName, setSelectedUserName] = useState('');

    function handleUsernameChange(event) {
        console.log(event);
        const userID = event.target.value;
        if (userID) {
            setSelectedUserName(userID);

            api.GetUserCards(userID)
                .then((data) => setCardSets(data.flashcard_sets))
                .catch(error => console.error(error));
        }
        else {
            setCardSets([]) 
            setSelectedUserName("Select a username") // CHECK
        }
    }

    useEffect(() => {
        // expects an array of usernames here
        api.GetAllUserIDs()
            .then((data) => setUserIDs(data.body))
            .catch(error => console.error(error));
    }, [activeTab]);

    return (
        <div className="container mx-auto">
            <div className="flex justify-center">
                <div className="w-1/2">
                    <link
                        rel="stylesheet"
                        href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.0.2/css/bootstrap.min.css"
                        integrity="sha512-D3Dq7wfs5jJQ5BfNwdSi3Jb3H+gnWTQYX9CIt/15sbkaEGh/uWupzOvMAMmBdSj6tlm+kW8eYBm0PKZ4sQ6kGw=="
                        crossOrigin="anonymous"
                        referrerPolicy="no-referrer"
                    />
                    <select
                        value={selectedUserName}
                        onChange={handleUsernameChange}
                        className="form-select w-full mb-4 p-2 rounded-md bg-white border text-black"
                    >
                        <option value=""> {'Select a username'}</option>
                        {userIDs.map((userId, index) => (
                            <option key={index} value={userId}>
                                {userId}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {cardSets !== undefined && cardSets.length !== 0 ? (
                cardSets.map((e) => (
                    <div
                        key={e.card_id}
                        className="bg-sky-600 text-white cursor-pointer hover:scale-105 transition duration-150 ease-out hover:ease-in mb-2 rounded-md pl-4 pt-4 pb-4"
                        onClick={() => {
                            setShowFlashCardsModal(true);
                            handleFocus(e.cards);
                        }}
                    >
                        <div className="flex w-full justify-between">
                            <span className="text-2xl">{e.set_name}</span>
                            <div className="flex col-end-4 text-right">
                                <div className="col-end-4 text-right mr-2">
                                    <span className="text-black select-none items-center px-2 py-1.5 bg-slate-100 rounded-md text-2xl">
                                        {e.course}
                                    </span>
                                </div>
                                <Icon size={35} className="col-end-4 text-right" icon="chevron-right" />
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <NonIdealState
                    className="mb-4"
                    icon="layers"
                    title="No Flash cards"
                    description="Select a username to display their flashcards"
                />
            )}
        </div>
    );



}