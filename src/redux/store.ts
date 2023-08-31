import { configureStore, createSlice } from '@reduxjs/toolkit';
import Card from '../interfaces/Card';
import Favorite from '../interfaces/Favorite';

export interface CardState {
    cards: Card[];
}

export interface FavoritesState {
    favorites: Favorite[];
}

const initialCardsState: CardState = {
    cards: []
};

const initialFavoritesState: FavoritesState = {
    favorites: []
};

const cardsSlice = createSlice({
    name: 'cards',
    initialState: initialCardsState,
    reducers: {
        setCardsStore: (state, action) => {
            state.cards = action.payload;
        },
        getCardsStore: (state) => state,
        addCardStore: (state, action) => {
            state.cards = [...state.cards, action.payload];
        },
    }
});

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: initialFavoritesState,
    reducers: {
        setFavoritesStore: (state, action) => {
            state.favorites = action.payload;
        },
        getFavoritesStore: (state) => state,
        addFavoriteStore: (state, action) => {
            state.favorites = [...state.favorites, action.payload];
        },
        removeFavoriteStore: (state, action) => {
            const { cardId, userId } = action.payload;
            state.favorites = state.favorites.filter((favorite) => !(Number(favorite.cardId) === cardId && Number(favorite.userId) === userId)
            );
        }
    }
});
const store = configureStore({
    reducer: { card: cardsSlice.reducer, favorites: favoritesSlice.reducer }
});

export const { setCardsStore, getCardsStore, addCardStore } = cardsSlice.actions;
export const { setFavoritesStore, getFavoritesStore, addFavoriteStore, removeFavoriteStore } = favoritesSlice.actions;
export default store;