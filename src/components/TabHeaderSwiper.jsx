import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import "swiper/css"; // Swiper 필수 스타일
import * as S from "../styles/TabHeaderSwiper.styles";

// 탭 목록 데이터
const TABS = ["시간표", "주간", "리포트"];

export default function TabHeaderSwiper() {
  // 현재 선택된 탭 인덱스 (기본값: 1번 '주간')
  const [activeIndex, setActiveIndex] = useState(1);
  
  // Swiper 인스턴스를 제어하기 위한 ref
  const swiperRef = useRef(null);

  // 💡 버튼을 터치/클릭했을 때 스와이퍼 슬라이드를 직접 이동시키는 함수
  const handleTabClick = (index) => {
    setActiveIndex(index);
    if (swiperRef.current) {
      swiperRef.current.slideTo(index); // Swiper 메소드로 해당 페이지로 쓱 이동
    }
  };

  return (
    <S.Container>
      {/* 1. 상단 커스텀 탭 버튼 영역 */}
      <S.TabTrack>
        {TABS.map((tabTitle, index) => {
          const isActive = activeIndex === index;

          return (
            <S.TabButton
              key={tabTitle}
              onClick={() => handleTabClick(index)}
            >
              {/* 💡 layoutId="activeTab": 활성화 상태가 바뀔 때 보라색 상자가 이전 위치에서 현재 위치로 스무스하게 이동함 */}
              {isActive && (
                <S.ActiveHighlight
                  layoutId="activeTabHighlight"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <S.TabText $isActive={isActive}>{tabTitle}</S.TabText>
            </S.TabButton>
          );
        })}
      </S.TabTrack>

      {/* 2. 하단 Swiper 슬라이드 영역 */}
      <Swiper
        initialSlide={1} // 초기 화면: '주간'
        onSwiper={(swiper) => {
          swiperRef.current = swiper; // Swiper 객체를 ref에 저장
        }}
        // 💡 손으로 드래그해서 슬라이드가 변경되었을 때 상단 탭 인덱스 업데이트
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.activeIndex);
        }}
        style={{ width: "100%" }}
      >
        <SwiperSlide>
          <S.SlideContentArea>
            <h3>📅 시간표 화면</h3>
          </S.SlideContentArea>
        </SwiperSlide>

        <SwiperSlide>
          <S.SlideContentArea>
            <h3>📊 주간 웰니스 루틴 수행 내역</h3>
            {/* 여기에 주간 데이터 리스트 배치 */}
          </S.SlideContentArea>
        </SwiperSlide>

        <SwiperSlide>
          <S.SlideContentArea>
            <h3>📈 리포트 화면</h3>
          </S.SlideContentArea>
        </SwiperSlide>
      </Swiper>
    </S.Container>
  );
}