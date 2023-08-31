import { FunctionComponent, useContext } from "react";
import { Link } from "react-router-dom";
import { deleteCard } from "../services/cardService";
import { successMsg } from "../services/feedbackService";
import Card from "../interfaces/Card";
import { addFavorite, getFavorite, removeFavorite } from "../services/favoritesService";
import { useDispatch } from "react-redux";
import { addFavoriteStore, removeFavoriteStore } from "../redux/store";
import { SiteTheme } from "../App";

interface CardCompProps {
    card: Card;
    user: any;
    isFavorite?: boolean;
}

const CardComp: FunctionComponent<CardCompProps> = ({ card, user, isFavorite }) => {
    const isAdmin = user.role === "Admin";
    const isBusiness = user.role === "Business";
    const dispatch = useDispatch();
    const theme = useContext(SiteTheme);

    const handleDelete = (id: number) => {
        if (window.confirm("Are you sure?")) {
            deleteCard(id)
                .then((res) => successMsg("Card deleted successfully!"))
                .catch((err) => console.log(err));
        }
    }
    const handleFavorite = () => {
        if (isFavorite) {
            getFavorite(user.id, Number(card.id))
                .then((res) => removeFavorite(Number(res.data[0].id))
                    .catch((err) => console.log(err)))
                .catch((err) => console.log(err));
            dispatch(removeFavoriteStore({ cardId: Number(card.id), userId: Number(user.id) }))
        } else {
            addFavorite(card.id?.toString() || '', user.id.toString())
                .catch((err) => console.log(err));
            dispatch(addFavoriteStore({ cardId: card.id?.toString(), userId: user.id.toString() }))
        }
    }

    return <div key={card.id}
        className={`card col-md-4 col-lg-6 ${theme.background} ${theme.color}`}><div>
            <img src={card.imageUrl} className="card-img-top" alt={card.title} /></div>
        <div className="card-body">
            <h5 className="card-title"> {card.title} </h5>
            <h6 className="card-subtitle mb-2">
                {card.subTitle}
            </h6>
            <p className="card-text">Phone: {card.phone}</p>
            <p className="card-text">Adress: {card.street} {card.houseNumber} ,{card.city}</p>
            <p className="card-text">Number: {card.id}</p>
            <p> <Link to={`/card-details/${card.id}`}> <button className={`btn btn-primary `}>More information</button></Link></p>
            {(isAdmin || isBusiness) &&
                <>
                    <Link to="" onClick={() => handleDelete(card.id as number)} ><i className={`fa-solid fa-trash ${theme.color}`}></i></Link>
                    <Link to={`/home/update-card/${card.id}`}><i className={`fa-solid fa-pen-to-square ${theme.color}`}></i></Link>
                </>
            }
            <a href={`tel:${card.phone}`}><i className={`fa-solid fa-phone ${theme.color}`} ></i></a>
            <i className={`fa-solid fa-heart ${theme.color}`} onClick={handleFavorite} style={isFavorite ? { color: "red" } : {}}></i>
        </div>
    </div >

}

export default CardComp;