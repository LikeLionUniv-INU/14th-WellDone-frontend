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
  color: #2B3143;
  margin: 0;
`;

export const RateText = styled.span`
  font-size: 1rem; /* 📌 [참고 8] 가장 큰 글자 1rem */
  font-weight: 600;
  color: #2B3143;
`;

export const ProgressBarTrack = styled.div`
  width: 100%;
  height: 0.6rem;
  background-color: #EEF0FF;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 12px;
`;

export const ProgressBarFill = styled.div`
  width: ${(props) => props.$rate || 0}%;
  height: 100%;
  background: linear-gradient(90deg, #7B61FF 0%, #767BF6 42%, #C2D0FF 100%);
  border-radius: 10px;
  transition: width 0.4s ease;
`;

export const SubText = styled.p`
  font-size: 0.8rem;
  color: #6E6E73;
  margin: 0;
`;