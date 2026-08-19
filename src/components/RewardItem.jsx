import React from "react";
import * as S from "../styles/RewardItem.style";

function RewardItem({ imageUrl, name, description, points, onClick }) {
  // points가 숫자만 들어올 수도 있으므로 P 단위를 붙여서 깔끔하게 포맷팅
  const formattedPoints = typeof points === "number" ? `${points.toLocaleString()}P` : points;

  return (
    <S.CardButton onClick={onClick}>
      {/* 1. 상품 이미지 */}
      <S.ProductImage src={imageUrl} alt={name} />

      {/* 2. 상품 정보 텍스트 영역 */}
      <S.InfoContainer>
        
        <S.ProductName>{name}</S.ProductName>
        <S.ProductDescription>{description}</S.ProductDescription>
        <S.ProductPoints>{formattedPoints}</S.ProductPoints>
      </S.InfoContainer>
    </S.CardButton>
  );
}

export default RewardItem;