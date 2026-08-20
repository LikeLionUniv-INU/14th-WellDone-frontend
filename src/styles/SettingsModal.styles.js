import styled, { keyframes, css } from "styled-components";

// 모달 등장 애니메이션
const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

// 1. 어두운 배경 오버레이 (클릭 시 모달 닫힘)
export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100dvh;
  background-color: rgba(0, 0, 0, 0.3); // 30% 불투명도 검은색
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: flex-end; // 하단 정렬
`;

// 2. 모달 컨테이너 (화면 하단 50% 차지)
export const ModalContainer = styled.div`
  width: 100%;
  max-width: 430px; // 모바일 웹 최적화 가로폭
  height: 50dvh; // 전체 화면 높이의 50%
  background-color: #ffffff;
  border-radius: 1.5rem 1.5rem 0 0; // 상단 라운드 처리
  padding: 1.25rem 1.5rem 2rem 1.5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  box-shadow: 0 -0.25rem 1.25rem rgba(0, 0, 0, 0.1);
  z-index: 1000;
  overflow-y: auto;

  /* 💡 핵심 1: 애니메이션이 아직 안 끝났을 때만 slideUp 실행! 완료 후에는 none으로 변경 */
  animation: ${(props) =>
    props.$isAnimateDone
      ? "none"
      : css`
          ${slideUp} 0.3s cubic-bezier(0.25, 1, 0.5, 1) forwards
        `};

  /* 💡 핵심 2: 드래그 중이 아닐 때만 복귀용 transition 적용 */
  transition: ${(props) =>
    props.$isDragging ? "none" : "transform 0.2s ease-out"};

  touch-action: pan-y; // 세로 스크롤/드래그 허용
`;

// 3. 하단으로 슬라이드 제스처 안내용 핸들바
export const DragHandle = styled.div`
  flex-shrink: 0; /* 💡 부모가 flex여도 크기가 0으로 찌그러지지 않게 방지! 이게 없으면 flex가 내용이 없는것을 넓이를 맘댇로 줄여서 없애 버림 */
  width: 4rem;
  height: 0.4rem;
  background-color: #f2f2f2;
  border-radius: 1rem;
  margin: 0 auto 1.25rem auto;
  cursor: grab;
`;

// 4. 모달 타이틀
export const Title = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 2.5rem;
`;

// 5. 메뉴 목록 리스트
export const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
`;

// 6. 설정 항목 개별 버튼
export const MenuItemButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 1rem;
  background-color: #ffffff;
  border: 0.0625rem solid #e2e8f0;
  border-radius: 0.5rem;
  margin: 0;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:active {
    background-color: #f8fafc;
  }
`;

// 7. 버튼 좌측 (아이콘 + 텍스트 그룹)
export const ItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

// 8. 아이콘 스타일 (포인트 컬러 적용)
export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6f6af8; // 포인트 퍼플
`;

// 9. 텍스트 라벨 영역 (제목 + 설명)
export const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.15rem;
`;

export const ItemTitle = styled.span`
  font-size: 1rem;
  font-weight: 700;
  color: #1e293b;
`;

export const ItemSubtitle = styled.span`
  font-size: 0.8rem;
  font-weight: 500;
  color: #6e6e73;
`;

// 10. 우측 화살표 안내용 아이콘
export const ArrowWrapper = styled.div`
  display: flex;
  align-items: center;
  color: #6e6e73;
`;

// 11. 아이콘 크기
export const Icon = styled.img`
  width: 2rem;
  height: 2rem;
`;
