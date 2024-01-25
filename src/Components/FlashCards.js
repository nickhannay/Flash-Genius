import React, { useState, useEffect } from "react";
import { InputGroup, FormGroup, Button, Icon, NonIdealState } from "@blueprintjs/core";
import {Carousel} from "./Carousel";

export function FlashCards({ showFlashCardsModal, setShowFlashCardsModal, cards, handleFocus}){
    const [scale, setScale] = useState("scale-0");

    useEffect(() => {
        if (showFlashCardsModal) {
            const timer = setTimeout(() => {
                setScale("w-8/12 xl:w-[11/12] 2xl:w-[12/12]");
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [showFlashCardsModal]);

    const handleClose = async () => {
        setScale("scale-0");
        const timer = setTimeout(() => {
            setShowFlashCardsModal(false);
        }, 200);
        return () => clearTimeout(timer);
    };

    return (
        <div>
            {showFlashCardsModal &&
                <div className={"z-20 fixed top-0 left-0 h-screen w-screen flex flex-col items-center justify-center transition-all ease-in-out bg-black bg-opacity-20 " + `${showFlashCardsModal && "backdrop-blur-sm opacity-100"}`}>
                    <div className={`p-6 h-3/4 relative ${scale} bg-white shadow-sm border border-gray-200 bg-opacity-100`}>
                        <div className="absolute top-5 right-5 flex flex-col">
                            <Icon className={"cursor-pointer"} icon="cross" onClick={handleClose}/>
                        </div>
                        <div className="flex items-center justify-center h-full">
                            <Carousel
                                cards={cards}
                            />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}