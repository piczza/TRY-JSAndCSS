import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import MainPage from './components/MainPage/MainPage'
import LoginPage from './components/LoginPage/LoginPage'
import CartPage from './components/CartPage/CartPage'
import DetailPage from './components/DetailPage/DetailPage'


function AppRouter() {
  return (
    <BrowserRouter>
      <Header />
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/detail" element={<DetailPage />} />
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter