
import styled from "styled-components";

// 네비게이션 바 전체 컨테이너
export const Bar = styled.nav`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 480px;
  height: 64px;
  background-color: #f2f2f2; /* 연한 회색 배경 */
  border-radius: 28px 28px 0 0;

  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1000;
  box-sizing: border-box;
`;

// 개별 아이콘 버튼 클릭 영역
export const NavItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 100%;
  cursor: pointer;
`;

// 💡 아이콘을 감싸는 원 (선택 시 위로 올라오는 애니메이션)
export const IconCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  /* 💡 기본(비활성) 상태 크기 */
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: transparent;
  border: 2px solid transparent;

  /* 애니메이션 설정 */
  transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.25),
              background-color 0.2s ease,
              border-color 0.2s ease,
              width 0.2s ease,
              height 0.2s ease;

  /* 💡 클릭되어 활성화($isActive) 되었을 때의 변신 */
  ${(props) =>
    props.$isActive &&
    `
    width: 60px;
    height: 60px;
    background-color: #ffffff; /* 흰색 동그라미 배경 */
    border: 2px solid #222222; /* 검은색 테두리 */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    
    /* Y축으로 -24px만큼 위로 띄움 */
    transform: translateY(-24px);
  `}
`;

// 아이콘 이미지 크기
export const IconImg = styled.img`
  width: 28px;
  height: 28px;
  object-fit: contain;
`;