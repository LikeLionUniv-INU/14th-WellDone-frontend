import styled from "styled-components";

export const CardContainer = styled.div`
  width: 100%;
  padding: 20px 18px;
  background-color: #ffffff;
  border-radius: 16px;
  border: 1px solid #eef0f4;
  box-sizing: border-box;
  margin-bottom: 12px;
`;

export const Title = styled.h4`
  font-size: 1rem; /* 📌 [참고 8] 가장 큰 글자 1rem */
  font-weight: 600;
  color: #2b3143;
  margin: 0 0 4px 0;
`;

export const SubTitle = styled.p`
  font-size: 0.78rem;
  color: #6e6e73;
  margin: 0 0 20px 0;
`;

// 📌 [참고 6] flex: 1과 space-around로 개수에 관계없이 자리를 균등 분배
export const BarChartContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  width: 100%;
  height: 7rem;
  margin-bottom: 20px;
  gap: 8px;
`;

export const BarColumn = styled.div`
  flex: 1;
  max-width: 2.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: flex-end;
  gap: 8px;
`;

export const BarTrack = styled.div`
  width: 1.5rem;
  height: 5.5rem;
  background-color: #f0f2f5;
  border-radius: 6px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
`;

export const BarFill = styled.div`
  width: 100%;
  height: ${(props) => props.$rate || 0}%;
  background-color: ${(props) => props.$color || "#91A2FF"};
  border-radius: 6px;
  transition: height 0.4s ease;
`;

//막대 그래프 아래 붙는 글자
export const BarLabel = styled.span`
  font-size: 0.75rem;
  color: #6e6e73;
  text-align: center;
  font-weight: 430;
`;
// 최하단의 설명글
export const BottomDesc = styled.p`
  font-size: 0.78rem;
  color: #6e6e73;
  line-height: 1.5;
  margin: 0;

  .purple {
    color: #6f6af8;
    font-weight: 600;
  }
`;
