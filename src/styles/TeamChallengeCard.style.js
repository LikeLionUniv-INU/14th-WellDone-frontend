import styled from "styled-components";

export const ChallengBox = styled.div`
  width: 100%;
  height: fit-content;
  background-color: #ffffff;
  border-radius: 8px;
  border: 1px solid #f0f1f5;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  padding: 16px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

export const ChSrcLayout = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
`;

export const TeamLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  margin-top: 12px;
`;

export const TeamBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const TeamName = styled.div`
  font-size: 0.85rem;
  font-weight: 600;
  color: #1f2937;
`;

export const Type = styled.div`
  color: #7f78ff;
  background-color: #d3d8ff;
  font-size: 0.6rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
`;

export const MoreBtn = styled.button`
  border: none;
  background: none;
  display: flex;
  align-items: center;
  color: #8e95a3;
  font-size: 0.85rem;
  gap: 2px;
  cursor: pointer;
`;

// 대형 퍼센트 숫자
export const PercentText = styled.div`
  font-size: 1.8rem;
  font-weight: 900;
  color: #252836;
  margin-bottom: 10px;
`;

// 프로그레스 바 배경 트랙
export const ProgressBarTrack = styled.div`
  width: 100%;
  height: 8.6px;
  background-color: #eef0f8;
  border-radius: 20px;
  overflow: hidden;
`;

// 프로그레스 바 채우기 (동적 $percent 적용)
export const ProgressBarFill = styled.div`
  width: ${(props) => props.$percent || 0}%;
  height: 100%;
  background: linear-gradient(90deg, #7b61ff 0%, #767bf6 42%, #c2d0ff 100%);
  border-radius: 20px;
  transition: width 0.5s ease-in-out;
`;

// 목표 안내 문구
export const TargetText = styled.div`
  font-size: 0.85rem;
  color: #4b5563;
  margin-top: 10px;
  margin-bottom: 16px;

  span {
    color: #5c58d5;
    font-weight: 700;
  }
`;

// 구분선
export const Divider = styled.div`
  background-color: #d2d0d0;
  height: 1px;
  width: 100%;
  margin-bottom: 14px;
  flex: done;
`;

// 하단 영역
export const BottomInfoLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 5px;
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #2d3748;
`;

export const VerticalDivider = styled.div`
  width: 1px;
  height: 30px;
  background-color: #d2d0d0;
`;
