
export const cardElementTypes = [
    "grass", "fire", "water", "lightning", "psychic", "fighting", "dark", "metal", "dragon", "colorless"
]

export const cardStageTypes = [
    "basic", "stage1", "stage2"
]

export const abbrevToElementType = {
    'E' : 'empty',
    'G' : 'grass',
    'R' : 'fire',
    'W' : 'water',
    'L' : 'lightning',
    'P' : 'psychic',
    'F' : 'fighting',
    'D' : 'dark',
    'M' : 'metal',
    'C' : 'colorless',
    'N' : 'dragon',
    'Y' : 'fairy'
}

export const elementTypeToAbbrev = {
    'empty': 'E',
    'grass': 'G',
    'fire': 'R',
    'water': 'W',
    'lightning': 'L',
    'psychic': 'P',
    'fighting': 'F',
    'dark': 'D',
    'metal': 'M',
    'colorless': 'C',
    'dragon': 'N',
    'fairy': 'Y'
}

export const getImageBlankURL = function(elem, stage, options={}) {
    let url = `https://pokecardmaker.net/assets/cards/baseSets/scarletAndViolet/supertypes/pokemon/types/${elem}/subtypes/${stage}`

    url += ".png"
    return url;
};