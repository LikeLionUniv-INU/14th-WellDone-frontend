import React, { useState, useRef, useEffect } from "react";
import RoutineItem from "./RoutineItem";
import * as S from "../styles/RoutineList.styles";

// 💡 스크롤 리스트 데이터 정의
const ROUTINE_DATA = [
  { id: 1, title: "07:30 퇴근", time: "", icon: "🚗" },
  { id: 2, title: "반신욕", time: "30분 간", icon: "👤" },
  { id: 3, title: "림프관 마사지", time: "10분 간", icon: "😊" },
  { id: 4, title: "따뜻한 물 150ml", time: "1회", icon: "☕" },
  { id: 5, title: "10:00 취침", time: "1회", icon: "🌙" },
  { id: 6, title: "수면 기록 확인", time: "5분 간", icon: "🎵" },
];

export default function RoutineList() {
  const containerRef = useRef(null);

  // 현재 스크롤 위치 기반으로 펼쳐진 아이템 개수 관리
  const [unfoldedCount, setUnfoldedCount] = useState(1);

  /**
   * 💡 핵심 로직: 스크롤 위치 및 바닥 감지 계산 함수
   * 터치/클릭 이벤트가 아닌 오직 순수 스크롤 수치(scrollTop)로 판단합니다.
   */
  const handleScroll = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scrollTop = container.scrollTop; // 이동한 스크롤 양

    // 카드 1개가 펼쳐지는 단위 거리를 계산 (반응형 rem 단위에 대응)
    const remInPx = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
    const stepDistance = 3.5 * remInPx; // 약 3.5rem 간격마다 1개씩 펼쳐짐

    // 스크롤 위치에 따라 펼쳐질 카드의 개수 산출 (최소 1개 ~ 최대 전체 개수)
    const calculatedCount = Math.min(
      ROUTINE_DATA.length,
      Math.max(1, Math.floor(scrollTop / stepDistance) + 1)
    );

    // 스크롤 내릴 때 펴지고, 스크롤 올릴 때 다시 접히도록 상태 업데이트
    setUnfoldedCount(calculatedCount);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <S.ScrollViewContainer ref={containerRef}>
      {/* 1. 상단 고정 영역 (하체 부종 스트레칭 - 스택 목록에서 제외) */}
      <S.FixedMainCard>
        <S.MainLeftGroup>
          <S.TimerCircle>
            <span>💪</span>
            <span>29:44</span>
          </S.TimerCircle>
          <div>
            <S.MainTitle>하체 부종 스트레칭</S.MainTitle>
            <S.MainSubText>🔗 Youtube/홈트...</S.MainSubText>
          </div>
        </S.MainLeftGroup>
        <S.OffBadge>🌱 OFF</S.OffBadge>
      </S.FixedMainCard>

      {/* 2. 스크롤 기반 동적 스택 리스트 (map 함수 사용) */}
      <S.StackListWrapper>
        {ROUTINE_DATA.map((item, index) => {
          // 해당 인덱스가 현재 스크롤 펼침 개수 범위 안인지 확인
          const isUnfolded = index < unfoldedCount;

          // 접혀있을 경우, 스택의 몇 번째 카드인지 연산 (0: 맨 위, 1: 1개 걸침, 2+: 대기)
          const stackDepth = index - unfoldedCount + 1;

          return (
            <RoutineItem
              key={item.id}
              item={item}
              index={index}
              isUnfolded={isUnfolded}
              stackDepth={stackDepth}
            />
          );
        })}
      </S.StackListWrapper>
    </S.ScrollViewContainer>
  );
}
