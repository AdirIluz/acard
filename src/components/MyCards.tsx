import { FunctionComponent, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritesState, getFavoritesStore } from "../redux/store";
import { useDispatch, useSelector } from 'react-redux';
import { SiteTheme } from "../App";
import Card from "../interfaces/Card";
import { getCardsByUserId } from "../services/cardService";
import CardComp from "./CardComp";
import Favorite from "../interfaces/Favorite";



interface MyCardsProps {
    user: any
}

const MyCards: FunctionComponent<MyCardsProps> = ({ user }) => {
    const [cards, setCards] = useState<Card[]>([]);
    const theme = useContext(SiteTheme);
    const dispatch = useDispatch();
    dispatch(getFavoritesStore);
    const favorites = useSelector((state: { favorites: FavoritesState }) => state.favorites.favorites);
    const favoriteCardsIds = favorites.map((card: Favorite) => card.cardId?.toString());

    useEffect(() => {
        if (user.id) {
            getCardsByUserId(Number(user.id))
                .then((res) => setCards(res.data))
                .catch((err) => console.log(err));

        }
    }, [user.id]);
    return <>
        <div className={`container ${theme.color}`}>
            <h1>My Cards</h1>
            <div className="row">
                {cards.length ? (cards.map((card: Card) =>
                    <CardComp key={card.id} card={card} user={user} isFavorite={favoriteCardsIds.includes(card.id?.toString() || '')} />)) :
                    (<p style={{ fontSize: "2rem" }}> No products</p >)
                }
            </div>

        </div>
        <Link className="btn btn-success w-50" to={`/add-card`}>Add Card<i className="fa-solid fa-plus"></i></Link>
    </>;
}

export default MyCards;