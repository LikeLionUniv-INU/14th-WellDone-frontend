// components/MobileLayout.jsx
import styled from 'styled-components';

const MobileWrapper = styled.div`
  width: 100%;
  min-width: 430px; /* 📱 스마트폰 최소 너비 (iPhone SE 기준) */
  
  height: 100dvh;   /* 화면 전체 높이 */
  background-color: #ffffff; /* 핸드폰 내부 실제 앱 배경색 */
  margin: 0 auto;   /* 중앙 정렬 */
  
  /* 🎨 핸드폰 프레임 느낌을 주기 위한 효과 */
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.08); 
  position: relative;
  overflow-y: auto; /* 내용이 길어지면 핸드폰 내부에서만 스크롤 */

  /* 💡 앱처럼 보이게 스크롤바 감추기 (선택 사항) */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none;    /* Firefox */
`;

export function MobileLayout({ children }) {
  return <MobileWrapper>{children}</MobileWrapper>;
}