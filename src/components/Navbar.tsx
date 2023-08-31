import { FunctionComponent, useContext, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { setCardsStore, setFavoritesStore } from "../redux/store";
import { useDispatch } from "react-redux";
import { SiteTheme } from "../App";
import { getCards } from "../services/cardService";
import { getFavoritesByUserId } from "../services/favoritesService";
import Favorite from "../interfaces/Favorite";
import logo from '../A2.png'



interface NavbarProps {
    isLoggedIn: boolean
    setIsLoggedIn: Function;
    user: any;
    isDarkMode: boolean;
    setDarkMode: Function;
}

const Navbar: FunctionComponent<NavbarProps> = ({ user, isLoggedIn, setIsLoggedIn, isDarkMode, setDarkMode }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useContext(SiteTheme);

    const logout = () => {
        sessionStorage.removeItem("userEmail");
        sessionStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
        navigate("/");
    };
    const isAdmin = user.role === "Admin";
    const isBusiness = user.role === "Business";

    useEffect(() => {
        document.body.style.backgroundColor = sessionStorage.getItem("darkMode") === "true" ? "#222022" : "#ceccce";
        if (user.id) {
            getFavoritesByUserId(user.id)
                .then((res) => {
                    dispatch(setFavoritesStore(res.data.map((favCard: Favorite) => ({ userId: favCard.userId, cardId: favCard.cardId }))));
                })
                .catch((err) => console.log(err));

            getCards()
                .then((res) => {
                    dispatch(setCardsStore(res.data));
                })
                .catch((err) => console.log(err));
        }
    }, [user.id, isDarkMode]);
    return <>
        <nav className={`navbar navbar-top navbar-expand-lg ${theme.background} ${theme.color}`}>
            <div className="container-fluid">
                <NavLink className={`navbar-brand ${theme.color}`} to="/home">
                    <img className="logo" src={logo} alt="Logo" />
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {isLoggedIn ? (
                        <>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className={`nav-item`}>
                                    <NavLink to="/about" className={`nav-link ${theme.color}`} aria-current="page">About</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className={`nav-link ${theme.color}`} to={`/favorites/${user.id}`} aria-current="page">Fav Cards</NavLink>
                                </li>
                                {(isAdmin || isBusiness) &&
                                    <>
                                        <li className="nav-item">
                                            <NavLink className={`nav-link ${theme.color}`} to={`/my-cards/${user.id}`} aria-current="page">My Cards</NavLink>
                                        </li>
                                    </>
                                }
                                {isAdmin && <>
                                    <li className="nav-item">
                                        <NavLink className={`nav-link ${theme.color}`} to="/sandbox" aria-current="page">Sandbox</NavLink>
                                    </li>
                                </>}
                            </ul>
                            <button className="btn btn-outline-primary" onClick={logout}>
                                Logout
                            </button>
                            <Link to={`/home/update-user/${user.id}`}> <img className="profile-image" src={`${user.imageUrl}`} alt={`${user.imageAlt}`} />
                            </Link>
                        </>
                    ) : (
                        <>
                            <ul className="navbar-nav ps-2 mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink to="/" className="btn btn-outline-primary" aria-current="page">
                                        Login
                                    </NavLink>
                                </li>
                                <li className="nav-item ps-2 ">
                                    <NavLink to="/register" className="btn btn-outline-primary" aria-current="page">
                                        Sign Up
                                    </NavLink>
                                </li>
                            </ul>
                        </>
                    )}
                </div>
                <ul className="navbar-nav ms-auto ps-2 mb-2 mb-lg-0">
                    <form className="d-flex" role="search">
                        <div className="form-check form-switch"><i className="fa-solid fa-circle-half-stroke"></i>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="flexSwitchCheckDefault"
                                onChange={() => {
                                    setDarkMode(!isDarkMode)
                                    sessionStorage.setItem("darkMode", isDarkMode ? "false" : "true")
                                }}
                            />
                        </div>
                    </form>
                </ul>
            </div>
        </nav >
    </>;
}

export default Navbar;