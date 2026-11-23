import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider} from './context/CartContext.jsx'
import { AuthProvider} from './context/AuthContext.jsx'
import { SearchProvider } from './context/SearchContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     <AuthProvider>
        <CartProvider>
            <SearchProvider>
              <App />
          </SearchProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
