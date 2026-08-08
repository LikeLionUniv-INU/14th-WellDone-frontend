import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  /* 기본 여백 제거 및 커스텀 */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* 바깥 바탕 배경 (데스크톱 등 큰 화면에서 보일 영역) */
  body {
    background-color: #f0f2f5; /* 약간 어두운 연회색 배경 */
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100dvh;
   
  }
/* 💡 핵심 1: html, body 모두 높이를 화면 전체(100dvh)로 고정합니다. */
  html, body{
    width: 100%;
    max-width:100vw;
    height: 100%;
    height: 100dvh;
    max-height: 100vh;
    overflow: hidden; /* 바깥 웹브라우저의 전체 스크롤을 방지합니다. */
  }
  /* 💡 화면 폭이 430px 이하(모바일 환경)일 때 적용되는 스타일 */
  @media (max-width: 430px) {
    body {
      display: block; /* flex 중앙 정렬 해제 (잘림 방지) */
      background-color: #ffffff; /* 모바일 화면에서는 바깥 배경을 흰색으로 통합 */
    }
  }
`;
