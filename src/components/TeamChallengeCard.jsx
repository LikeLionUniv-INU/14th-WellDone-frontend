import React from "react";
import * as S from "../styles/TeamChallengeCard.style";
import { ChevronRight, Users, Gift } from "lucide-react"; // lucide-react 아이콘 사용

function TeamChallengeCard({
  teamName ,
  type ,
  percentage,
  remainingPercent ,
  participantCount ,
  rewardInfo ,
  onMoreClick,
}) {
  return (
    <S.ChallengBox>
      <S.ChSrcLayout>
        {/* 1. 상단 팀 이름 & 상세보기 */}
        <S.TeamLayout>
          <S.TeamBox>
            <S.TeamName>{teamName}</S.TeamName>
            <S.Type>{type}</S.Type>
          </S.TeamBox>

          <S.MoreBtn onClick={onMoreClick}>
            상세 보기 <ChevronRight size={16} />
          </S.MoreBtn>
        </S.TeamLayout>

        {/* 2. 대형 퍼센트 텍스트 */}
        <S.PercentText>{percentage}%</S.PercentText>

        {/* 3. 동적 프로그레스 바 (막대그래프) */}
        <S.ProgressBarTrack>
          <S.ProgressBarFill $percent={percentage} />
        </S.ProgressBarTrack>

        {/* 4. 목표 달성 안내 문구 */}
        <S.TargetText>
          목표까지 <span>{remainingPercent}%</span> 남았어요
        </S.TargetText>

        {/* 5. 구분선 */}
        <S.Divider />

        {/* 6. 하단 참여자 수 & 보상 정보 */}
        <S.BottomInfoLayout>
          <S.InfoItem>
            <Users size={18} color="#4E46E5" />
            <span>{participantCount}명 참여 중</span>
          </S.InfoItem>

          <S.VerticalDivider />

          <S.InfoItem>
            <Gift size={18} color="#4E46E5" />
            <span>{rewardInfo}</span>
          </S.InfoItem>
        </S.BottomInfoLayout>
      </S.ChSrcLayout>
    </S.ChallengBox>
  );
}

export default TeamChallengeCard;