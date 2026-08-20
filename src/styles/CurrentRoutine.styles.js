import styled, { css } from "styled-components";

export const RoutineContainer = styled.div`
  width: 100%;
  padding: 20px;
  border-radius: 16px;
  box-sizing: border-box;

  /* 1-8, 1-12. 기본 배경색 및 테두리 */
  background-color: ${(props) => (props.$isCompleted ? "#F3F4F6" : "#EEE9FF")};
  border: 1px solid ${(props) => (props.$isCompleted ? "#D1D5DB" : "#BAB7FF")};
  transition: all 0.3s ease;
`;

export const RoutineContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  /* 2-3. 비디오 타입인 경우 클릭 가능 커서 표시 */
  cursor: ${(props) => (props.$isVideo ? "pointer" : "default")};
  margin-bottom: 20px;
`;

export const RoutineInfoArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

/* 1-13. recommendedDuration 색상 및 1-3, 1-15 폰트 크기 분기 */
export const RoutineTitle = styled.h3`
  margin: 0 0 6px 0;
  font-weight: 700;
  color: ${(props) => (props.$isCompleted ? "#888888" : "#111111")};

  /* 1-3, 1-15. 비디오가 아니면 공백감을 줄이기 위해 폰트 크기 확대 */
  font-size: ${(props) => (props.$isVideo ? "1rem" : "1.35rem")};
  line-height: 1.4;
`;

export const RoutineSubText = styled.span`
  /* 1-13. recommendedDuration 받아오는 글자 색상 #666666 */
  color: #666666;
  font-size: 0.875rem;
  font-weight: 500;
`;

/* 1-5, 1-11, 1-14. 원형 프로그래스 바 */
export const CircleProgressWrapper = styled.div`
  position: relative;
  width: 90px;
  height: 90px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CircleSvg = styled.svg`
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
`;

export const CircleBg = styled.circle`
  fill: none;
  stroke: #e2d9ff;
  stroke-width: 8;
`;

export const CircleProgress = styled.circle`
  fill: none;
  stroke-width: 8;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.3s ease;
`;

export const CircleCenterText = styled.div`
  position: absolute;
  font-size: 0.85rem;
  font-weight: 700;
  color: ${(props) => (props.$isCompleted ? "#888888" : "#333333")};
`;

/* 버튼 영역 및 버튼 스타일 */
export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

export const BaseButton = styled.button`
  border: none;
  border-radius: 12px;
  padding: 14px 0;
  font-size: 0.95rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:disabled {
    background: #cccccc !important;
    color: #888888 !important;
    border: none !important;
    cursor: not-allowed;
  }
`;

/* 1-9. 완료하기 버튼 (선형 그라데이션) 및 전체너비/반너비 */
export const PrimaryButton = styled(BaseButton)`
  flex: 1;
  background: linear-gradient(90deg, #7b61ff 0%, #4f45ff 100%);
  color: #ffffff;

  &:active {
    opacity: 0.9;
  }
`;

/* 1-10. 일시정지, 사진촬영 버튼 (테두리 및 글자 #7B61FF) */
export const SecondaryButton = styled(BaseButton)`
  flex: 1;
  background-color: #ffffff;
  border: 1.5px solid #7b61ff;
  color: #7b61ff;

  &:active {
    background-color: #f4f0ff;
  }
`;

/* 완료 후 사진촬영 단일 버튼 (#7B61FF) */
export const PhotoButton = styled(BaseButton)`
  width: 100%;
  background-color: #ffffff;
  border: 1.5px solid #7b61ff;
  color: #7b61ff;
`;