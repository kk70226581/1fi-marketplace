import { Navigate, Route, Routes } from 'react-router-dom';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/shop" />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/products/:slug" element={<ProductPage />} />
      <Route path="*" element={<Navigate replace to="/shop" />} />
    </Routes>
  );
}
