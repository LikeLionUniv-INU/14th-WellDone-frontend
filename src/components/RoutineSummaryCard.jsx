import React from "react";
import * as S from "../styles/RoutineSummaryCard.style";

function RoutineSummaryCard({ categories = [], bestCategory = "정서 웰니스", worstCategory = "환경 웰니스 (30%)" }) {
  const totalCount = categories.length;

  return (
    <S.CardContainer>
      <S.Title>루틴 영역별 달성 요약</S.Title>
      <S.SubTitle>지난 달 가장 잘 지킨 루틴을 확인해보세요.</S.SubTitle>

      {/* 📌 [참고 6] 막대 개수(1개~6개)에 맞춰 가로 비율이 등분되는 차트 영역 */}
      <S.BarChartContainer>
        {categories.map((item, index) => (
          <S.BarColumn key={index}>
            <S.BarTrack>
              <S.BarFill $rate={item.rate} $color={item.color} />
            </S.BarTrack>
            <S.BarLabel>{item.name}</S.BarLabel>
          </S.BarColumn>
        ))}
      </S.BarChartContainer>

      {/* 요약 평가 문구 */}
      <S.BottomDesc>
        지난 달 {totalCount}개 영역 중 <span className="purple">{bestCategory}</span>를 가장 잘 지키셨어요.
        <br />
        <span className="purple">{worstCategory}</span>도 조금만 더 힘내봐요!
      </S.BottomDesc>
    </S.CardContainer>
  );
}

export default RoutineSummaryCard;