import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Onboarding from './pages/Onboard'
import Login from './pages/Login'
import Singup from './pages/SignUp'
import Home from './pages/Home'
import AIRoutine from './pages/AIRoutine'
import {GlobalStyle} from './GlobalStyle'
import {MobileLayout} from './components/MobileLayout'
function App() {

  return (
    <>
      <BrowserRouter>
      {/* 상단바나 네비게이션 바처럼 모든 페이지에 공통으로 떠있어야 하는 컴포넌트가 있다면 여기에 위치 시킵니다. */}
      <GlobalStyle /> {/*전역스타일 적용*/}
      <MobileLayout>{/* 모바일 레이아웃 적용*/}
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Singup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/routine" element={<AIRoutine />} />
  
      </Routes>
      </MobileLayout>
    </BrowserRouter>
    </>
  )
}

export default App
