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

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const Title = styled.h4`
  font-size: 1rem; /* 📌 [참고 8] 가장 큰 글자 1rem */
  font-weight: 800;
  color: #1f2937;
  margin: 0;
`;

export const RateText = styled.span`
  font-size: 1rem; /* 📌 [참고 8] 가장 큰 글자 1rem */
  font-weight: 800;
  color: #1f2937;
`;

export const ProgressBarTrack = styled.div`
  width: 100%;
  height: 0.6rem;
  background-color: #eef0ff;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 12px;
`;

export const ProgressBarFill = styled.div`
  width: ${(props) => props.$rate || 0}%;
  height: 100%;
  background: linear-gradient(90deg, #8c82ff 0%, #6f6af8 100%);
  border-radius: 10px;
  transition: width 0.4s ease;
`;

export const SubText = styled.p`
  font-size: 0.78rem;
  color: #6b7280;
  margin: 0;
`;
