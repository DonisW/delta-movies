import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Header from './components/common/Header';
import CatalogPage from './pages/CatalogPage';

function App() {
  const [search, setSearch] = useState('');
  const [cartSize, setCartSize] = useState(0); // luego vendrá del context

  return (
    <BrowserRouter>
      <CssBaseline />
      <Header onSearch={setSearch} cartSize={cartSize} />
      <Routes>
        <Route path="/" element={<CatalogPage search={search} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
