import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled.div`
  width: 100%;
  max-width: 90dvw;
  margin: 0 auto;
  margin-top: 13%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

/* 상단 탭 트랙 (연한 자줏빛/회색 배경) */
export const TabTrack = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f0f1fa;
  border-radius: 1.25rem;
  padding: 0.35rem;
  width: 100%;
  box-sizing: border-box;
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
`;

/* 💡 마법의 보라색 슬라이딩 배경 (framer-motion) */
export const ActiveHighlight = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #7c5cfc; /* 사진 속 보라색 */
  border-radius: 0.95rem;
  box-shadow: 0 0.25rem 0.75rem rgba(124, 92, 252, 0.3);
  z-index: 1;
`;

/* 탭 글씨 (활성화 여부에 따라 색상 전환) */
export const TabText = styled.span`
  position: relative;
  z-index: 2; /* 보라색 배경보다 위에 글자가 오도록 설정 */
  font-size: 0.95rem;
  font-weight: 700;
  transition: color 0.25s ease;
  color: ${(props) => (props.$isActive ? "#ffffff" : "#71717a")};
`;

/* Swiper 슬라이더 커스텀 컨테이너 */
export const SlideContentArea = styled.div`
  width: 100%;
  min-height: 50dvh;
  background: #ffffff;
  border-radius: 1.5rem;
  padding: 1rem;
  box-sizing: border-box;
`;