import React from 'react';
import getBackground from "../background/BackgroundCard";
import "./megaEvolutionCard.css";
import { useTheme } from "../context/ThemeContext";

function MegaEvolutionCard({ megaPokemon }) {
    if (!megaPokemon) return null;

    const {theme} = useTheme();

    const backgroundStyles = megaPokemon.tipo && megaPokemon.tipo.length > 0
        ? getBackground(megaPokemon.tipo)
        : {};

    const cardContainerClasses = `card-style ${theme === "dark" ? "dark-mode" : ""}`
    return (
        <div className={cardContainerClasses} style={backgroundStyles}>
            <img src={megaPokemon.imagen} alt={megaPokemon.nombre} className="card-image" />
            <h3 className="card-name">{megaPokemon.nombre.toUpperCase()}</h3>
            <p className="card-type">{megaPokemon.tipo.join(" / ")}</p>
        </div>
    );
}

export default MegaEvolutionCard;