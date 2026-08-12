import * as S from "../styles/NavigationBar.styles";
import { useNavigate , useLocation } from "react-router-dom";
import React from "react";


const NAV_ITEMS = [ // 네비게이션 바 props정보 ( mapping용)
  {
    name: "home",
    path: "/",
    activeSrc: "/assets/icons/home-active.png",   // 테두리/배경 있는 활성 이미지
    inactiveSrc: "/assets/icons/home.png",         // 기본 집 이미지
  },
  {
    name: "challenge",
    path: "/challenge",
    activeSrc: "/assets/icons/trophy-active.png", // 활성 트로피 이미지
    inactiveSrc: "/assets/icons/trophy.png",       // 기본 트로피 이미지
  },
  {
    name: "mypage",
    path: "/mypage",
    activeSrc: "/assets/icons/my-active.png",     // 활성 MY 이미지
    inactiveSrc: "/assets/icons/my.png",           // 기본 MY 이미지
  },
];

const NavIcon = ({ item, isActive }) => { // 네비게이션 아이콘 컴포넌트
  const navigate = useNavigate();

  return (
    <S.NavItem onClick={() => navigate(item.path)}>
      {/* 💡 선택 상태($isActive)에 따라 원 크기, 배경, Y축 위치가 변합니다 */}
      <S.IconCircle $isActive={isActive}>
        <S.IconImg
          src={isActive ? item.activeSrc : item.inactiveSrc}
          alt={item.name}
        />
      </S.IconCircle>
    </S.NavItem>
  );
};

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return( 
  <>
  <S.Bar>

      {NAV_ITEMS.map((item) => (
        <NavIcon
          key={item.name}
          item={item}
          isActive={location.pathname.startsWith(item.path)}
        />
      ))}
    
  </S.Bar>
  
  </>);
};

export default NavigationBar;
