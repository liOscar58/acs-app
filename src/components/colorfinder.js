import React, { useState, useEffect } from "react";
import "../App.css";


function ColorFinder() {
    //added
    const msg = new SpeechSynthesisUtterance()
    const [color, setColor] = useState("");
    const [colorName, setColorName] = useState("");
    const [inputColour, setInputColour] = useState("");

    const colorHandler = (e) => {
        setColor(e.target.value);
    };

    const speechHandler = (inputColour) => {
        msg.text = inputColour
        window.speechSynthesis.speak(msg)
    };

    const backgroundHandler = (color) => {
        document.body.style.backgroundColor = color;
    };
    
    const colorNameHandler = () => {
        fetch(`https://www.thecolorapi.com/id?rgb=${color}`)
        .then((res) => res.json())
        .then((data) => {
            setInputColour(data.name.value);
            setColorName(data.name.value);
            speechHandler(data.name.value);
            backgroundHandler(data.rgb.value);
        })
    };

    return (
        <div className="App">
        <input
            type="text"
            value={color}
            placeholder="Enter RGB Value"
            onChange={colorHandler}
        />
        <button onClick={colorNameHandler} id="btn">FIND COLOR</button>   
        <h2>{colorName}</h2>
        </div>
    );
    }

export default ColorFinder;