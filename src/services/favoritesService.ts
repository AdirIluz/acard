import axios from "axios";

const api: string = `${process.env.REACT_APP_API}/favorites`;

export function getFavorite(userId: number, cardId: number) {
    return axios.get(`${api}?userId=${userId}&cardId=${cardId}`);
}

export function addFavorite(cardId: string, userId: string) {
    return axios.post(api, { userId: userId, cardId: cardId });
}

export function removeFavorite(cardId: number) {
    return axios.delete(`${api}/${cardId}`);
}

export function getFavoritesByUserId(userId: number) {
    return axios.get(`${api}?userId=${userId}`);
}
