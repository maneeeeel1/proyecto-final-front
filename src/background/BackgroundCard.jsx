import React from "react";

const typeGradientColors = {
  normal:    "#A8A77A",
  fire:      "#EE8130",
  water:     "#6390F0",
  electric:  "#F7D02C",
  grass:     "#08F622",
  ice:       "#96D9D6",
  fighting:  "#C22E28", 
  poison:    "#A33EA1",   
  ground:    "#E2BF65", 
  flying:    "#A98FF3",  
  psychic:   "#F95587",  
  bug:       "#A6B91A",  
  rock:      "#B6A136", 
  ghost:     "#735797",  
  dark:      "#705746",  
  steel:     "#B7B7CE", 
  fairy:     "#D685AD", 
  dragon:    "#DDDDDD"
};

const getBackground = (tipo) =>{
    if(tipo.length === 1) {
        return { backgroundColor: typeGradientColors[tipo[0]]};

    }else if(tipo.length === 2){
        const color1 = typeGradientColors[tipo[0]];
        const color2 = typeGradientColors[tipo[1]];
        return{
            backgroundImage: `linear-gradient(135deg, ${color1}, ${color2})`
        };
    }
    return {};
};

export default getBackground;

