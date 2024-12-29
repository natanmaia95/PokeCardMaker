import React from "react";
import './Form.css'


function Form({cardData, handleInputChange, handleAttackChange, handleImageUpload, addAttack, removeAttack}) {



    return (
        <div className="form-body">

            <h3>Header</h3>

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

            <h3>Card Art</h3>
            <input type="file" accept="image/*" onChange={handleImageUpload}/>
            <label>Offset: 
                <input type="number" name="artOffsetX"
                value={cardData.artOffsetX}
                onChange={handleInputChange}
                />
                <input type="number" name="artOffsetY"
                value={cardData.artOffsetY}
                onChange={handleInputChange}
                />
            </label>

            <h3>Attacks</h3>

            {cardData.attacks.map((attack, index) => (
                <div className='form-attack' key={index}>
                    <label>Name: 
                        <input type="text" name="name"
                        value={attack.name}
                        onChange={(e) =>handleAttackChange(index, 'name', e.target.value)}
                        />
                    </label>
                    <label>Cost: 
                        <input type="text" name="cost"
                        value={attack.cost}
                        onChange={(e) =>handleAttackChange(index, 'cost', e.target.value)}
                        />
                    </label>
                    <label>Damage: 
                        <input type="text" name="damage"
                        value={attack.damage}
                        onChange={(e) =>handleAttackChange(index, 'damage', e.target.value)}
                        />
                    </label>
                    <label>Description: 
                        <textarea type="text" name="description"
                        value={attack.description}
                        onChange={(e) =>handleAttackChange(index, 'description', e.target.value)}
                        />
                    </label>
                    <button onClick={(e) => removeAttack(index)}>Delete Attack</button>
                </div>
            ))}

            <button onClick={addAttack}>Add Attack</button>
            
        </div>
    );
}

export default Form;