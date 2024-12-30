import { useState } from 'react'
import html2canvas from 'html2canvas';
import './App.css'
import Card from './components/Card';
import Form from './components/Form';

function App() {

  const defaultViewScale = 0.5;
  const [cardScale, setCardScale] = useState(defaultViewScale);

  const [cardData, setCardData] = useState({
    name:"Pikachu",
    type:"lightning",
    hp:60,
    // art:null,
    artOffsetX:0,artOffsetY:0,
    abilities: [],
    attacks: [
      { name: "Quick Attack", cost: "N", damage:"10", description:"Your opponent reveals their hand." },
      { name: "Thunder Shock", cost: "LL", damage:"20+",
        description:"Flip a coin. If heads, this attack deals 20 more damage and the Defending Pokémon is now Paralyzed." },
    ],
  });


  const handleInputChange = function(e) {
    const { name, value } = e.target;
    setCardData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = function(e) {
    const file = e.target.files[0];
    if (!file) return;
    let reader = new FileReader();
    reader.onload = function() {setCardData({...cardData, art:reader.result})}
    reader.readAsDataURL(file);
  };

  const handleAttackChange = (index, field, value) => {
    const updatedAttacks = [...cardData.attacks]; //clones the attacks array
    updatedAttacks[index] = {...updatedAttacks[index], [field]:value}; // {[field]:value} changes a field
    setCardData({...cardData, attacks:updatedAttacks})
  };

  const addAttack = () => {
      setCardData({...cardData, attacks:[...cardData.attacks, {}]});
  };

  const removeAttack = (index) => {
    const updatedAttacks = [...cardData.attacks];
    updatedAttacks.splice(index, 1);
    setCardData({...cardData, attacks:updatedAttacks})
  };

  const exportAsImage = async function() {
    setCardScale(1.0);
    await new Promise((resolve) => setTimeout(resolve, 100)); // Small delay for the scale to take effect

    const fakeLink = document.createElement("a");
    fakeLink.style = "display:none;";
    fakeLink.download = `custom_card_${cardData.name}.png`;

    const cardDiv = document.getElementsByClassName("card")[0];

    const canvas = await html2canvas(cardDiv, {
      backgroundColor: null, scale: 1,
    });
    fakeLink.href = canvas.toDataURL('image/png')
    fakeLink.click();
    // document.removeChild(fakeLink);
    setCardScale(defaultViewScale);
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <h1>Hello World!</h1>
        <p>pokemon card maker</p>
        <Form 
        cardData={cardData} handleImageUpload={handleImageUpload}
        handleInputChange={handleInputChange} handleAttackChange={handleAttackChange}
        addAttack={addAttack} removeAttack={removeAttack}
        />
      </div>
      
      <div className="card-container">
        <Card {...cardData} meta_scale={cardScale} style={{top:'-30%'}}/>
        <button className="btn-export" onClick={exportAsImage}>Export</button>
      </div>
      
    </div>



  );
}

export default App;