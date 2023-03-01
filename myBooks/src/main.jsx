import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Login from "./Login.jsx";
import {Home} from "./Home.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <App/>
  </React.StrictMode>,
)
