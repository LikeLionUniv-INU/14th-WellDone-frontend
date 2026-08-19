import * as S from "../styles/DutyLounge";
import { ChevronRight } from "lucide-react"; //  루시드 리엑트 라이브러리 에서 아이콘 가져오기
import ChatBox from "../components/ChatBox";
import React, { useState, useEffect } from "react";
import RewardItem from "../components/RewardItem";
import TeamChallengeCard from "../components/TeamChallengeCard";
import { useNavigate } from "react-router-dom";

// import axios from "axios"; // Axios 설치 시 사용

// 백엔드 API 명세서 구조를 그대로 본뜬 더미 데이터
const MOCK_DATA = {
  isSuccess: true,
  code: "COMMON_200",
  message: "요청에 성공했습니다.",
  result: {
    groupTag: "NIGHT",
    talks: [
      {
        talkId: 501,
        nickname: "익명의 나이트워커",
        message: "진짜 너무 졸리네요 ㅋㅋ",
        createdAt: "방금 전",
      },
      {
        talkId: 500,
        nickname: "익명의 나이트워커",
        message: "비타민이랑 같이 버티고 있어요",
        createdAt: "1분 전",
      },
      {
        talkId: 499,
        nickname: "익명의 나이트워커",
        message: "나이트 근무자들 파이팅",
        createdAt: "2분 전",
      },
      {
        talkId: 498,
        nickname: "익명의 나이트워커",
        message: "4번째 글입니다 (화면에 안 보여야 정상)",
        createdAt: "5분 전",
      },
    ],
  },
};

const itemList = [
    {
      id: 1,
      name: "온열 수면 안대",
      description: "따뜻한 수면 안대",
      points: 1200,
      imageUrl: "https://example.com/eye-mask.jpg",
    },
    {
      id: 2,
      name: "아메리카노",
      description: "스타벅스 기프티콘",
      points: 100,
      imageUrl: "https://example.com/americano.jpg",
    },
     {
      id: 3,
      name: "비타민 음료",
      description: "비타민 음료",
      points: 100,
      imageUrl: "https://example.com/americano.jpg",
    },
  ];

function DutyLounge() {
  // 1. API에서 받아온 talks 배열 상태값 관리
  const [talks, setTalks] = useState(MOCK_DATA.result.talks);
  const [text, setText] = useState("");
const handleSubmit = (e) => {
    e.preventDefault(); // 페이지 뒤로가기/새로고침 방지
    if (!text.trim()) return; // 빈 값 전송 방지

    console.log("전송할 메시지:", text);
    
    // 전송 후 입력창 비워주기
    setText("");
  };
 const navigate = useNavigate();
  return (
    <>
      <S.MainLayout>
        <S.SrcLayout>
          <S.FirstLayout>
            <S.TitleLayout>
              <S.Title>듀티 라운지</S.Title>
              <S.SubTitle>
                전국의 동료들과 함께 <br /> 웰니스 게이지를 채워보세요!
              </S.SubTitle>
            </S.TitleLayout>

            <S.PointBox>💎 300P</S.PointBox>
          </S.FirstLayout>

          <TeamChallengeCard
        teamName="Team NIGHT"
        type="NIGHT"
        percentage={68}
        remainingPercent={12}
        participantCount="1,240"
        rewardInfo="80 % 달성시 + 100P"
        onMoreClick={() => alert("상세보기 클릭!")}
      />



          {/* <S.ChallengBox>
            <S.ChSrcLayout>
              <S.TeamLayout>
                <S.TeamBox>
                  <S.TeamName>Team NIGHT</S.TeamName>
                  <S.Type>NIGHT</S.Type>
                </S.TeamBox>

                <S.MoreBtn>
                  상세 보기 <ChevronRight size={16} />{" "}
                </S.MoreBtn>
              </S.TeamLayout>

              <div
                style={{
                  backgroundColor: "#D2D0D0",
                  height: "1px",
                  width: "100%",
                  flex: "none",
                  margin: "10px 0",
                }}
              ></div>
            </S.ChSrcLayout>
          </S.ChallengBox> */}

          <S.TalkBox>
            <S.ChSrcLayout>
              <S.TalkTitle>실시간 듀티톡 LIVE</S.TalkTitle>

              {/* 
        💡 핵심 로직:
        1. talks.slice(0, 3) : 배열에서 최신 3개 항목만 추출
        2. .map((item) => ...) : 추출된 항목을 <ChatBox />로 변환
      */}
              {talks.slice(0, 3).map((item) => (
                <ChatBox
                  key={item.talkId} // 💡 React가 구별할 고유 key값 (talkId)
                  comment={item.message} // 💡 명세서의 message를 comment로 연결
                  time={item.createdAt} // 💡 명세서의 createdAt을 time으로 연결
                />
              ))}



              <S.ChatInputContainer onSubmit={handleSubmit}>
      <S.ChatInput 
        type="text" 
        
        value={text}                             // 1. 현재 text 상태값을 보여줌
        onChange={(e) => setText(e.target.value)} // 2. 글자를 칠 때마다 setText로 text 값 변경
      />
      <S.SendButton type="submit"><ChevronRight size = {24}  /></S.SendButton>
    </S.ChatInputContainer>


            </S.ChSrcLayout>
          </S.TalkBox>

          <S.MoveLoutin onClick={() => navigate("/home")}>
            내 루틴 완료하고 게이지 채우기


          </S.MoveLoutin>



          <S.ShopBox>
            <S.ChSrcLayout>
            <S.TeamLayout>
                <S.ShopName>웰니스 Reward Shop</S.ShopName>
                  
                

                <S.MoreBtn>
                  전체 보기 <ChevronRight size={16} />{" "}
                </S.MoreBtn>
            </S.TeamLayout>


            <div style={{display: "flex" , gap : "10px"}}>


            {itemList.map((item) => (
        <RewardItem
          key={item.id}
          imageUrl={item.imageUrl}
          name={item.name}
          description={item.description}
          points={item.points}
          
        />
      ))}
      </div>



            </S.ChSrcLayout>


          </S.ShopBox>
        </S.SrcLayout>
      </S.MainLayout>
    </>
  );
}

export default DutyLounge;
