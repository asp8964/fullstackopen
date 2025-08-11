import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { store } from './store.js'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router'
import '@radix-ui/themes/styles.css'
import { Theme } from '@radix-ui/themes'
// console.log(store)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Theme>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </Theme>
  </StrictMode>
)
