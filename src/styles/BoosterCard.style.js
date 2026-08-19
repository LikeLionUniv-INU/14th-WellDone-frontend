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

// CSS conic-gradient를 활용한 반응형 도넛 차트
export const CircleProgress = styled.div`
  width: 5.5rem;
  height: 5.5rem;
  border-radius: 50%;
  background: conic-gradient(
    #6f6af8 0% ${(props) => props.$rate || 0}%,
    #e8e8ff ${(props) => props.$rate || 0}% 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

export const InnerCircle = styled.div`
  width: 4.1rem;
  height: 4.1rem;
  background-color: #ffffff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem; /* 📌 [참고 8] 가장 큰 글자 1rem */
  font-weight: 800;
  color: #1f2937;
`;

export const InfoArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Title = styled.h4`
  font-size: 1rem; /* 📌 [참고 8] 가장 큰 글자 1rem */
  font-weight: 800;
  color: #1f2937;
  margin: 0;
  line-height: 1.3;
`;

export const SubText = styled.p`
  font-size: 0.78rem;
  color: #8e95a3;
  margin: 0;
  line-height: 1.35;
  white-space: pre-line;
`;