
// using thecolorapi.com to get the color of the input rgb value */


import React, { useState } from "react";
import "../App.css";


function ColorFinder() {
    //added
    const msg = new SpeechSynthesisUtterance()
    const [color, setColor] = useState("");
    const [colorName, setColorName] = useState("");
    const [inputColour, setinputColour] = useState("");

    const colorHandler = (e) => {
        setColor(e.target.value);
    };

    const speechHandler = (msg) => {
        msg.text = inputColour
        window.speechSynthesis.speak(msg)
      }
    
    const colorNameHandler = () => {
        fetch(`https://www.thecolorapi.com/id?rgb=${color}`)
        .then((res) => res.json())
        .then((data) => {
            setColorName(data.name.value);
            setinputColour(data.name.value);
        });
        speechHandler(msg)

    };
    
    return (
        <div className="App">
        <h1>Color Finder</h1>
        <input
            type="text"
            value={color}
            placeholder="Enter RGB Value"
            onChange={colorHandler}
        />
        <button onClick={colorNameHandler}>FIND COLOR</button>   
        <h2>{colorName}</h2>
        </div>
    );
    }

export default ColorFinder;