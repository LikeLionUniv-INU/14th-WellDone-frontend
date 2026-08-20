import React from "react";
import * as S from "../styles/GoldenTimeCard.style";

function GoldenTimeCard({
  rate = 82,
  subText = "퇴근 후 활동기 전까지 회복 루틴을 꾸준히 지켜냈어요",
}) {
  return (
    <S.CardContainer>
      <S.Header>
        <S.Title>골든타임 회복률</S.Title>
        <S.RateText>{rate}%</S.RateText>
      </S.Header>

      <S.ProgressBarTrack>
        <S.ProgressBarFill $rate={rate} />
      </S.ProgressBarTrack>

      <S.SubText>{subText}</S.SubText>
    </S.CardContainer>
  );
}

export default GoldenTimeCard;
