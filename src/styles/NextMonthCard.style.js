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
  gap: 16px;
  margin-bottom: 12px;
`;

export const IconWrapper = styled.div`
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  background-color: #eef0ff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

export const InfoArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const SubTitle = styled.span`
  font-size: 0.75rem;
  color: #8e95a3;
  font-weight: 600;
`;

export const Title = styled.h4`
  font-size: 1rem; /* 📌 [참고 8] 가장 큰 글자 1rem */
  font-weight: 800;
  color: #1f2937;
  margin: 0;
`;

export const Description = styled.p`
  font-size: 0.78rem;
  color: #6b7280;
  margin: 4px 0 0 0;
  line-height: 1.35;
  white-space: pre-line;
`;
