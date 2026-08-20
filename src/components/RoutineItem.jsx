import React from "react";
import * as S from "../styles/RoutineItem.styles";

const RoutineItem = ({ time, title , duration}) => {
  return (
    <S.ItemContainer>
      <S.CircleIcon />
      <S.TextContent>
        {time} {title} 
      </S.TextContent>
      <S.Duration>

        {duration}
      </S.Duration>


    </S.ItemContainer>
  );
};

export default RoutineItem;
