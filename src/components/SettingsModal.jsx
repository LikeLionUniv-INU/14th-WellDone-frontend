import React, { useState, useRef, useEffect } from "react";
import {
  Hand,
  Clock,
  Bell,
  MessageSquare,
  User,
  ChevronRight,
} from "lucide-react";
import * as S from "../styles/SettingsModal.styles";

export default function SettingsModal({ isOpen, onClose }) {
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false); // 💡 드래그 중인지 상태 추가
  const touchStartY = useRef(0);
  // 💡 처음 등장 키프레임 애니메이션 완료 여부
  const [isAnimateDone, setIsAnimateDone] = useState(false);

  // 💡 모달이 열려있을 때 홈 화면 배경 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setIsAnimateDone(false);
      setDragY(0);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // 💡 밑으로 슬라이드해서 닫는 터치 이벤트 핸들러
  const handleTouchStart = (e) => {
    setIsAnimateDone(true); // 터치하는 순간 키프레임을 끄고 드래그 제어로 전환
    touchStartY.current = e.touches[0].clientY;
    setIsDragging(true); // 💡 드래그 시작
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - touchStartY.current;

    // 아래로 내릴 때만 dragY 값 업데이트 (양수일 때만)
    if (diff > 0) {
      setDragY(diff); // 아래로 드래그한 거리 기록
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false); // 💡 드래그 끝

    if (dragY > 100) {
      // 100px 이상 내렸으면 모달 닫기
      onClose();
    }

    // 원위치로 복귀 (isDragging이 false이므로 부드럽게 복귀함)
    setDragY(0);
  };

  if (!isOpen) return null;

  // 설정 메뉴 더미 목록 데이터
  const menuItems = [
    {
      id: 1,
      icon: <Hand size={22} />,
      title: "PRO UPGRADE",
      subtitle: "광고 제거 및 기능 잠금 해제",
    },
    {
      id: 2,
      icon: <Clock size={22} />,
      title: "스케줄표 업데이트 및 갱신",
      subtitle: "최근 업데이트 : 8월 2일",
    },
    {
      id: 3,
      icon: <Bell size={22} />,
      title: "시스템 알림",
      subtitle: "푸시 알림 설정",
    },
    {
      id: 4,
      icon: <MessageSquare size={22} />,
      title: "도움말",
      subtitle: "자주 묻는 질문과 이용 가이드",
    },
    {
      id: 5,
      icon: <User size={22} />,
      title: "계정 관리",
      subtitle: "회원 정보 및 로그아웃",
    },
  ];

  return (
    // 배경 클릭 시 닫기 (오버레이) 삭제
    <S.Overlay>
      {/* 버블링 방지로 모달 내부 클릭 시에는 닫히지 않음 */}
      <S.ModalContainer
        $isDragging={isDragging} // 💡 드래그 상태를 스타일드 컴포넌트에 전달
        $isAnimateDone={isAnimateDone}
        onAnimationEnd={() => setIsAnimateDone(true)}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ transform: `translateY(${dragY}px)` }}
      >
        {/* 모달 상단 드래그 핸들 바 */}
        <S.DragHandle />

        <S.Title>설정</S.Title>

        {/* 설정 메뉴 목록 */}
        <S.MenuList>
          {menuItems.map((item) => (
            <S.MenuItemButton
              key={item.id}
              onClick={() => {}}
            >
              <S.ItemLeft>
                <S.IconWrapper>{item.icon}</S.IconWrapper>
                <S.TextGroup>
                  <S.ItemTitle>{item.title}</S.ItemTitle>
                  <S.ItemSubtitle>{item.subtitle}</S.ItemSubtitle>
                </S.TextGroup>
              </S.ItemLeft>
              <S.ArrowWrapper>
                <ChevronRight size={18} />
              </S.ArrowWrapper>
            </S.MenuItemButton>
          ))}
        </S.MenuList>
      </S.ModalContainer>
    </S.Overlay>
  );
}
