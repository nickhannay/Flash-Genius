import { API } from 'aws-amplify';
import { API_KEY } from "./api_key";
export const api = {

    // Used in the FlashCards and Shared tabs
    GetUserCards(user_id) {
        return API.get('FlashgeniusAPIAmir', `/flashcards/${user_id}`, {
            headers: {
                'x-api-key': API_KEY
            },
        })
    },

    // Used to create a new card: OK
    CreateCardSet(flash_set, user_id) {
        return API.post('FlashgeniusAPIAmir', `/flashcards/${user_id}`, {
            headers: {
                'x-api-key': API_KEY
            },
            body: flash_set
        })
    },

    // Used to delete a card based on its ID: called from FlashCards
    DeleteSingleCard(card_id) {
        return API.del('FlashgeniusAPIAmir', `/flashcards/card/${card_id}`, {
            headers: {
                'x-api-key': API_KEY
            },
        })
    },

    // Used to add the User to the database when they log in
    CreateUser(userObj) {
        return API.post('FlashgeniusAPIAmir', `/users`, {
            headers: {
                'x-api-key': API_KEY
            },
            body: userObj
        })
    },

    // Used to get an array of user IDs
    GetAllUserIDs() {
        return API.get('FlashgeniusAPIAmir', `/users`, {
            headers: {
                'x-api-key': API_KEY
            },
        })
    },

    // Used to return the user object accosiated with user_id
    GetCurrentUserInfo(user_id) {
        console.log("In GetCurrentUserInfo(), user_id = ", user_id);
        return API.get('FlashgeniusAPIAmir', `/users/${user_id}`, {
            headers: {
                'x-api-key': API_KEY
            },
        })
    },

    // Used to create a new card: OK
    CreateFavoriteCardSet(flash_set, user_id) {
        return API.post('FlashgeniusAPIAmir', `/favorites/${user_id}`, {
            headers: {
                'x-api-key': API_KEY
            },
            body: flash_set
        })
    },

    // Used to get the current user's favortie card
    GetFavoriteCards(user_id) {
        return API.get('FlashgeniusAPIAmir', `/favorites/${user_id}`, {
            headers: {
                'x-api-key': API_KEY
            },
        })
    },

    // Used to delete a card from the favorites DB
    DeleteFavortieCard(card_id) {
        return API.del('FlashgeniusAPIAmir', `/favorites/card/${card_id}`, {
            headers: {
                'x-api-key': API_KEY
            },
        })
    }



}