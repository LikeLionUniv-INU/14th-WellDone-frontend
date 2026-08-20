import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  /* 기본 여백 제거 및 커스텀 */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: "Inter", "Pretendard", "Noto Sans KR", sans-serif;
    font-optical-sizing: auto;
    
  }
  

  /* 바깥 바탕 배경 (데스크톱 등 큰 화면에서 보일 영역) */
  body {
    background-color: #f0f2f5; /* 약간 어두운 연회색 배경 */
    display: flex;

    justify-content: center;
    align-items: center;
    min-height: 100vh;
    
  }

  html, body {
    width: 100%;
    max-width: 100vw;
    min-height: 100%;
    height: auto;
    overflow-x: hidden;
  
  }

  /* 💡 화면 폭이 430px 이하(모바일 환경)일 때 적용되는 스타일 */
  @media (max-width: 430px) {
    body {
      display: block;
      background-color: #ffffff;
    }
  }
`;
