import { FunctionComponent, useContext } from "react";
import { NavLink } from "react-router-dom";
import { SiteTheme } from "../App";

interface FooterProps {
    isLoggedIn: boolean
    user: any;
}

const Footer: FunctionComponent<FooterProps> = ({ user, isLoggedIn }) => {
    const isAdmin = user.role === "Admin";
    const isBusiness = user.role === "Business";
    const theme = useContext(SiteTheme);

    return <div className="footer-div">
        <nav className={`footer-navbar fixed-bottom navbar navbar-expand-lg ${theme.background} ${theme.color}`}>
            <div className="container-fluid">
                <ul className="navbar-nav m-auto mb-2 mb-lg-0">
                    <li className=" footer nav-item">
                        <NavLink to="/about" className={`nav-link ${theme.color}`} aria-current="page"><i className="fa-solid fa-circle-info"></i><br />About</NavLink>
                    </li>
                    {isLoggedIn ? (
                        <>
                            <li className="footer nav-item">
                                <NavLink className={`nav-link ${theme.color}`} to={`/favorites/${user.id}`} aria-current="page"><i className="fa-solid fa-heart"></i><br /> Fav Cards</NavLink>
                            </li>
                            {(isAdmin || isBusiness) &&
                                <li className="footer nav-item">
                                    <NavLink className={`nav-link ${theme.color}`} to={`/my-cards/${user.id}`} aria-current="page"><i className="fa-solid fa-image-portrait"></i><br /> My Cards</NavLink>
                                </li>
                            }
                        </>) : (<>
                        </>)}
                </ul>
            </div>
        </nav>
    </div >

}

export default Footer;