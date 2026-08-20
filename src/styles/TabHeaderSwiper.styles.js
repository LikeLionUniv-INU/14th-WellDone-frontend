import styled from "styled-components";
import { motion } from "framer-motion";

export const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh; /* 모바일/PC 상관없이 화면 전체 높이를 덮도록 설정 */
  background-color: #F5F6FF; /* 👉 원하시는 배경색으로 변경하세요 */
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  margin-bottom: 10dvh;
`;


export const Container = styled.div`
  width: 100%;
  max-width: 98dvw;
  margin: 0 auto;
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0 20px;
  
  `;

/* 상단 탭 트랙 (연한 자줏빛/회색 배경) */
export const TabTrack = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #D4D9FF;
  border-radius:  13px;
  
  width: calc(100%); 
  box-sizing: border-box;
  margin-top: 30px;
  height: 4.5dvh;
`;

/* 개별 탭 버튼 */
export const TabButton = styled.button`
  position: relative;
  flex: 1;
  background: transparent;
  border: none;
  padding: 0.75rem 0;
  border-radius: 0.95rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  height: 4.5dvh ;
`;

/* 💡 마법의 보라색 슬라이딩 배경 (framer-motion) */
export const ActiveHighlight = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, #7B61FF 0%, #4F45FF 100%); /* 사진 속 보라색 */
  border-radius: 13px;
  box-shadow: 0 0.25rem 0.75rem rgba(124, 92, 252, 0.3);
  z-index: 1;
`;
//상단 n월 웰니스 리포트, 주간 웰니스 루틴 수행 내역
export const ReportTitle = styled.h3`
  margin-bottom: 35px;
  font-size: 1.5rem;
  /* 만약 글자 크기나 색상 등도 같이 맞추고 싶다면 여기에 추가하세요 */
`;

/* 탭 글씨 (활성화 여부에 따라 색상 전환) */
export const TabText = styled.span`
  position: relative;
  z-index: 2; /* 보라색 배경보다 위에 글자가 오도록 설정 */
  font-size: 0.95rem;
  font-weight: 700;
  transition: color 0.25s ease;
  color: ${(props) => (props.$isActive ? "#ffffff" : "#6E6E73")};
`;

/* Swiper 슬라이더 커스텀 컨테이너 */
export const SlideContentArea = styled.div`
  width: 100%;
  min-height: 50dvh;
  background: #F5F6FF;
  border-radius: 1.5rem;
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
