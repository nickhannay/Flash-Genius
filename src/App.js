import './App.css';
import React, { useState, useEffect } from "react";
import { Tabs, Tab, Icon } from "@blueprintjs/core";
import { CreateCard } from './Components/CreateCard';
import { User } from './Components/User';
import { GetSharedCards } from './Components/GetSharedCards';
import { FlashCards } from './Components/FlashCards';
import { GetCurrentUserCards } from './Components/GetCurrentUserCards'

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { GetFavoriteCards } from './Components/GetFavorites';


import { Amplify, Hub } from 'aws-amplify';
import awsconfig from './aws-exports';
import { api } from "./api.js"

Amplify.configure(awsconfig);

const ActiveTabs = {
  FLASHCARDS: "FLASHCARD",
  CREATE: "CREATE",
  SHARE: "SHARE",
  FAVORITE: "FAVORITE",
  USER: "USER",
}

export const Intent = {
  NONE: "none",
  PRIMARY: "primary",
  SUCCESS: "success",
  WARNING: "warning",
  DANGER: "danger",
};


function listenToAuthEvents() {
  Hub.listen('auth', (data) => {
    const { payload } = data;
    switch (payload.event) {
      case 'signIn':
        const user = {
          "user_id": payload.data.username,
          "email": payload.data.attributes.email,
          "family_name": payload.data.attributes.family_name,
          "given_name": payload.data.attributes.given_name
        };
        api.CreateUser(user)
          .catch(error => console.error(error));
        break;

      default:
        break;
    }
  });
}

function App({ signOut, user }) {
  const [activeTab, setActiveTab] = useState(ActiveTabs.FLASHCARDS);
  const [showFlashCardsModal, setShowFlashCardsModal] = useState(false);
  const [cards, setCards] = useState([]);
  // current user's ID
  const [currentUserID, setCurrentUserID] = useState("");

  // Handles getting the current user's ID
  useEffect(() => {
    async function getCurrentUser() {
      try {
        setCurrentUserID(user.username);
      } catch (error) {
        console.log('Error getting current user:', error);
        setCurrentUserID("");
      }
    }
    getCurrentUser();
  }, [activeTab, currentUserID, user]);

  useEffect(() => {
    listenToAuthEvents();
  }, []);

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
        {/* To Display current user's flashcards */}
        <Tabs className="m-10" id="tab" large={true} animate={true} onChange={(newTab) => setActiveTab(newTab)} selectedTab={activeTab}>
          <Tab title={<span className=""> <Icon icon="lightning" /> FlashCards</span>} id={ActiveTabs.FLASHCARDS} renderActiveTabPanelOnly={true} panel={
            <GetCurrentUserCards
              showFlashCardsModal={showFlashCardsModal}
              setShowFlashCardsModal={setShowFlashCardsModal} // ?? not used
              handleFocus={handleFocus}
              activeTab={activeTab}
              userId={currentUserID}
            />
          }
          />
          {/* To create flashcards */}
          <Tab title={<span className=""><Icon icon="add" /> Create</span>} id={ActiveTabs.CREATE} panel={
            <CreateCard
              userId={currentUserID}
            />
          }
          />
          {/* To display flashcards by searching for user IDs */}
          <Tab title={<span className=""><Icon icon="shared-filter" /> Share</span>} id={ActiveTabs.SHARE} panel={
            <GetSharedCards
              setShowFlashCardsModal={setShowFlashCardsModal}
              handleFocus={handleFocus}
              activeTab={activeTab}
            />
          }
          />
          <Tab title={<span className=""><Icon icon="star" /> Favorites</span>} id={ActiveTabs.FAVORITE} panel={
            <GetFavoriteCards
              setShowFlashCardsModal={setShowFlashCardsModal}
              handleFocus={handleFocus}
              activeTab={activeTab}
              userId={currentUserID}
            />
          }
          />
          <Tabs.Expander />
          <Tab title={<span className=""> <Icon icon="User" /> User</span>} id={ActiveTabs.USER} panel={
            <User
              userID={currentUserID}
              signOut={signOut}
              activeTab={activeTab}
            />
          } />
        </Tabs>
      </div>
    </div>
  );
}

export default withAuthenticator(App);
