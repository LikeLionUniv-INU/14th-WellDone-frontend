import * as S from "../styles/DutyLounge";
import { ChevronRight } from "lucide-react"; //  루시드 리엑트 라이브러리 에서 아이콘 가져오기
import ChatBox from "../components/ChatBox";
import React, { useState, useEffect } from "react";
import RewardItem from "../components/RewardItem";
import TeamChallengeCard from "../components/TeamChallengeCard";
import { useNavigate } from "react-router-dom";

// 1. API 함수 3개 가져오기
import { getItemLst, getMainData, getDutyTalk } from "../api/dutylng";

function DutyLounge() {
  // 상태값 관리 (중복 선언 제거)
  const [talks, setTalks] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [myPoint, setMyPoint] = useState(0);
  const [todayDutyType, setTodayDutyType] = useState("");
  const [group, setGroup] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  // 2. 통합 useEffect (Promise.all로 3개 API 동시 호출)
  useEffect(() => {
    const fetchAllLoungeData = async () => {
      try {
        // 3개의 API 요청을 동시에 병렬 실행
        const [mainRes, rewardsRes, talkRes] = await Promise.all([
          getMainData(),
          getItemLst(),
          getDutyTalk(),
        ]);

        // [1] 메인 데이터 세팅
        if (mainRes?.isSuccess && mainRes?.result) {
          setMyPoint(mainRes.result.myPoint);
          setTodayDutyType(mainRes.result.todayDutyType);
          setGroup(mainRes.result.group); // OFF일 경우 null 들어감
        }

        // [2] 리워드 데이터 세팅
        if (rewardsRes?.isSuccess && rewardsRes?.result) {
          setRewards(rewardsRes.result.rewards || []);
        }

        // [3] 듀티톡 데이터 세팅
        if (talkRes?.isSuccess && talkRes?.result) {
          setTalks(talkRes.result.talks || []);
        }
      } catch (error) {
        console.error("데이터 로딩 중 에러 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllLoungeData();
  }, []);

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

            <S.PointBox>💎 {(myPoint || 0).toLocaleString()}P</S.PointBox>
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

          {/* 챌린지 카드: group 데이터 유무에 따른 조건부 렌더링 */}
          {group ? (
            <TeamChallengeCard
              teamName={group.groupName}
              type={group.tag}
              percentage={group.achievementRate}
              remainingPercent={group.remainingRate}
              participantCount={group.participantCount?.toLocaleString()}
              rewardInfo={group.rewardCondition}
              onMoreClick={() => alert("상세보기 클릭!")}
            />
          ) : (
            /* OFF 이거나 그룹이 없을 때 나타나는 UI 예시 */
            <div style={{ padding: "20px", textAlign: "center" }}>
              오늘({todayDutyType})은 참여 중인 팀 챌린지가 없습니다. 푹 쉬세요!
              😴
            </div>
          )}

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

                  value={text} // 1. 현재 text 상태값을 보여줌
                  onChange={(e) => setText(e.target.value)} // 2. 글자를 칠 때마다 setText로 text 값 변경
                />
                <S.SendButton type="submit">
                  <ChevronRight size={24} />
                </S.SendButton>
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

              <div style={{ display: "flex", gap: "10px" }}>
                {rewards.map((item) => (
                  <RewardItem
                    key={item.rewardId} // id -> rewardId
                    imageUrl={item.imageUrl}
                    name={item.name}
                    points={item.requiredPoint} // points -> requiredPoint
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
