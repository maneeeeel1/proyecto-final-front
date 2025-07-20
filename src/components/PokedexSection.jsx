import React, { useEffect, useState, useRef } from "react";
import getBackground from "../background/BackgroundCard";
import MegaEvolutionCard from "./megaEvolutionCard";
import { useTheme } from "../context/ThemeContext";
import "./PokedexSection.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Pokedex(){
  const [pokemons, setPokemons] =useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredMegaPokemon, setHoveredMegaPokemon] =useState(null);
  const hoverTimeoutRef = useRef(null);
  const megaCardRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() =>{
    fetch(`${API_BASE_URL}/api/pokemon`)
    .then((res) =>{
      if(!res.ok){
        throw new Error ("Error al conectar con server");
      }
      return res.json();
    })
    .then((data) =>{
      setPokemons(data);
      setLoading(false);
      console.log("Datos de pokemon recibidos", data);
    })
    .catch((err) =>{
      console.log("Error:", err);
      setLoading(false);
    });
  }, []);

  useEffect(() =>{
    const handleClickOutside= (event) =>{
      if(megaCardRef.current && !megaCardRef.current.contains(event.target)){
        setHoveredMegaPokemon(null);
      }
    };

    if (hoveredMegaPokemon) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [hoveredMegaPokemon]);


  const handleMouseEnter = (p) =>{
    if(hoverTimeoutRef.current){
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current=null;
    }
    if(p.hasMegaEvolution && p.megaEvolutions.length > 0){
      setHoveredMegaPokemon(p.megaEvolutions[0]);
    }else{
      setHoveredMegaPokemon(null);
    }
  };

  const handleMouseLeave = () =>{
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredMegaPokemon(null);
    }, 2000);
  };

    const handleMegaCardMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const handleMegaCardMouseLeave = () => {
    handleMouseLeave();
  };

    if(loading) return <p>Cargando Pokémons...</p>;
  
    const sectionClasses = `section ${theme === "light" ? "light-theme" : ""}`;
    const boxClasses = `box ${theme === "light" ? "light-theme" : ""}`;
    const miniBoxClasses = `mini-box ${theme === "light" ? "light-theme" : ""}`;
    const megaCardOverlayClasses = `mega-card-overlay ${theme === "light" ? "light-theme" : ""}`;
    
    return (
            <section id="pokedex" className={sectionClasses}>
             <img 
            src={theme === "light" ? "/titles/POKEDEX-18-6-2025.png" : "/titles/pokedex_dark.png"}
            alt="Pokedex"
            className="title"
             />
                    <div className={boxClasses}>
                      <div className="mini-boxes">
                        {pokemons.map((p) =>(
                          <div key={p._id || p.id} 
                          className={miniBoxClasses}
                          style={getBackground(p.tipo)}
                          onMouseEnter={() => handleMouseEnter(p)}
                          onMouseLeave={handleMouseLeave}
                           >
                            <img src={p.imagen} alt={p.nombre} width="100px" />
                            <h3>{p.nombre.toUpperCase()}</h3>
                            <p>{p.tipo.join(" / ")}</p>
                          </div>
                        ))}
                      </div>
                         {hoveredMegaPokemon && (
                          <div
                          className={megaCardOverlayClasses}
                          onMouseEnter={handleMegaCardMouseEnter}
                          onMouseLeave={handleMegaCardMouseLeave}
                          ref={megaCardRef}
                          >
                            <MegaEvolutionCard  megaPokemon={hoveredMegaPokemon} />
                          </div>
                         )}
                     </div>
            </section>
    );
  }

export default Pokedex;