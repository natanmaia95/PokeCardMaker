import React from "react";

const energyIcons = {
    'G' : 'src/assets/energy/grass.png',
    'R' : 'src/assets/energy/fire.png',
    'W' : 'src/assets/energy/water.png',
    'L' : 'src/assets/energy/lightning.png',
    'P' : 'src/assets/energy/psychic.png',
    'F' : 'src/assets/energy/fighting.png',
    'D' : 'src/assets/energy/darkness.png',
    'M' : 'src/assets/energy/metal.png',
    'C' : 'src/assets/energy/colorless.png',
    'N' : 'src/assets/energy/dragon.png',
    'Y' : 'src/assets/energy/fairy.png'
}

const EnergyCost = function({cost='', height="40px"}) {
    return (
    <div className='energy-cost'>
    {
        cost.split('').map((char, index) => {
            const icon = energyIcons[char];
            if (icon == null) return null;
            return (
            <img className='energy-icon' key={index} src={icon} alt={char}
            style={{aspectRatio: "1/1", height: height, margin:"2px"}}
            />)
        })
    }
    </div>
    );
}

export default EnergyCost;