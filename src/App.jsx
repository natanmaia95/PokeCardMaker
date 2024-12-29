import { useState } from 'react'
import './App.css'
import Card from './components/Card';

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


  return (
    <div className="app-container">
      <div className="form-container">
        <h1>Hello World!</h1>
        <p>pokemon card maker</p>
      </div>
      
      <div className="card-container">
        <Card {...cardData}/>
      </div>
    </div>



  );
}

export default App;