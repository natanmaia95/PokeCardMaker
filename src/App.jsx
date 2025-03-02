import { useState } from 'react'
import html2canvas from 'html2canvas';
import './App.css'
import Card from './components/Card';
import Form from './components/Form';
import { getImageBlankURL } from './dicts';

function App() {

  const defaultViewScale = 0.5;
  const [cardScale, setCardScale] = useState(defaultViewScale);

  const [cardData, setCardData] = useState({
    name:"Pikachu",
    subname:"", isSubnamePrefix:true,
    element:"lightning",
    stage:"basic",
    blankUrl: getImageBlankURL("lightning", "basic"),
    hp:60,
    evolveFrom: "",
    // art:null,
    // evoArt:null
    artOffsetX:0,artOffsetY:0,
    abilities: [],
    attacks: [
      { type: "attack", name: "Quick Attack", cost: "C", damage:"10" },
      { type: "attack", name: "Thunder Shock", cost: "PP", damage:"20+",
        description:"Flip a coin. If heads, this attack deals 20 more damage and the Defending Pokémon is now Paralyzed." },
    ],
    retreatCost: 1,
    weakness: 'fighting',
    resistance: 'empty',

    reg: 'A', set: 'SV1',
    collectorNumber: 1, collectorNumberMax:995,
  });


  const handleInputChange = function(e) {
    const { name, value } = e.target;
    let prevData = {...cardData, [name]:value};
199
    if (name == "stage" || name == "element") {
      const newImageUrl = getImageBlankURL(prevData.element, prevData.stage);
      console.log(newImageUrl);
      prevData["blankUrl"] = newImageUrl;
    }
    
    setCardData(prevData);
  };

  const handleSetValue = function(name, value) {
    setCardData({...cardData, [name]:value});
  }

  const handleImageUpload = function(e, options={}) {
    const file = e.target.files[0];
    if (!file) return;
    let reader = new FileReader();
    let slot = "art";
    if (options.isEvoArt) slot = "evoArt";
    reader.onload = function() {setCardData({...cardData, [slot]:reader.result})}
    reader.readAsDataURL(file);
  };

  const handleAttackChange = (index, field, value) => {
    const updatedAttacks = [...cardData.attacks]; //clones the attacks array
    updatedAttacks[index] = {...updatedAttacks[index], [field]:value}; // {[field]:value} changes a field
    setCardData({...cardData, attacks:updatedAttacks})
  };

  const addAttack = (typeIn) => {
    let newAttack = {type:typeIn};
    console.log(newAttack);
    if (typeIn == 'attack') {
      setCardData({...cardData, attacks:[...cardData.attacks, newAttack]});
    } else { //abilities and other stuff go first
      setCardData({...cardData, attacks:[newAttack, ...cardData.attacks]});
    }
  };

  const removeAttack = (index) => {
    const updatedAttacks = [...cardData.attacks];
    updatedAttacks.splice(index, 1);
    setCardData({...cardData, attacks:updatedAttacks})
  };

  const exportAsImage = async function() {
    // setCardScale(1.0);
    // await new Promise((resolve) => setTimeout(resolve, 100)); // Small delay for the scale to take effect

    const fakeLink = document.createElement("a");
    fakeLink.style = "display:none;";
    fakeLink.download = `custom_card_${cardData.name}.png`;

    const cardDiv = document.getElementsByClassName("card")[0];

    const canvas = await html2canvas(cardDiv, {
      backgroundColor: null, 
      scale: 1, 
      useCORS: true,
      onclone: (clonedDoc) => {
        clonedDoc.getElementsByClassName("card")[0].style.transform = "rotateX(0) rotateY(0) scale(1)";
      }
    });
    fakeLink.href = canvas.toDataURL('image/png')
    fakeLink.click();
  };


  return (
    <div className="app-container">
      <div id="background"/>
      <div className="form-container">
        <h1>Poké Card Crafter</h1>
        <p>Make your own custom pokémon cards!</p>
        <Form 
        cardData={cardData} handleImageUpload={handleImageUpload} handleSetValue={handleSetValue}
        handleInputChange={handleInputChange} handleAttackChange={handleAttackChange}
        addAttack={addAttack} removeAttack={removeAttack}
        />

        <button className="btn-export" onClick={exportAsImage}>Export</button>
      </div>
      
      <div className="card-container">
        <Card {...cardData} meta_scale={cardScale} style={{top:'-30%'}}/>
        
      </div>
      
    </div>



  );
}

export default App;