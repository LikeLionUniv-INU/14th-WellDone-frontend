import React, { useState } from "react";
import * as S from "../styles/RoutineCard.style";




// 요일 헤더 라벨 (월~일)
const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

function RoutineCard({ routineName, cycle, initialChecks }) {
  // 📌 [참고 조건 6] useState를 통해 월~일(7일)의 true/false 체크 상태 관리
  const [checks, setChecks] = useState(
    initialChecks || [false, false, false, false, false, false, false]
  );

  // 체크 상태를 토글(클릭 시 상태 변경)하는 함수
  const handleToggleCheck = (index) => {
    setChecks((prevChecks) => {
      const newChecks = [...prevChecks];
      newChecks[index] = !newChecks[index];
      return newChecks;
    });
  };

  return (
    <S.CardContainer>
      {/* 1. 상단: 루틴 이름 및 반복 주기 */}
      <S.HeaderLayout>
        <S.RoutineTitle>{routineName}</S.RoutineTitle>
        <S.CycleText>{cycle}</S.CycleText>
      </S.HeaderLayout>

      {/* 2. [참고 조건 2] height 1px 크기의 div 가로선 */}
      <S.HorizontalLine />

      {/* 3. 하단: 요일 및 체크 상태 아이콘 (7개) */}
      <S.DaysGrid>
        {DAYS.map((day, index) => {
          const isChecked = checks[index]; // 해당 요일의 true/false 값

          return (
            <S.DayColumn key={index} onClick={() => handleToggleCheck(index)}>
              <S.DayLabel>{day}</S.DayLabel>

              {/* 📌 [참고 조건 1, 6] 삼항 연산자로 활성화 여부에 따라 svg 이미지 분기 */}
              <S.CheckIcon
                src={isChecked ? "/check.svg" : "/unchecked.svg"} 
                alt={isChecked ? "체크됨" : "미체크"}
              />
            </S.DayColumn>
          );
        })}
      </S.DaysGrid>
    </S.CardContainer>
  );
}

export default RoutineCard;