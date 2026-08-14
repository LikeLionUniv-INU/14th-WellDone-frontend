import React from "react";
import * as S from "../styles/RoutineList.styles";

/**
 * 개별 루틴 아이템 컴포넌트
 * @param {Object} item - 루틴 데이터 (id, title, time, icon 등)
 * @param {number} index - 배열 내부 인덱스
 * @param {boolean} isUnfolded - 현재 스크롤 위치상 펼쳐진 상태인지 여부
 * @param {number} stackDepth - 접혀있을 때 포개지는 순서 (0: 맨 위, 1: 걸쳐서 보이는 2번째 카드, 2+: 숨김)
 */
export default function RoutineItem({ item, index, isUnfolded, stackDepth }) {
  return (
    <S.CardItemWrapper
      $index={index}
      $isUnfolded={isUnfolded}
      $stackDepth={stackDepth}
    >
      <S.CardInner>
        {/* 아이콘 및 타이틀 영역 */}
        <S.LeftSection>
          <S.IconBox>{item.icon}</S.IconBox>
          <S.ItemTitle>{item.title}</S.ItemTitle>
        </S.LeftSection>

        {/* 소요시간 / 상세 정보 영역 */}
        {item.time && <S.ItemTime>{item.time}</S.ItemTime>}
      </S.CardInner>
    </S.CardItemWrapper>
  );
}