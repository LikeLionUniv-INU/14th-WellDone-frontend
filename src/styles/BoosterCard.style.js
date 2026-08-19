import styled from "styled-components";

export const CardContainer = styled.div`
  width: 100%;
  padding: 20px 18px;
  background-color: #ffffff;
  border-radius: 16px;
  border: 1px solid #eef0f4;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 12px;
`;

/* 💡 SVG 기반의 둥근 끝처리 도넛 차트 래퍼 */
export const CircleWrapper = styled.div`
  position: relative;
  width: 6rem;
  height: 6rem;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledSvg = styled.svg`
  width: 100%;
  height: 100%;
  transform: rotate(-90deg); /* 12시 방향부터 시작하도록 회전 */
`;

export const BackgroundTrack = styled.circle`
  fill: none;
  stroke: #e8e8ff; /* 배경 연한 원 색상 */
  stroke-width: 8;  /* 선 두께 */
`;

export const ProgressCircle = styled.circle`
  fill: none;
  stroke: #6f6af8; /* 보라색 진행 바 색상 */
  stroke-width: 8;
  stroke-linecap: round; /* ✨ 핵심: 선의 양 끝을 동글동글하게 처리 */
  stroke-dasharray: 251.2; /* 반지름 40 기준 원의 둘레 (2 * π * 40 ≈ 251.2) */
  stroke-dashoffset: ${(props) => {
    const rate = props.$rate || 0;
    return 251.2 - (251.2 * rate) / 100;
  }};
  transition: stroke-dashoffset 0.6s ease;
`;

export const InnerText = styled.div`
  position: absolute;
  font-size: 1rem;
  font-weight: 800;
  color: #2B3143;
`;

export const InfoArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Title = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #2B3143;
  margin: 0;
  line-height: 1.3;
`;

export const SubText = styled.p`
  font-size: 0.78rem;
  color: #6E6E73;
  margin: 0;
  line-height: 1.35;
  white-space: pre-line;
`;
