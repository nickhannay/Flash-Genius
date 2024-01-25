import "../App.css"
import React, { useState, useEffect } from "react";
import { Tabs, Tab, Icon } from "@blueprintjs/core";
import { CreateCard } from "../Components/CreateCard";
import { User } from './User';
import { GetSharedCards } from './GetSharedCards';
import { FlashCards } from './FlashCards';


const ActiveTabs =  { 
  FLASHCARDS: "FLASHCARD",
  CREATE: "CREATE",
  USER: "USER",
 }

 export const Intent = {
  NONE: "none",
  PRIMARY: "primary",
  SUCCESS: "success",
  WARNING: "warning",
  DANGER: "danger",
};

function Home() {
  const [activeTab, setActiveTab] = useState(ActiveTabs.FLASHCARDS);
  const [showFlashCardsModal, setShowFlashCardsModal] = useState(false);
  const [cards, setCards] = useState([]);

  const handleFocus = (cards) => {
    setCards(cards);
  };

  return (
    <div className="relative">
        <FlashCards 
            showFlashCardsModal={showFlashCardsModal}
            setShowFlashCardsModal={setShowFlashCardsModal}
            cards={cards}
            handleFocus={handleFocus}
        />
      <div className="text-center mt-10 text-2xl font-bold">FlashGenius</div>
      <div className=" justify-center mt-10">
          <Tabs className="m-10" id="tab" large={true} animate={true} onChange={(newTab) => setActiveTab(newTab)} selectedTab={activeTab}>
            <Tab title={<span className=""> <Icon icon="lightning" /> FlashCards</span>} id={ActiveTabs.FLASHCARDS} renderActiveTabPanelOnly={true} panel={
              <GetSharedCards
                showFlashCardsModal={showFlashCardsModal}
                setShowFlashCardsModal={setShowFlashCardsModal}
                handleFocus={handleFocus}
                activeTab={activeTab}
              />
            } />
            <Tab title={<span className=""><Icon icon="add" /> Create</span>} id={ActiveTabs.CREATE} panel={
              <CreateCard />
            } />
            <Tabs.Expander />
            <Tab title={<span className=""> <Icon icon="User" /> User</span>} id={ActiveTabs.USER} panel={
              <User/>
            } />
          </Tabs>
      </div>
    </div>
    
  );
}

export default Home;