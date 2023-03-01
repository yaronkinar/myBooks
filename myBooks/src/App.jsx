import { useState } from 'react'
import './App.css'
import {Route, Routes} from "react-router-dom";
import Login from "./Login.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
        <Login/>
    </div>
  )
}

export default App
