import styled from "styled-components";

// 개별 카드 박스
export const CardContainer = styled.div`
  width: 100%;
  /* 📌 [참고 조건 7] 높이 계산 시 rem 반응형 단위 사용 */
  min-height: 8.5rem;
  height: auto;

  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 12px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

// 상단 헤더 레이아웃 (목표 이름 + 주기)
export const HeaderLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// 📌 [참고 조건 6] 목표 이름 글자 폰트 1rem
export const RoutineTitle = styled.h4`
  font-size: 1rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
`;

// 루틴 주기 (매일)
export const CycleText = styled.span`
  font-size: 0.85rem;
  color: #8e95a3;
  font-weight: 500;
`;

// 📌 [참고 조건 2] height: 1px 가로 구분선
export const HorizontalLine = styled.div`
  height: 1px;
  width: 100%;
  background-color: #f0f1f5;
  margin: 10px 0 12px 0;
  flex: none;
`;

// 요일 및 아이콘 7개 정렬 레이아웃
export const DaysGrid = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

// 개별 요일 아이템 (글자 + 아이콘)
export const DayColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
`;

// 요일 텍스트 (M, T, W, T, F, S, S)
export const DayLabel = styled.span`
  font-size: 0.75rem;
  color: #4b5563;
  font-weight: 600;
`;

// 체크 SVG 아이콘
export const CheckIcon = styled.img`
  /* 📌 [참고 조건 7] 반응형 rem 단위 사용 */
  width: 2.1rem;
  height: 2.1rem;
  object-fit: contain;
  transition: transform 0.1s ease;

  &:active {
    transform: scale(0.92);
  }
`;
