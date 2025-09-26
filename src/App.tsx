import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Header from './components/common/Header';
import CatalogPage from './pages/CatalogPage';
import CardDrawer from './components/card/CardDrawer';

function App() {
  const [search, setSearch] = useState('');
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  
  return (
    <BrowserRouter>
      <CssBaseline />
      <Header onSearch={setSearch} favoritesOnly={favoritesOnly} onToggleFavorites={() => setFavoritesOnly((v) => !v)} />
      <CardDrawer />
      <Routes>
        <Route path="/" element={<CatalogPage search={search} favoritesOnly={favoritesOnly} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
