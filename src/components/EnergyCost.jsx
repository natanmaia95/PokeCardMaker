import React from "react";

const energyIcons = {
    'E' : 'assets/energy_sv/empty.png',
    'G' : 'assets/energy_sv/grass.png',
    'R' : 'assets/energy_sv/fire.png',
    'W' : 'assets/energy_sv/water.png',
    'L' : 'assets/energy_sv/lightning.png',
    'P' : 'assets/energy_sv/psychic.png',
    'F' : 'assets/energy_sv/fighting.png',
    'D' : 'assets/energy_sv/darkness.png',
    'M' : 'assets/energy_sv/metal.png',
    'C' : 'assets/energy_sv/colorless.png',
    'N' : 'assets/energy_sv/dragon.png',
    'Y' : 'assets/energy_sv/fairy.png'
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