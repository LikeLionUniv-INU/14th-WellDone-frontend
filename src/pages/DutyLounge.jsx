import * as S from "../styles/DutyLounge";
import { ChevronRight } from "lucide-react"; //  루시드 리엑트 라이브러리 에서 아이콘 가져오기
import ChatBox from "../components/ChatBox";
import React, { useState, useEffect } from "react";
import RewardItem from "../components/RewardItem";
import TeamChallengeCard from "../components/TeamChallengeCard";
import { useNavigate } from "react-router-dom";

// 1. API 함수 3개 가져오기
import { getItemLst, getMainData, getDutyTalk ,WriteDuTa } from "../api/dutylng";

function DutyLounge() {
  // 상태값 관리 (중복 선언 제거)
  const [talks, setTalks] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [myPoint, setMyPoint] = useState(0);
  const [todayDutyType, setTodayDutyType] = useState("");
  const [group, setGroup] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  // -----------------------------------------------------------
  // 1. [채팅 전용] 목록 조회 함수 및 10초 폴링 (setInterval)
  // -----------------------------------------------------------
  const fetchDutyTalks = async () => {
    try {
      const res = await getDutyTalk();
     
      if (res?.isSuccess && res?.result) {
        setTalks(res.result.talks || []);
      }
    } catch (error) {
      console.error("채팅 불러오기 에러:", error);
    }
  };

  useEffect(() => {
    // 최초 1회 실행
    fetchDutyTalks();

    // 10초마다 주기적으로 채팅 목록 갱신
    const timer = setInterval(() => {
      fetchDutyTalks();
    }, 10000);

    // 컴포넌트 언마운트 시 타이머 제거 (메모리 누수 방지)
    return () => clearInterval(timer);
  }, []);
// -----------------------------------------------------------
  // 2. [페이지 정적 데이터] 메인 & 리워드 데이터 (1회성 조회)
  // -----------------------------------------------------------
  useEffect(() => {
    const fetchStaticData = async () => {
      try {
        const [mainRes, rewardsRes] = await Promise.allSettled([
          getMainData(),
          getItemLst(),
        ]);

        if (mainRes.status === "fulfilled" && mainRes.value?.isSuccess) {
          const data = mainRes.value.result;
          setMyPoint(data.myPoint);
          setTodayDutyType(data.todayDutyType);
          setGroup(data.group);
        }

        if (rewardsRes.status === "fulfilled" && rewardsRes.value?.isSuccess) {
          setRewards(rewardsRes.value.result.rewards || []);
        }
      } catch (error) {
        console.error("정적 데이터 로딩 에러:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStaticData();
  }, []);

// -----------------------------------------------------------
  // 3. [메시지 전송] WriteDuTa 연동
  // -----------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const res = await WriteDuTa(text);

      if (res?.isSuccess) {
        setText(""); // 입력창 초기화
        await fetchDutyTalks(); // 전송 성공 즉시 채팅목록 다시 불러오기
      } else {
        alert(res?.message || "메시지 전송 실패");
      }
    } catch (error) {
      console.error("메시지 전송 에러:", error);
    }
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
            <div style={{ color: "#A4A4A4", marginBottom: "15px",borderRadius: "10px",backgroundColor:"white" ,padding: "20px", textAlign: "center" }}>
              오늘은 참여 중인 팀 챌린지가 없습니다.<br/> 푹 쉬세요!
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
