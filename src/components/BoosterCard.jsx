import React from "react";
import * as S from "../styles/BoosterCard.style";

function BoosterCard({ days = 25, rate = 82, subText }) {
  return (
    <S.CardContainer>
      {/* 원형 도넛 프로그레스 바 */}
      <S.CircleProgress $rate={rate}>
        <S.InnerCircle>{rate}%</S.InnerCircle>
      </S.CircleProgress>

      {/* 텍스트 정보 */}
      <S.InfoArea>
        <S.Title>{days}일 간<br />Booster MODE</S.Title>
        <S.SubText>{subText || "높은 달성률로\n루틴 전반을 수행했어요."}</S.SubText>
      </S.InfoArea>
    </S.CardContainer>
  );
}

export default BoosterCard;