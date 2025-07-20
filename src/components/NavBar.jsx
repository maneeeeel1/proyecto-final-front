import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "../context/ThemeContext.jsx";
import "./NavBar.css";

function NavBar (){
    const { getTotalItems } = useCart();
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const navigate = useNavigate();

    const handleSpaNavigation = (sectionId) => {
        if (location.pathname !== "/") {
            navigate("/");
            setTimeout(() => {
                const section = document.getElementById(sectionId);
                if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                }
            }, 100);
        } else {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    return (
        <nav className="navbar">
            <div className="poke-toggle-container">
                <input
                type="checkbox"
                id="theme-toggle-pokemon"
                className="poke-checkbox"
                checked={theme === "dark"}
                onChange={toggleTheme}
                />
                <label htmlFor="theme-toggle-pokemon" className="poke-slider">
                    <img src="../../buttonsPlay/poke-slider.png" className="poke-img"></img>
                </label>
            </div>
            <a onClick={() => handleSpaNavigation("hero")} className="navlink">INICIO</a>
            <a onClick={() => handleSpaNavigation("game")} className="navlink">JUGAR</a>
            <a onClick={() => handleSpaNavigation("pokedex")} className="navlink">POKEDEX</a>
            <a onClick={() => handleSpaNavigation("store")} className="navlink">TIENDA</a>

            <Link to="/cart" className="navlink cart-link">
                <FontAwesomeIcon icon={faShoppingBasket} />
                {getTotalItems() > 0 && <span className="cart-count"></span>}
            </Link>
        </nav>
    );
}

export default NavBar;