import React from "react";

const energyIcons = {
    'G' : 'assets/energy/grass.png',
    'R' : 'assets/energy/fire.png',
    'W' : 'assets/energy/water.png',
    'L' : 'assets/energy/lightning.png',
    'P' : 'assets/energy/psychic.png',
    'F' : 'assets/energy/fighting.png',
    'D' : 'assets/energy/darkness.png',
    'M' : 'assets/energy/metal.png',
    'C' : 'assets/energy/colorless.png',
    'N' : 'assets/energy/dragon.png',
    'Y' : 'assets/energy/fairy.png'
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