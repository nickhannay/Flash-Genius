import React, { useState, useEffect } from "react";
import { Icon, NonIdealState } from "@blueprintjs/core";

import { api } from "../api";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function displayToaster(message) {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2500,
      pauseOnHover: false,
      hideProgressBar: true,
      closeOnClick: true
    });
  }

function handleDeleteCardSet(cardSet, cardData, setCardData) {
    console.log("In favorite handleDeleteCardSet(): cardSet=" + JSON.stringify(cardSet));
    if(cardSet){
        cardSet.cards.forEach((card) => {
            // delete card from DB
            api.DeleteFavortieCard(card.card_id)
            .then((data) => console.log(JSON.stringify(data)))
            .catch((err) => console.log(JSON.stringify(err)));
        });

        // delete cardSet from the hook
        setCardData(cardData.filter(setItem => setItem !== cardSet)); 

        displayToaster("Card set removed from favorites!");
    }
}

export function GetFavoriteCards({ setShowFlashCardsModal, handleFocus, activeTab, userId }) {
    const [cardData, setCardData] = useState([]);
    useEffect(() => {
        toast.dismiss();
        if(userId){
                api.GetFavoriteCards(userId)
                .then((data) => setCardData(data.flashcard_sets))
                .catch(error => console.error(error));
        }
    }, [userId, activeTab]);

    return (
        <div>
            <ToastContainer />
            <div>
                {cardData !== undefined && cardData.length !== 0 ? cardData.map((e, index) => {
                    return <div className="flex justify-between items-center mb-2" key={index}>
                        <div className={"bg-sky-600 text-white cursor-pointer hover:scale-105 transition duration-150 ease-out hover:ease-in rounded-md pl-4 pt-4 pb-4 w-full"} onClick={() => {
                            setShowFlashCardsModal(true);
                            handleFocus(e.cards);
                        }}>
                            <div className="flex w-full justify-between">
                                <span className="text-2xl">{e.set_name}</span>
                                <div className="flex col-end-4 text-right">
                                    <div className="col-end-4 text-right mr-2">
                                        <span className="text-black select-none items-center px-2 py-1.5 bg-slate-100 rounded-md text-2xl">{e.course}</span>
                                    </div>
                                    <Icon size={35} className="col-end-4 text-right" icon="chevron-right" />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <button className="ml-3 bg-white hover:bg-white-100 cursor-pointer hover:scale-150 transition duration-150 ease-out hover:ease-in rounded-md rounded mr-2"
                                onClick={() => handleDeleteCardSet(e, cardData, setCardData)}>
                                <Icon icon="trash" className="text-sky-600 mr-2" iconSize={20} />
                            </button>
                        </div>
                    </div>
                }) : <NonIdealState
                    className="mb-4"
                    icon={"layers"}
                    title="No Flash cards"
                    description={"Add a set of flash cards to your favorites to see it here"}
                />
                }
            </div>
        </div>
    )
}