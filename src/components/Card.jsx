import React from 'react'
import { useState } from 'react';
import ReactMarkdown from 'react-markdown'
import EnergyCost from './EnergyCost';
import './Card.css'


function Card({ name, type, stage, hp, art, artOffsetX, artOffsetY, abilities, attacks}) {

    const [cardMouseX, setCardMouseX] = useState(0);
    const [cardMouseY, setCardMouseY] = useState(0);

    const cardTexturePath = 'src/assets/card_test_blank.png'

    const cardStyle = {
        backgroundImage: `url(${cardTexturePath})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
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
        <div className='card'  style={{...cardStyle, transform: `perspective(1000px) rotateX(${cardMouseY*50}deg) rotateY(${cardMouseX*-50}deg)`}}
        onMouseMove={mouseMoveHandler}
        onMouseLeave={() => {setCardMouseX(0); setCardMouseY(0);}}
        >
            <div className='card-header'>
                <p className='card-name'>{name}</p>
                <div className='card-hp'>
                    <div className='card-hp-hp'>HP</div>{hp}
                </div>
            </div>

            <div className='card-art'>
                {/* {art ? <img src={art} alt='Card art' style={{translate: `${artOffsetX}px ${artOffsetY}px`}}/> : <div id='no-art'>No art.</div>} */}
                {art 
                    ? <div className="art-image" 
                    style={{backgroundPosition: `${artOffsetX}px ${artOffsetY}px`, backgroundImage: `url(${art})`}}/> 
                    
                    : <div id='no-art'>No art.</div>
                }
                {/* <div id='shadow'/> */}
                {/* TODO: fix shadow bug */}
            </div>

            <div className='card-body'>
                {attacks.map((attack, index) => (
                    <div className='attack-container' key={index}>
                        <div className='attack-header'>
                            <div className='attack-cost'>
                                <EnergyCost cost={attack['cost']}/>
                            </div>
                            <div className='attack-name'>{attack['name']}</div>
                            <div className='attack-damage'>{attack['damage']}</div>
                        </div>
                        <ReactMarkdown className='attack-desc'>{attack['description']}</ReactMarkdown>
                    </div>
                ))}

            </div>
        </div>
    );
}

export default Card;