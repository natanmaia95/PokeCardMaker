import React from "react";
import './Form.css'
import Collapsible from "./Collapsible";


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



function Form({cardData, handleInputChange, handleAttackChange, handleImageUpload, addAttack, removeAttack}) {

    return (
        <div className="form-body">

            <Collapsible header="Card Basics"/>

            <Collapsible header="Header"
            contents={
                <div className='form-card-header'>
                    <label>Name: 
                        <input type="text" name="name"
                        value={cardData.name}
                        onChange={handleInputChange}
                        />
                    </label>
                    <br/>
                    <label>HP: 
                        <input type="number" name="hp"
                        value={cardData.hp}
                        onChange={handleInputChange}
                        />
                    </label>
                </div>
            }/>

            <Collapsible header="Card Art"
            contents={
                <div className="form-art">
                    <div>Main Art
                        <input type="file" accept="image/*" onChange={handleImageUpload}/>
                    </div>
                    
                    <div>Main Art Offset: 
                        <input type="number" name="artOffsetX"
                        value={cardData.artOffsetX}
                        onChange={handleInputChange}
                        />
                        <input type="number" name="artOffsetY"
                        value={cardData.artOffsetY}
                        onChange={handleInputChange}
                        />
                    </div>

                    <div>Evolution
                        <input type="file" accept="image/*" onChange={handleImageUpload}/>
                    </div>
                </div>

            }/>

            <Collapsible header="Attacks" 
            contents={
                <div>
                    {cardData.attacks.map((attack, index) => (
                        <AttackForm key={index} attack={attack} attackIndex={index} removeAttack={removeAttack} handleAttackChange={handleAttackChange} />
                    ))}
                    <button onClick={addAttack}>Add Attack</button>
                </div>
            }/>

            <Collapsible header="Footer"
            contents={
                <div></div>
            }/>
            
            
        </div>
    );
}

export default Form;