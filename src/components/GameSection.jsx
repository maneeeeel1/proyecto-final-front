import GameRoom from "./GameRoom";
import { useTheme } from "../context/ThemeContext";
import "./GameSection.css";


function Game(){
  const { theme } = useTheme();

  const sectionClasses= `section ${theme === "light" ? "light-theme" : ""}`;
  const boxClasses = `box ${theme === "light" ? "light-theme" : ""}`;



    return (
        <section id="game" className={sectionClasses}>
            <img 
            src={theme === "light" ? "/titles/JUGAR-18-6-2025.png" : "/titles/jugar_dark.png"}
            alt="Jugar"
            className="title"
             />
                <div className={boxClasses}>
                    <GameRoom />
                </div>
        </section>
    );
}


export default Game;