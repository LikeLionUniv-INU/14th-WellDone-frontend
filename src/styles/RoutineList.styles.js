import styled from "styled-components";

/* 전체 스크롤 감지 및 화면 컨테이너 (반응형 높이 dvh 사용) */
export const ScrollViewContainer = styled.div`
  width: 100%;
  max-width: 90dvw;
  height: 85dvh;
  margin: 0 auto;
  overflow-y: auto; /* 순수 스크롤 이벤트 발생 지점 */
  padding: 1.5rem 1rem 5rem 1rem;
  box-sizing: border-box;

  /* 스크롤바 숨기기 (모바일 웹 감성) */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

/* 상단 고정: 메인 루틴 카드 (노란색/연두색 - 스택 및 스크롤 대상 제외) */
export const FixedMainCard = styled.div`
  background-color: #f7fde8;
  border: 0.08rem solid #e2f0d0;
  border-radius: 1.25rem;
  padding: 1.2rem 1.25rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.03);
`;

export const MainLeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const TimerCircle = styled.div`
  width: 3.8rem;
  height: 3.8rem;
  border-radius: 50%;
  background: #ffffff;
  border: 0.25rem solid #d4eb9c;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 700;
  color: #333333;
`;

export const MainTitle = styled.h3`
  font-size: 1.05rem;
  font-weight: 700;
  color: #222222;
  margin: 0 0 0.25rem 0;
`;

export const MainSubText = styled.span`
  font-size: 0.82rem;
  color: #666666;
`;

export const OffBadge = styled.span`
  font-size: 0.85rem;
  font-weight: 700;
  color: #4a7c1b;
`;

/* 하단 스택 리스트 전체 레이아웃 컨테이너 */
export const StackListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`;

/* 개별 카드 스타일 - 스크롤 위치 계산에 따른 dynamic stacking 적용 */
export const CardItemWrapper = styled.div`
  width: 100%;
  background: #f4f4f5;
  border: 0.07rem solid #e5e7eb;
  border-radius: 1.15rem;
  padding: 1rem 1.25rem;
  box-sizing: border-box;
  box-shadow: 0 0.2rem 0.6rem rgba(0, 0, 0, 0.04);
  
  /* 펼쳐지거나 접힐 때의 부드러운 위치/크기 전환 애니메이션 */
  transition: transform 0.35s cubic-bezier(0.25, 1, 0.5, 1),
              margin-top 0.35s cubic-bezier(0.25, 1, 0.5, 1),
              opacity 0.3s ease,
              background-color 0.2s ease;

  /* 💡 1. 스크롤을 내려서 화면 안에 들어온 경우 (펼침) */
  ${(props) =>
    props.$isUnfolded &&
    `
    margin-top: 0.75rem;
    transform: translateY(0) scale(1);
    opacity: 1;
    z-index: 1;
  `}

  /* 💡 2. 아직 스크롤에 도달하지 않아 포개진(Stack) 상태인 경우 */
  ${(props) =>
    !props.$isUnfolded &&
    `
    /* 스택 맨 위 요소 (0번째) */
    ${
      props.$stackDepth === 0 &&
      `
      position: relative;
      z-index: 3;
      margin-top: 0.75rem;
      transform: translateY(0) scale(1);
      opacity: 1;
    `
    }

    /* 1개 걸쳐진 요소 (1번째: image_20e97b.png 처럼 밑부분만 살짝 보임) */
    ${
      props.$stackDepth === 1 &&
      `
      z-index: 2;
      margin-top: -2.6rem; /* 위 카드 밑으로 파고들어 밑부분만 Peek */
      transform: scaleX(0.94); /* 살짝 좁게 만들어 입체감 부여 */
      background: #e8e8e8;
      opacity: 0.9;
    `
    }

    /* 2개 이상 넘어가는 요소는 포개진 카드 뒤로 숨겨둠 */
    ${
      props.$stackDepth >= 2 &&
      `
      z-index: 1;
      margin-top: -3.2rem;
      transform: scaleX(0.88);
      opacity: 0;
      pointer-events: none;
    `
    }
  `}
`;

export const CardInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const IconBox = styled.span`
  font-size: 1.1rem;
  display: flex;
  align-items: center;
`;

export const ItemTitle = styled.span`
  font-size: 0.95rem;
  font-weight: 600;
  color: #222222;
`;

export const ItemTime = styled.span`
  font-size: 0.85rem;
  color: #777777;
  font-weight: 500;
`;