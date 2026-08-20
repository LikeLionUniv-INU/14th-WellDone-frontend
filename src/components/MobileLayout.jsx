// components/MobileLayout.jsx
import styled from "styled-components";

const MobileWrapper = styled.div`
  width: 100%;
  max-width: 430px; /* 📱 스마트폰 최소 너비 (iPhone SE 기준) */
  border-radius: 10px;

  min-height: 100vh;

  background-color: #ffffff; /* 핸드폰 내부 실제 앱 배경색 */
  margin: 0 auto; /* 중앙 정렬 */

  box-sizing: border-box;

  /* 🎨 핸드폰 프레임 느낌을 주기 위한 효과 */
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: visible;

  /* 💡 앱처럼 보이게 스크롤바 감추기 (선택 사항) */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */

  /* 📱 [실제 모바일 화면 (430px 이하)] 프레임 제한을 풀고 100% 채움 */
  @media (max-width: 430px) {
    min-width: 100%;

    box-shadow: none; /* 그림자 제거 */
    border-radius: 0; /* 모서리 둥글기 제거 */
  }
`;

export function MobileLayout({ children }) {
  return <MobileWrapper>{children}</MobileWrapper>;
}
