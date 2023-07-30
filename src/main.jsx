import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { EditorProvider } from './contexts/EditorContext.jsx'
import { store } from './store/store.js'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <EditorProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    </EditorProvider>
  </Provider>

)
