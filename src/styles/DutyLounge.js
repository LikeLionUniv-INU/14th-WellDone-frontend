import styled from "styled-components";

export const MainLayout = styled.div`
  // 전체 배경색 넣는 용도
  width: 100%;
  height: 100%;
  background-color: #babed9;
  display: flex;
  justify-content: center;

  padding-bottom: 50px;
`;

export const SrcLayout = styled.div`
  // 가운데 정렬하는 용도
  width: 88%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const TitleLayout = styled.div`
  //라운지 이름 + 라운지 설명
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  margin-bottom: auto;
  margin-left: 6px;
`;

export const Title = styled.h1`
  // 타이틀
  font-size: 1.4rem;
  font-weight: 900;
  color: white;
`;

export const SubTitle = styled.p`
  // 부제목
  color: white;
  font-size: 0.85rem;
  font-weight: 500;
`;

export const PointBox = styled.div`
  // 상단 포인트 박스

  width: fit-content;
  height: fit-content;
  background-color: #ffffff;
  font-weight: bold;
  font-size: 1.05rem;
  padding: 7px 14px 7px 12px;
  color: #6f6af8;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 9px;
  margin-bottom: auto;
`;

export const FirstLayout = styled.div`
  // TitleLayout +  PointBox
  margin-top: 15%;
  margin-bottom: 30px;
  display: flex;
  height: 10%;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: none;
`;

export const MoreBtn = styled.button`
  // 상세보기
  border: none;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6e6e73;
  gap: 3px;
`;

export const TeamLayout = styled.div`
  // 상세보기 + 팀박스
  display: flex;
  justify-content: space-between;
  margin-top: 18px;
  margin-bottom: 18px;
`;

export const ChallengBox = styled.div`
  // 퍼센테이지 있는 박스
  width: 100%;
  height: fit-content;
  background-color: #ffffff;
  border-radius: 8px;
  margin-bottom: 8%;
  flex: none;
  display: flex;
  justify-content: center;
`;

export const ChSrcLayout = styled.div`
  //  가운데로 만들기
  width: 88%;
  height: 100%;
  flex: none;
  height: fit-content;
`;

export const TalkBox = styled.div`
  // 채팅방 박스
  width: 100%;
  min-height:  20dvh;
  height: fit-content;
  background-color: #ffffff;
  border-radius: 10px;
  flex: none;
  display: flex;
  justify-content: center;
  margin-bottom: 35px;
  margin-top: 10px;
  gap: 17px;
`;

export const TalkTitle = styled.div`
  // 채팅방 제목
  margin-top: 9%;
  margin-bottom: 7%;

  font-size: 0.85rem;
  font-weight: bold;
`;

//  공통 테두리 상자
export const ChatInputContainer = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 34px;
  padding: 0 7px;
  margin-top: auto;
  margin-bottom: 19px;

  background-color: #ffffff;
  border: 1.8px solid #e5e7eb; /* 연한 회색 테두리 */
  border-radius: 10px; /* 둥근 모서리 */
  box-sizing: border-box;

  cursor: pointer;

  /* 마우스 호버 시 효과 */
  &:hover {
    border-color: #6f6af8;
  }
`;

// 2번 방식을 위한 Input 스타일
export const ChatInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 0.95rem;
  color: #333333;
  &::placeholder {
    color: #d9d9d9;
  }
`;

export const MoveLoutin = styled.button`
  width: 100%;
  height: fit-content;
  padding: 14px 20px;
  color: white;
  font-size: 19px;
  border-radius: 10px;
  border: 0;
  font-weight: bold;
  background: linear-gradient(90deg, #7b61ff 0%, #4f45ff 100%);
  margin-bottom: 30px;
`;

// 오른쪽 화살표 전송 버튼
export const SendButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  color: #6f6af8;
`;

export const ShopName = styled.div`
  // 샵 이름
  font-size: 1.15rem;
  font-weight: bold;
`;

export const ShopBox = styled.div`
  // 채팅방 박스
  width: 100%;
  height: fit-content;
  background-color: #ffffff;
  border-radius: 8px;
  flex: none;
  display: flex;
  justify-content: center;
  margin-bottom: 46px;
`;
