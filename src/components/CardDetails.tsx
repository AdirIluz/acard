import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCardById } from "../services/cardService";
import Card from "../interfaces/Card";
import { SiteTheme } from "../App";

interface CardDetailsProps {

}

const CardDetails: FunctionComponent<CardDetailsProps> = () => {
    const { id } = useParams();
    const [card, setCard] = useState<Card | null>(null);
    const theme = useContext(SiteTheme);
    useEffect(() => {
        getCardById(Number(id))
            .then((res) => setCard(res.data))
            .catch((err) => console.log(err));
    }, [id]);

    return <div className={`card-details-container container ${theme.background} ${theme.color}`}>
        {card ? (
            <div className="row">
                <div className={`col-md-6 col-lg-4 $ brand`}>
                    <h2>{card.title}</h2>
                    <img className={`card-details-image`} src={card.imageUrl} alt={card.imageAlt} />

                </div>
                <div className={`col-md-6 col-lg-4 description`}>
                    <h5>About {card.title}</h5>
                    <p>{card.description}</p>
                </div>
                <div className={`col-md-12 col-lg-4 information`}>
                    <h6>Location</h6>
                    <p><i className="fa-solid fa-earth-americas"></i>Country: {card.country}</p>
                    <p><i className="fa-solid fa-map"></i>{card.city} , {card.street}, {card.houseNumber}</p>

                    <h6>Contact us</h6>
                    <p><i className={`fa-solid fa-phone`} ></i>Phone: {card.phone}</p>
                    <p><i className="fa-solid fa-envelope"></i>Email: {card.email}</p>
                </div>
                <button className="btn btn-web"><Link to={`${card.web}`}>Go To Website</Link></button>

            </div>
        ) : (
            <> Loading... </>
        )}
    </div >
}

export default CardDetails;