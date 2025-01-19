import React from "react";
import './Form.css'
import Collapsible from "./Collapsible";
import { cardElementTypes, cardStageTypes } from "../dicts";

function AttackForm({attack, attackIndex, handleAttackChange, removeAttack}) {

    return (<div className='form-attack'>
        <div className='form-attack-header'>
            <label>Name: 
                <input type="text" name="name"
                value={attack.name}
                onChange={(e) =>handleAttackChange(attackIndex, 'name', e.target.value)}
                />
            </label>
            <label>Cost: 
                <input type="text" name="cost" className='attack-input-cost'
                value={attack.cost}
                onChange={(e) =>handleAttackChange(attackIndex, 'cost', e.target.value)}
                />
            </label>
            <label>Damage: 
                <input type="text" name="damage" className='attack-input-damage'
                value={attack.damage}
                onChange={(e) =>handleAttackChange(attackIndex, 'damage', e.target.value)}
                />
            </label>
        </div>

        <div className='form-attack-body'>
            <textarea type="text" name="description" className='attack-area-desc'
            value={attack.description} placeholder="Add a description"
            onChange={(e) =>handleAttackChange(attackIndex, 'description', e.target.value)}
            />

            <button onClick={(e) => removeAttack(attackIndex)}>D</button>
        </div>

    </div>);
}



function Form({cardData, handleInputChange, handleSetValue, handleAttackChange, handleImageUpload, addAttack, removeAttack}) {

    return (
        <div className="form-body">

            <Collapsible header="Card Basics" contents={
                <fieldset className='form-basics'>
                    <label>Pokémon Type
                        <select value={cardData.element} name="element" onChange={handleInputChange}>
                            {cardElementTypes.map((elem) => (
                                <option key={elem} value={elem}>{elem}</option>
                            ))}
                        </select>
                    </label>
                    <label>Evolution Stage
                        <select value={cardData.stage} name="stage" onChange={handleInputChange}>
                            {cardStageTypes.map((stage) => (
                                <option key={stage} value={stage}>{stage}</option>
                            ))}
                        </select>
                    </label>
                </fieldset>
            }/>

            <Collapsible header="Header" contents={
                <fieldset className='form-card-header'>
                    <label>Name: 
                        <input type="text" name="name"
                        value={cardData.name}
                        onChange={handleInputChange}
                        />
                    </label>
                    <label>Subname 
                        <input type="text" name="subname"
                        value={cardData.subname}
                        onChange={handleInputChange}
                        />
                        <button type="button"
                        onClick={() => {handleSetValue("isSubnamePrefix",!cardData.isSubnamePrefix)}}
                        >toggle prefix/subfix</button>
                    </label>
                    <label>HP: 
                        <input type="number" name="hp"
                        value={cardData.hp}
                        onChange={handleInputChange}
                        />
                    </label>
                    {cardData.stage != "basic" 
                    ?   <label>Evolves from: 
                            <input type="text" name="evolveFrom"
                            value={cardData.evolveFrom}
                            onChange={handleInputChange}
                            />
                        </label>
                    :   null}
                </fieldset>
            }/>

            <Collapsible header="Card Art" contents={
                <fieldset className="form-art">
                    <label>Main Art
                        <input type="file" accept="image/*" onChange={handleImageUpload}/>
                    </label>
                    
                    <label>Main Art Offset: 
                        <div>X
                            <input 
                            type="range" min="-500" max="500"  
                            value={cardData.artOffsetX} name="artOffsetX"
                            onChange={handleInputChange}
                            />
                        </div>
                        <div>Y
                            <input 
                            type="range" min="-500" max="500" 
                            value={cardData.artOffsetY} name="artOffsetY"
                            onChange={handleInputChange} 
                            />
                        </div>
                        <button onClick={(e) => {cardData.artOffsetX = 0; cardData.artOffsetY = 0; handleInputChange(e)}}>Reset</button>
                    </label>

                    <label>Evolution
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, {isEvoArt:true})}/>
                    </label>
                </fieldset>

            }/>

            <Collapsible header="Attacks" contents={
                <fieldset>
                    {cardData.attacks.map((attack, index) => (
                        <AttackForm key={index} attack={attack} attackIndex={index} removeAttack={removeAttack} handleAttackChange={handleAttackChange} />
                    ))}
                    <button onClick={addAttack}>Add Attack</button>
                </fieldset>
            }/>

            <Collapsible header="Weakness" contents={
                <fieldset>
                    <label>Weakness
                        <select value={cardData.weakness} name="weakness" onChange={handleInputChange}>
                            {[...cardElementTypes, 'empty'].map((elem) => (
                                <option key={elem} value={elem}>{elem}</option>
                            ))}
                        </select>
                    </label>

                    <label>Resistance
                        <select value={cardData.resistance} name="resistance" onChange={handleInputChange}>
                            {[...cardElementTypes, 'empty'].map((elem) => (
                                <option key={elem} value={elem}>{elem}</option>
                            ))}
                        </select>
                    </label>

                    <label>Retreat Cost: 
                        <input type="number" name="retreatCost" min="0" max="5"
                        value={cardData.retreatCost}
                        onChange={handleInputChange}
                        />
                    </label>
                </fieldset>
            }/>

            <Collapsible header="Footer" contents={
                <fieldset>
                    <label>Lore
                        <textarea name="dexDescription" type="text"
                            placeholder="The pokedéx entry goes here."
                            value={cardData.dexDescription}
                            onChange={handleInputChange}
                        />
                    </label>

                    <label>Artist
                        <input name="artist" type="text"
                            placeholder="???"
                            value={cardData.artist}
                            onChange={handleInputChange}
                        />
                    </label>

                    <label>Regulation
                        <input name="reg" type="text"
                            placeholder="A"
                            value={cardData.reg}
                            onChange={handleInputChange}
                        />
                    </label>

                    <label>Set Name
                        <input name="set" type="text"
                            placeholder="SV1"
                            value={cardData.set}
                            onChange={handleInputChange}
                        />
                    </label>

                    <label>Set Number
                        <input name="collectorNumber" type="number"
                            placeholder="1"
                            value={cardData.collectorNumber}
                            onChange={handleInputChange}
                        />
                        <input name="collectorNumberMax" type="number"
                            placeholder="995"
                            value={cardData.collectorNumberMax}
                            onChange={handleInputChange}
                        />
                    </label>


                </fieldset>
            }/>
            
            
        </div>
    );
}

export default Form;