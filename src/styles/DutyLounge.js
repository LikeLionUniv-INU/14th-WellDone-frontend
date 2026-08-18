import styled from "styled-components";


export const MainLayout = styled.div`// 전체 배경색 넣는 용도
width: 100%;
height: 100%;
background-color:  #F5F6FF;
display: flex;

justify-content: center;
`;

export const SrcLayout = styled.div`// 가운데 정렬하는 용도
 width: 87%;
 height: 100%;
 display: flex;
 flex-direction: column;
`;

export const TitleLayout = styled.div` //라운지 이름 + 라운지 설명 
display: flex;
flex-direction: column;
gap: 5px;
width: 100%;
margin-bottom: auto;

`;

export const Title = styled.h1`// 타이틀
font-size: 1.4rem;
font-weight: 900;
`;

export const SubTitle = styled.p`// 부제목
color: #6E6E73;
font-size: 0.85rem;
font-weight: 500;
`;

export const PointBox = styled.div` // 상단 포인트 박스

width : fit-content;
height: fit-content;
background-color: #ffffff;
font-weight: bold;
font-size: 1.1rem;
padding: 8px 14px;
color: #6F6AF8;
border-radius: 10px;
display: flex;
align-items: center;
justify-content: center;
flex-shrink: 0;
margin-top:  9px;
margin-bottom: auto;

`;

export const FirstLayout = styled.div`// TitleLayout +  PointBox 
margin-top: 15%;
margin-bottom: 6%;
display: flex;
height: 10%;
justify-content: center;
align-items: center;
width: 100%;
flex: none;

`;

export const TeamBox = styled.div` // 팀 박스
display: flex;
justify-content: center;
align-items : center;
width: fit-content; 
height: 8%;
`;

export const TeamName = styled.div` // 팀 이름
font-size: 1rem;
`;

export const Type = styled.div`// 팀 타입
color:  #7F78FF;
background-color:  #D3D8FF;
font-size: 0.5rem;
border-radius : 10px;
`;

export const MoreBtn = styled.button`// 상세보기
border: none;
background-color: #ffffff ;
display: flex;
align-items: center;
justify-content: center;
color: #6E6E73;
gap: 3px;
`;

export const TeamLayout = styled.div`// 상세보기 + 팀박스
display: flex;
justify-content: space-between;
margin-top: 7%;
`;

export const ChallengBox = styled.div`// 퍼센테이지 있는 박스
width: 100%;
height: 20%;
background-color : #ffffff;
border-radius: 8px;
margin-bottom: 8%;
flex: none;
display: flex;
justify-content: center;
`;

export const ChSrcLayout = styled.div`//  가운데로 만들거야
width: 90%;
flex: none;

`;

export const TalkBox =  styled.div` // 채팅방 박스

width: 100%;
height: 30%;
background-color : #ffffff;
border-radius: 8px;
flex: none;
`;

export const TalkTitle = styled.div`

`;
