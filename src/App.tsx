import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Header from './components/common/Header';
import CatalogPage from './pages/CatalogPage';
import CartDrawer from './components/cart/cartDrawer';

function App() {
  const [search, setSearch] = useState('');
  
  return (
    <BrowserRouter>
      <CssBaseline />
      <Header onSearch={setSearch} />
      <CartDrawer />
      <Routes>
        <Route path="/" element={<CatalogPage search={search} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
