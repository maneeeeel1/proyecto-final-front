import { useTheme } from "../context/ThemeContext";
import "./Hero.css";

function Hero(){
  const { theme } = useTheme();

  const backgroundImage = theme === "light"
  ? "/background/pikachu.jpg"
  :"background/background_darkmode.jpg";

    return (
        <section id="hero" className="hero-section">
            <img src={backgroundImage} className="hero-bg-image" alt="Fondo" />
            <div className="hero-text-container">            
                <h1>Bienvenidos a mi Proyecto Final!</h1> <br />
                <p>Vamos a explorar el mundo Pokémon</p>
            </div>
        </section>
    );
}


export default Hero;