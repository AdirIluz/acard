import { FunctionComponent, useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { FavoritesState, getFavoritesStore } from "../redux/store";
import { getCards } from "../services/cardService";
import { SiteTheme } from "../App";
import Card from "../interfaces/Card";
import CardComp from "./CardComp";
import Favorite from "../interfaces/Favorite";

interface HomeProps {
    user: any;
}

const Home: FunctionComponent<HomeProps> = ({ user }) => {
    const [cards, setCards] = useState<Card[]>([]);
    const dispatch = useDispatch();
    const theme = useContext(SiteTheme);
    dispatch(getFavoritesStore);
    const favorites = useSelector((state: { favorites: FavoritesState }) => state.favorites.favorites);
    const favoriteCardsIds = favorites.map((card: Favorite) => card.cardId?.toString());

    useEffect(() => {
        getCards()
            .then((res) => {
                setCards(res.data);
            })
            .catch((err) => console.log(err));
    }, [cards]);

    return <div className={`container ${theme.color}`}>
        <h1>Welcome To Adir's Cards </h1>

        <div className="row">
            {cards.length ? (cards.map((card: Card) =>
                <CardComp key={card.id} card={card} user={user} isFavorite={favoriteCardsIds.includes(card.id?.toString() || '')} />)) :
                (<p> No products</p >)
            }
        </div>
    </div>
}

export default Home;