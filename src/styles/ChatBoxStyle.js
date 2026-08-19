import styled from "styled-components";

export const circle = styled.div`
  // 원형 유저 이미지
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eef0ff;
  width: 12%;
  aspect-ratio: 1 / 1; /* 가로:세로 = 1:1 비율 고정 */
  margin-right: 14px;

  flex: none;
`;

export const Text = styled.p`
  // 채팅글
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0;
  flex: 1;
  min-width: 0;
`;

export const Time = styled.p`
  // 몇분전인지
  color: #a4a4a4;
  font-size: 0.9rem;
  line-height: 1;
  margin: 0 0 0 auto;
  padding: 0;
  min-width: 50px;
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  white-space: nowrap;
  text-align: right;
  letter-spacing: -0.02em;
`;

export const ChatLayout = styled.div`
  // 전체 채팅 레이아웃
  display: flex;
  width: 100%;
  height: fit-content;
  align-items: center;
  margin-bottom: 14px;
`;
