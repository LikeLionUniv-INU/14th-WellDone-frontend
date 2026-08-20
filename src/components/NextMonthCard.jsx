import React from "react";
import * as S from "../styles/NextMonthCard.style";
import { Calendar } from "lucide-react"; // 아이콘 패키지 사용 (없을 시 브라우저 기본 이모지로 대체 가능)

function NextMonthCard({
  subTitle = "다음 달 회복 포인트",
  title = "7월 2주차 야간근무",
  description = "야간 근무가 이어지는 기간이에요.\n회복 부담을 줄인 루틴을 추천해드릴게요.",
}) {
  return (
    <S.CardContainer>
      <S.IconWrapper>
        <Calendar
          size={22}
          color="#6F6AF8"
        />
      </S.IconWrapper>

      <S.InfoArea>
        <S.SubTitle>{subTitle}</S.SubTitle>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
      </S.InfoArea>
    </S.CardContainer>
  );
}

export default NextMonthCard;
