import React from 'react'
import { useState } from 'react';
import ReactMarkdown from 'react-markdown'
import EnergyCost from './EnergyCost';
import './Card.css'
import '../fonts.css'
import { elementTypeToAbbrev, getImageBlankURL } from '../dicts';

function Card({ style, name, subname, isSubnamePrefix, element, stage, blankUrl, hp, evolveFrom, evoArt, art, evolveArt, artOffsetX, artOffsetY, 
    dexNumber, dexCategory, dexHeight, dexWeight, dexDescription, artist, collectorNumber, collectorNumberMax, reg, set,
    abilities, attacks, weakness, resistance, retreatCost,
    meta_scale}) {

    const [cardMouseX, setCardMouseX] = useState(0);
    const [cardMouseY, setCardMouseY] = useState(0);

    // const cardTexturePath = 'assets/blanks/card_test_blank.png'
    // const cardTexturePath = getImageBlankURL(element, stage);
    // console.log("texture url:", cardTexturePath);
    // blankUrl = 'assets/blanks/card_test_blank.png'

    const cardStyle = {
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transform: `perspective(1000px) rotateX(${cardMouseY*50}deg) rotateY(${cardMouseX*-50}deg) scale(${meta_scale})`,
        transition: 'transform 0.4s ease-out',
        // transitionProperty: 'transform'
        color: element == 'dark' ? "var(--text-color-white)" : "var(--text-color-black)"
    };

    const mouseMoveHandler = function(event) {
        //currentTarget is the event owner, target is the actual div the mouse is on
        const rect = event.currentTarget.getBoundingClientRect();

        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        const relativeX = (mouseX - rect.width/2) / rect.width;
        const relativeY = (mouseY - rect.height/2) / rect.height;

        setCardMouseX(relativeX);
        setCardMouseY(relativeY);
    };

    return (
        <div className='card' style={{...cardStyle, ...style}}
        onMouseMove={mouseMoveHandler}
        onMouseLeave={() => {setCardMouseX(0); setCardMouseY(0);}}
        >
            <img draggable="false" className='card-img-blank' src={blankUrl}></img>

            <div className='card-header'>
                
                <div className='card-name'>
                {!(subname != "" && isSubnamePrefix == true) ? null : <p className='card-name-subname'>{subname} </p>}
                {name}
                {!(subname != "" && isSubnamePrefix == false) ? null : <p className='card-name-subname'> {subname}</p>}
                </div>
                
                
                <div className='card-hp'>
                    <div className='card-hp-hp'>HP </div>{hp}
                </div>
                {stage == "basic" ? null : <p className='card-evoname'>Evolves from {evolveFrom}</p>}
                {stage == "basic" ? null : <img className='evolveArt-image' src={evoArt} alt=" "/>}
                
            </div>

            <div className='card-art'>
                {/* {art ? <img src={art} alt='Card art' style={{translate: `${artOffsetX}px ${artOffsetY}px`}}/> : <div id='no-art'>No art.</div>} */}
                {art 
                    ? <div className="art-image" 
                    style={{backgroundPosition: `${artOffsetX}px ${artOffsetY}px`, backgroundImage: `url(${art})`}}/> 
                    
                    : <div id='no-art' alt=" "><p>No art.</p></div>
                }
                {/* <div id='shadow'/> */}
                {/* TODO: fix shadow bug using an image */}
            </div>

            <div className='card-dex-data'>
                <p>{`NO. ${dexNumber.toString().padStart(4, '0')}   ${dexCategory} Pokémon   HT: ${dexHeight}  WT: ${dexWeight}`}</p>
            </div>

            <div className='card-body'>
                {attacks.map((attack, index) => (
                    attack['type'] == 'attack' 

                    ?   <div className='attack-container' key={index}>
                            <div className='attack-header'>
                                <div className='attack-cost'>
                                    <EnergyCost cost={attack['cost']}/>
                                </div>
                                <div className='attack-name'>{attack['name']}</div>
                                <div className='attack-damage'>{attack['damage']}</div>
                            </div>
                            <ReactMarkdown className='attack-desc'>{attack['description']}</ReactMarkdown>
                        </div>

                    :   <div className='attack-container' key={index}>
                            <div className='attack-header'>
                                <img className='ability-sprite' src='assets/sprites/ability_sv.png' />
                                <div className='ability-name'>{attack['name']}</div>
                                {/* <div className='attack-damage'>{attack['damage']}</div> */}
                            </div>
                            <ReactMarkdown className='attack-desc'>{attack['description']}</ReactMarkdown>
                        </div>
                ))}

            </div>

            <div className='card-prefooter'>
                <div className='card-weakness'>
                    <EnergyCost height='25px' cost={elementTypeToAbbrev[weakness]} showEmpty={false}/>
                    <div className='card-prefooter-text'>{weakness != 'empty' ? "x 2" : ""}</div>
                </div>
                <div className='card-resistance'>
                    <EnergyCost height='25px' cost={elementTypeToAbbrev[resistance]} showEmpty={false}/>
                    <div className='card-prefooter-text'>{resistance != 'empty' ? "- 30" : ""}</div>
                </div>
                <div className='card-retreat'>
                    <EnergyCost height='25px' cost={'C'.repeat(retreatCost)}/>
                </div>
            </div>

            <div className='card-footer'>
                <div className='card-dex-description'>
                    {dexDescription}
                </div>

                <div className='card-footer-artist'>
                    Illus. {artist}
                </div>

                <div className='card-footer-collectornum'>
                    {collectorNumber}{collectorNumberMax ? "/"+collectorNumberMax : ""}
                </div>

                <div className='card-footer-reg'>{reg}</div>
                <div className='card-footer-set'>
                    <div className='card-footer-set-inner'>
                        {set ? set : "?"}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;