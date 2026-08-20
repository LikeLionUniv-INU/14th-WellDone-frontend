import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 💡 useNavigate import 추가
import {
  Hand,
  Clock,
  Bell,
  MessageSquare,
  User,
  ChevronRight,
} from "lucide-react"; //  루시드 리엑트 라이브러리 에서 아이콘 가져오기
import * as S from "../styles/SettingsModal.styles";

export default function SettingsModal({ isOpen, onClose }) {
  const navigate = useNavigate(); // 💡 navigate 함수 초기화
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false); // 드래그 중인지 상태 추가
  const touchStartY = useRef(0); // useref로 touchStartY 변수를 만들고 변수에 0 넣기
  const [isAnimateDone, setIsAnimateDone] = useState(false); // 처음 등장 키프레임 애니메이션 완료 여부

  // 모달이 열려있을 때 홈 화면 배경 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // body 태그의/ style을 /바꾸는 css 코드(overflow = hidden)를 써주기
    } else {
      // isopen이 false일때( 모달 창이 닫힌 상황에서)
      setIsAnimateDone(false); // 애니메이션 상태를 초기화하고
      setDragY(0); // 드래그 위치를 초기화한다.
    }
    return () => {
      document.body.style.overflow = "unset"; // isopen이 false가 되는 순간에 화면 스크롤을 허용한다.
    };
  }, [isOpen]);

  //  밑으로 슬라이드해서 닫는 터치 이벤트 핸들러
  const handleTouchStart = (e) => {
    setIsAnimateDone(true); // 터치하는 순간 키프레임을 끄고 드래그 제어로 전환
    touchStartY.current = e.touches[0].clientY; //  터치 시작지점의 y 좌표값을 touchStartY에 저장
    setIsDragging(true); // 드래그 시작
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return; // 드래깅 상태가 아닐 때 함수를 실행하지 않음
    const currentY = e.touches[0].clientY; // currentY에 현재 터치 된 부분의 y 값을 저장
    const diff = currentY - touchStartY.current;

    // 아래로 내릴 때만 dragY 값 업데이트 (양수일 때만)
    if (diff > 0) {
      setDragY(diff); // 아래로 드래그한 거리 기록
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false); //  드래그 끝

    if (dragY > 100) {
      // 100px 이상 내렸으면 모달 닫기
      onClose();
    }

    // 원위치로 복귀 (isDragging이 false이므로 부드럽게 복귀함)
    setDragY(0);
  };

  if (!isOpen) return null; // 모달 열림 isopen이 true가 아니면 창을 아무것도 보내지 않는다(닫는다)

  // 설정 메뉴 더미 목록 데이터
  const menuItems = [
    {
      id: 1,
      icon: <S.Icon src="front_hand.svg" />,
      title: "PRO UPGRADE",
      subtitle: "광고 제거 및 기능 잠금 해제",
    },
    {
      id: 2,
      icon: <S.Icon src="schedule.svg" />,
      title: "스케줄표 업데이트 및 갱신",
      subtitle: "최근 업데이트 : 8월 2일",
      onClick: () => {
        if (onClose) onClose(); // 💡 이동하기 전 모달 창 닫기
        navigate("/routine");   // 💡 /routine 경로로 이동
      },
    },
    {
      id: 3,
      icon: <S.Icon src="notifications.svg" />,
      title: "시스템 알림",
      subtitle: "푸시 알림 설정",
    },
    {
      id: 4,
      icon: <S.Icon src="comment.svg" />,
      title: "도움말",
      subtitle: "자주 묻는 질문과 이용 가이드",
    },
    {
      id: 5,
      icon: <S.Icon src="settings.svg" />,
      title: "계정 관리",
      subtitle: "회원 정보 및 로그아웃",
    },
  ];

  // ---------------메인 함수 리턴문 시작--------------------------

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

        <S.DragHandle></S.DragHandle>

        <S.Title>설정</S.Title>

        {/* 설정 메뉴 목록 */}
        <S.MenuList>
          {menuItems.map((item) => (
            <S.MenuItemButton
              key={item.id}
              onClick={() => {
                if (item.onClick) item.onClick();
              }}
            >
              <S.ItemLeft>
                <S.IconWrapper>{item.icon}</S.IconWrapper>
                <S.TextGroup>
                  <S.ItemTitle>{item.title}</S.ItemTitle>
                  <S.ItemSubtitle>{item.subtitle}</S.ItemSubtitle>
                </S.TextGroup>
              </S.ItemLeft>
              <S.ArrowWrapper>
                <ChevronRight size={22} />
              </S.ArrowWrapper>
            </S.MenuItemButton>
          ))}
        </S.MenuList>
      </S.ModalContainer>
    </S.Overlay>
  );
}
