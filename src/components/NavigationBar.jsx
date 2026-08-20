import * as S from "../styles/NavigationBar.styles";
import { useNavigate, useLocation } from "react-router-dom";
import React from "react";

const NAV_ITEMS = [
  // 네비게이션 바 props정보 ( mapping용)
  {
    name: "HOME",
    path: "/home",
    activeSrc: "homep.svg", // 테두리/배경 있는 활성 이미지
    inactiveSrc: "home.svg", // 기본 집 이미지
  },
  {
    name: "LOUNGE",
    path: "/challenge",
    activeSrc: "loungep.svg", // 활성 트로피 이미지
    inactiveSrc: "lounge.svg", // 기본 트로피 이미지
  },
  {
    name: "MY",
    path: "/mypage",
    activeSrc: "Icon.svg", // 활성 MY 이미지
    inactiveSrc: "iconnp.svg", // 기본 MY 이미지
  },
];

const NavIcon = ({ item, isActive }) => {
  // 네비게이션 아이콘 컴포넌트
  const navigate = useNavigate();

  return (
    <S.NavItem onClick={() => navigate(item.path)}>
      {/* 💡 선택 상태($isActive)에 따라 원 크기, 배경, Y축 위치가 변합니다 */}
      <S.IconImg
        src={isActive ? item.activeSrc : item.inactiveSrc}
        alt={item.name}
      />
      <div
        style={{
          color: isActive ? "#6F6AF8" : "black",
          fontSize: "0.8rem",
          fontWeight: "bold",
        }}
      >
        {item.name}
      </div>
    </S.NavItem>
  );
};

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
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
    </>
  );
};

export default NavigationBar;
