import React from 'react'
import ReactMarkdown from 'react-markdown'
import './Card.css'


function Card({ name, type, stage, hp, art, artOffsetX, artOffsetY, abilities, attacks}) {

    const cardTexturePath = 'src/assets/card_test_blank.png'

    const cardStyle = {
        backgroundImage: `url(${cardTexturePath})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }


    return (
        <div className='card' style={cardStyle}>
            <div className='card-header'>
                <p className='card-name'>{name}</p>
                <div className='card-hp'>
                    <div className='card-hp-hp'>HP</div>{hp}
                </div>
            </div>

            <div className='card-art'>
                {/* {art ? <img src={art} alt='Card art' style={{translate: `${artOffsetX}px ${artOffsetY}px`}}/> : <div id='no-art'>No art.</div>} */}
                {art ? <div className="art-image" style={{backgroundPosition: `${artOffsetX}px ${artOffsetY}px`, backgroundImage: `url(${art})`}}/> : <div id='no-art'>No art.</div>}
                <div id='shadow'/>
            </div>

            <div className='card-body'>
                {attacks.map((attack, index) => (
                    <div className='attack-container' key={index}>
                        <div className='attack-header'>
                            <div className='attack-cost'>{attack['cost']}</div>
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