
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Router, Link } from 'react-router-dom';
import App from './App';
import {createRoot} from "react-dom/client"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

    <BrowserRouter>
      <App />
      </BrowserRouter>

);
