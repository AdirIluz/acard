import { Fragment, FunctionComponent, useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardState, FavoritesState, getCardsStore, getFavoritesStore } from "../redux/store";
import Card from "../interfaces/Card";
import { SiteTheme } from "../App";
import CardComp from "./CardComp";
import Favorite from "../interfaces/Favorite";

interface FavoritesProps {
    user: any;
}

const Favorites: FunctionComponent<FavoritesProps> = ({ user }) => {
    const [cards, setCards] = useState<Card[]>([]);
    const dispatch = useDispatch();
    const theme = useContext(SiteTheme);
    const cardsStore = useSelector((state: { card: CardState }) => state.card.cards);
    const favorites = useSelector((state: { favorites: FavoritesState }) => state.favorites.favorites);

    dispatch(getCardsStore);
    dispatch(getFavoritesStore);

    useEffect(() => {
        const getFavoriteCards = async () => {
            const favoriteCardsIds = favorites.map((card: Favorite) => card.cardId.toString());
            const favoriteCards = cardsStore.filter((card) => favoriteCardsIds.includes(card.id?.toString() || ''));

            setCards(favoriteCards);
        }
        if (user.id) {
            getFavoriteCards();
        }
    }, [user.id, cardsStore, favorites]);

    return <>
        <div className={`container ${theme.color}`}>
            <h2>Favorites Cards:  {user.firstName}</h2>
            <div className="row">
                {cards.length ? (cards.map((card: Card) =>
                    <Fragment key={card.id}>
                        <CardComp card={card} user={user} isFavorite />
                    </Fragment>
                )) :
                    (<p> No products</p >)
                }
            </div>
        </div>
    </>;
}

export default Favorites;