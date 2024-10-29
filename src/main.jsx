import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router} from 'react-router-dom' 
import DataContextProvider from '../src/contexts/DataContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
   
      <DataContextProvider>
         <Router>
          <App />
        </Router>
    </DataContextProvider>

  // </React.StrictMode>,
)
