import "./App.css"
import { useState } from "react"
import ColorFinder from "./components/colorfinder"

function App() {
  const [ourText, setOurText] = useState("")
  const msg = new SpeechSynthesisUtterance()

  const speechHandler = (msg) => {
    msg.text = ourText
    window.speechSynthesis.speak(msg)
  }

  return (
    <div className='App'>
      <h1>ACS App</h1>
      <ColorFinder />
    </div>
  )
}

export default App


