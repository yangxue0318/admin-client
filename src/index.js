import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {HashRouter,BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './redux/store'
import './api'

ReactDOM.render((
   
        <HashRouter>
          <Provider store={store}>
         <App />
         </Provider>,
         </HashRouter>
    

),
    
document.getElementById('root'));
