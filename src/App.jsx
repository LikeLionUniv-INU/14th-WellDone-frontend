import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
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
        <Route path="/" element={<Home />} />
  
      </Routes>
      </MobileLayout>
    </BrowserRouter>
    </>
  )
}

export default App
