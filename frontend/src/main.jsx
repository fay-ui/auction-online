import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import App from './App';
import { UserProvider } from './context/UserContext';
import { ItemProvider } from './context/ItemContext';
import { BidProvider } from './context/BidContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ItemProvider>
          <BidProvider>
            <App />
          </BidProvider>
        </ItemProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
