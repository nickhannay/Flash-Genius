import { useEffect, useState } from "react";
import { FlashcardArray } from "react-quizlet-flashcard";

export function Carousel({cards}) {
    const [flashCards, setFlashCards] = useState([]);

    useEffect(() => {
        const flashCardsList = cards.map((e, i) => {
            return {
                id: i,
                frontHTML: <div className="flex flex-wrap items-center justify-center text-center h-full w-full text-3xl overflow-x-scroll">{e.question}</div>,
                backHTML: <div className="flex flex-wrap items-center justify-center text-center h-full w-full text-3xl overflow-x-scroll">{e.answer}</div>
            }
        });
        setFlashCards(flashCardsList);
    }, [cards]);

    return (
        <div>
        {flashCards !== undefined && flashCards.length !== 0 && <FlashcardArray cards={flashCards} />}
        </div>
    );
}
