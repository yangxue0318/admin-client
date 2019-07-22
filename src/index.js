import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {HashRouter,BrowserRouter} from 'react-router-dom'
import './api'

ReactDOM.render(
    <BrowserRouter>
         
<App />
</BrowserRouter>,
document.getElementById('root'));
