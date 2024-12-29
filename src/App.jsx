import { useState } from 'react'
import './App.css'
import Card from './components/Card';
import Form from './components/Form';

function App() {

  const [cardData, setCardData] = useState({
    name:"Pikachu",
    type:"lightning",
    hp:60,
    abilities: [],
    attacks: [
      { name: "Quick Attack", cost: "N", damage:"10", description:"Your opponent reveals their hand." },
      { name: "Thunder Shock", cost: "LL", damage:"20+",
        description:"Flip a coin. If heads, this attack deals 20 more damage and the Defending Pokémon is now Paralyzed." },
    ]
  });


  const handleInputChange = function(e) {
    const { name, value } = e.target;
    setCardData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAttackChange = (index, field, value) => {
    const updatedAttacks = [...cardData.attacks]; //clones the attacks array
    updatedAttacks[index] = {...updatedAttacks[index], [field]:value}; // {[field]:value} changes a field
    setCardData({...cardData, attacks:updatedAttacks})
  }
  const addAttack = () => {
      setCardData({...cardData, attacks:[...cardData.attacks, {}]});
  };

  const removeAttack = (index) => {
    const updatedAttacks = [...cardData.attacks];
    updatedAttacks.splice(index, 1);
    setCardData({...cardData, attacks:updatedAttacks})
  }

  return (
    <div className="app-container">
      <div className="form-container">
        <h1>Hello World!</h1>
        <p>pokemon card maker</p>
        <Form 
        cardData={cardData} handleInputChange={handleInputChange} handleAttackChange={handleAttackChange}
        addAttack={addAttack} removeAttack={removeAttack}
        />
      </div>
      
      <div className="card-container">
        <Card {...cardData}/>
      </div>
    </div>



  );
}

export default App;