import React from "react";
import * as S from "../styles/BoosterCard.style"; // 본인 프로젝트의 스타일 경로에 맞춰 확인해주세요!

function BoosterCard({ days = 25, rate = 82, subText }) {
  return (
    <S.CardContainer>
      {/* 💡 SVG 기반의 둥근 원형 프로그레스 바 */}
      <S.CircleWrapper>
        <S.StyledSvg viewBox="0 0 100 100">
          <S.BackgroundTrack
            cx="50"
            cy="50"
            r="40"
          />
          <S.ProgressCircle
            cx="50"
            cy="50"
            r="40"
            $rate={rate}
          />
        </S.StyledSvg>
        <S.InnerText>{rate}%</S.InnerText>
      </S.CircleWrapper>

      {/* 텍스트 정보 */}
      <S.InfoArea>
        <S.Title>
          {days}일 간<br />
          Booster MODE
        </S.Title>
        <S.SubText>
          {subText || "높은 달성률로\n루틴 전반을 수행했어요."}
        </S.SubText>
      </S.InfoArea>
    </S.CardContainer>
  );
}

export default BoosterCard;
