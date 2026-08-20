import styled from "styled-components";

// 전체 카드 (클릭 가능한 버튼 형태)
export const CardButton = styled.button`
  width: 32%;
  height: fit-content;
  min-height: 90px; /* 너무 작아지지 않게 최소 높이 설정 */

  flex: none;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  margin-bottom: 15px;

  background-color: #ffffff;
  border: 1.5px solid #d2d0d0; /* 이미지 속 은은한 연회색 테두리 */
  border-radius: 8px; /* 둥근 모서리 */
  box-sizing: border-box;

  cursor: pointer;
  text-align: left; /* button 기본 중앙정렬 해제 */
  outline: none;
  transition:
    border-color 0.2s ease,
    transform 0.1s ease;

  /* 호버 & 클릭 효과 */
  &:hover {
    border-color: #6f6af8;
  }
  &:active {
    transform: scale(0.99);
  }
`;

// 좌측 정사각형 이미지
export const ProductImage = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;

  margin-top: 4px;
  object-fit: cover;
  flex-shrink: 0; /* 비율 찌그러짐 방지 */
  background-color: #f3f4f6; /* 이미지 로딩 시 대체 배경색 */
`;

// 우측 정보 컨테이너
export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  flex: 1;
  overflow: hidden;
  flex: none;
  /* 💡 수정 포인트 1: 너비 제한 지정 및 Flex 자식의 기본 min-width 해제 */
  width: 100%;
  min-width: 0; /* 👈 필수: Flex 레이아웃에서 ellipsis 작성을 위한 핵심 속성 */

`;

// 상품명
export const ProductName = styled.h4`
  margin: 0;
  font-size: 0.7rem;
  font-weight: 700;
  color: #1f2937;

  /* 넘치는 글자 줄임표(...) 처리 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  /* 💡 수정 포인트 2: 너비 100% 지정 및 중앙 정렬 */
  width: 100%;
  text-align: center;
`;

// 상품 상세 설명
export const ProductDescription = styled.p`
  margin: 0;
  font-size: 0.6rem;
  color: #6e6e73;

  /* 넘치는 글자 줄임표(...) 처리 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  /* 💡 수정 포인트 2: 너비 100% 지정 및 중앙 정렬 */
  width: 100%;
  text-align: center;
`;


// 상품 포인트
export const ProductPoints = styled.span`
  margin-top: 10px;
  font-size: 0.8rem;
  font-weight: 700;
  color: #6f6af8; /* 듀티톡 테마 포인트 보라색 */
`;
