import React from "react";
import './Form.css'
import Collapsible from "./Collapsible";
import { cardElementTypes, cardStageTypes, elementTypeToAbbrev } from "../dicts";
import EnergyCost from "./EnergyCost";
import InfoIcon from "./InfoIcon";

function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
}

function AttackForm({attack, attackIndex, handleAttackChange, removeAttack}) {

    return (<div className='form-attack'>
        <div className='form-group'>
            <label>Name</label>
            <input type="text" name="name"
            value={attack.name}
            onChange={(e) =>handleAttackChange(attackIndex, 'name', e.target.value)}
            />
        </div>
            
        <div style={{display:"flex", justifyContent:"space-between"}}>
            <label>
                <div style={{display:"flex"}}>
                    Cost:
                    <InfoIcon helpText="The energy icons are R G W L F P C D M N Y, as well as E for empty."/>
                </div>
                <input type="text" name="cost" className='attack-input-cost'
                value={attack.cost}
                onChange={(e) =>handleAttackChange(attackIndex, 'cost', e.target.value)}
                />
            </label>
            <div style={{width:"30%"}}/>
            <label><p>Damage:</p> 
                <input type="text" name="damage" className='attack-input-damage'
                value={attack.damage}
                onChange={(e) =>handleAttackChange(attackIndex, 'damage', e.target.value)}
                />
            </label>
        </div>

        <div className='form-group'>
            {/* <label>Description</label> */}
            <textarea type="text" name="description" className='attack-area-desc'
            value={attack.description} placeholder="Add a description"
            onChange={(e) =>handleAttackChange(attackIndex, 'description', e.target.value)}
            />
        </div>

        <button onClick={(e) => removeAttack(attackIndex)}>Delete</button>
    </div>);
}



function Form({cardData, handleInputChange, handleSetValue, handleAttackChange, handleImageUpload, addAttack, removeAttack}) {

    return (
        <div className="form-body">

            <Collapsible header="📝 Card Basics" contents={
                <div className='form-card-basics'>
                    <div className='form-group'>
                        {/* <label>Pokémon Type: <span style={{fontFamily:"Essentiarum", display:"inline"}}>{elementTypeToAbbrev[cardData.element]}</span></label> */}
                        <label>Pokémon Type</label>
                        <select value={cardData.element} name="element" onChange={handleInputChange}>
                                {cardElementTypes.map((elem) => (
                                    <option key={elem} value={elem}>
                                        {capitalize(elem)}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className='form-group'>
                        <label>Evolution Stage</label>
                        <select value={cardData.stage} name="stage" onChange={handleInputChange}>
                                {cardStageTypes.map((stage) => (
                                    <option key={stage} value={stage}>{stage}</option>
                                ))}
                        </select>
                    </div>
                </div>
            }/>

            <Collapsible header="💯 Header" contents={
                <div className='form-card-header'>
                    <div className='form-group'>
                        <label>Name</label>
                        <input type="text" name="name"
                            value={cardData.name}
                            onChange={handleInputChange}
                            />
                    </div>
                    <div className='form-group'>
                        <label>Subname 
                            <InfoIcon helpText='Use this to make composite names like "Hisuian Arcanine" or "Hop&quot;s Snorlax".'/>
                        </label>
                        <input type="text" name="subname"
                            value={cardData.subname}
                            onChange={handleInputChange}
                        />
                        <button type="button"
                        onClick={() => {handleSetValue("isSubnamePrefix",!cardData.isSubnamePrefix)}}
                        >toggle prefix/subfix</button>
                    </div>
                    <div className='form-group'>
                        <label>HP</label>
                        <input type="number" name="hp"
                            value={cardData.hp}
                            onChange={handleInputChange}
                        />
                    </div>
                    {cardData.stage != "basic" 
                    ? <div className='form-group'>
                        <label>Evolves from</label>
                        <input type="text" name="evolveFrom"
                            value={cardData.evolveFrom}
                            onChange={handleInputChange}
                        /></div>
                    : null}
                </div>
            }/>

            <Collapsible header="🖼️ Card Art" contents={
                <div className='form-card-art'>
                    <div className='form-group'>
                        <label>Main Art</label>
                        <input type="file" accept="image/*" onChange={handleImageUpload}/>
                    </div>
                    <div className='form-group'>
                        <label>Main Art Offset (X, Y)</label>
                        <div style={{display:"flex", justifyContent:"space-between"}}>
                            <input 
                            type="range" min="-500" max="500"  
                            value={cardData.artOffsetX} name="artOffsetX"
                            onChange={handleInputChange}
                            />
                            <input 
                            type="range" min="-500" max="500" 
                            value={cardData.artOffsetY} name="artOffsetY"
                            onChange={handleInputChange} 
                            />
                        </div>
                        <button onClick={(e) => {cardData.artOffsetX = 0; cardData.artOffsetY = 0; handleInputChange(e)}}>Reset</button>
                    </div>
                    {cardData.stage != "basic" 
                    ? <div className='form-group'>
                        <label>Evolution</label>
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, {isEvoArt:true})}/>
                    </div>
                    : null}
                    
                </div>
            }/>

            <Collapsible header="⚡ Attacks" contents={
                <div className='form-card-attacks'>
                    {cardData.attacks.map((attack, index) => (
                        <AttackForm key={index} attack={attack} attackIndex={index} removeAttack={removeAttack} handleAttackChange={handleAttackChange} />
                    ))}
                    <button onClick={addAttack}>Add Attack</button>
                </div>
            }/>

            <Collapsible header="🛡️ Weakness" contents={
                <div className='form-card-weakness'>
                    <div className='form-group'>
                        <label>Weakness</label>
                        <select value={cardData.weakness} name="weakness" onChange={handleInputChange}>
                            {[...cardElementTypes, 'empty'].map((elem) => (
                                <option key={elem} value={elem}>{capitalize(elem)}</option>
                            ))}
                        </select>
                    </div>
                    <div className='form-group'>
                        <label>Resistance</label>
                        <select value={cardData.resistance} name="resistance" onChange={handleInputChange}>
                            {[...cardElementTypes, 'empty'].map((elem) => (
                                <option key={elem} value={elem}>{capitalize(elem)}</option>
                            ))}
                        </select>
                    </div>
                    <div className='form-group'>
                        <label>Retreat Cost</label>
                        <input type="number" name="retreatCost" min="0" max="5"
                            value={cardData.retreatCost}
                            onChange={handleInputChange}
                        />
                    </div>

                </div>

            }/>
            
            <Collapsible header="🏷️ Footer" contents={
                <div className='form-card-footer'>
                    <div className='form-group'>
                        <label>Lore</label>
                        <textarea name="dexDescription" type="text"
                            placeholder="The pokedéx entry goes here."
                            value={cardData.dexDescription}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Illustrator</label>
                        <input name="artist" type="text"
                            placeholder="???"
                            value={cardData.artist}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Regulation</label>
                        <input name="reg" type="text"
                            placeholder="A"
                            value={cardData.reg}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Set Icon</label>
                        <input name="set" type="text"
                            placeholder="SV1"
                            value={cardData.set}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Set Number</label>
                        <div style={{display:"flex", justifyContent:"space-between"}}>
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
                        </div>
                    </div>
                </div>
            }/>
            
        </div>
    );
}

export default Form;