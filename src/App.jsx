import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

import Hero from "./components/Hero";
import GameSection from "./components/GameSection";
import PokedexSection from "./components/PokedexSection";
import StoreSection from "./components/StoreSection";
import NavBar from "./components/NavBar";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

import CartPage from "./pages/CartPage";
import SuccessPage from "./pages/SuccessPage";
import CancelPage from "./pages/CancelPage";


function App() {
  return(
    <ThemeProvider>
    <BrowserRouter>
    <AuthProvider>
      <CartProvider>
      <NavBar />
      <Routes>
        <Route
        path="/"
        element={
          <>
            <Hero id="hero"/>
            <GameSection id="game"/>
            <PokedexSection id="pokedex"/>
            <StoreSection id="store"/>
          </>
        }
        />

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
        />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/success" element={<SuccessPage />} /> 
        <Route path="/cancel" element={<CancelPage />} />
        
      </Routes>
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
  </ThemeProvider>
  );

}

export default App
