import "../styles/Home.css"; // 홈의 스타일 가져오기
import Header from "../components/Header"; // 헤더 컴포넌트 가져오기
import { getMonthWeek } from "../function/getMonthWeek";
import React, { useState, useEffect } from "react"; //
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight, Pencil, Share2 } from "lucide-react";
import SettingsModal from "../components/SettingsModal";
import "swiper/css";
import RoutineList from "../components/RoutineList";

// 💡 1. 백엔드 연동 시 사용할 더미 데이터 (임시 데이터)
const DUMMY_GOALS = [
  {
    id: 1,
    title: "신체 건강",
    subtitle: "Wellness Index",
    score: 78,
    maxScore: 100,
  },
  {
    id: 2,
    title: "수면 패턴",
    subtitle: "Sleep Quality",
    score: 85,
    maxScore: 100,
  },
  {
    id: 3,
    title: "영양 균형",
    subtitle: "Nutrition Index",
    score: 60,
    maxScore: 100,
  },
];

export default function Home() {
  const [goals, setGoals] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); // 설정모달 오픈 상태

  // 💡 백엔드 연동 예시 코드 (현재는 더미데이터 바인딩)
  useEffect(() => {
    /* [백엔드 연동 코드 예시]
    axios.get('/api/v1/user/goals')
      .then(res => setGoals(res.data))
      .catch(err => console.error(err));
    */
    setGoals(DUMMY_GOALS);
  }, []);

  return (
    <>
      <div className="wrapper">
        <Header onOpenSettings={() => setIsSettingsOpen(true)} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></div>
        <div className="weekbox">
          <img
            src="today.svg"
            alt="달력"
          />
          <span>{getMonthWeek()} </span>
        </div>
        <div className="nowbar">
          <div className="nowbox">NOW</div>
          <h2>나이트 근무 중 식사후 3시간 경과</h2>
        </div>

        {/* ----------------------슬라이더 와 원형 그래프 76~ 173 --------------------- */}
        <div className="goal-slider-wrapper">
          {/* Swiper 컨테이너 */}
          <Swiper
            modules={[Navigation]}
            spaceBetween={0}
            slidesPerView={1}
            navigation={{
              prevEl: ".custom-swiper-prev",
              nextEl: ".custom-swiper-next",
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            className="goal-swiper"
          >
            {goals.map((item, index) => {
              // 달성률 계산 및 SVG strokeDashoffset 계산
              const radius = 90;
              const circumference = 2 * Math.PI * radius; // 원둘레 (약 565.48)
              const percentage = item.score / item.maxScore;
              const strokeDashoffset = circumference * (1 - percentage);

              // 현재 활성화된 슬라이드인지 확인 (애니메이션 재실행용)
              const isActive = activeIndex === index;

              return (
                <SwiperSlide key={item.id}>
                  <div className="circle-card">
                    {/* 💡 원그래프 (SVG) */}
                    <div className="circle-chart-container">
                      <svg
                        className="circle-chart"
                        viewBox="0 0 220 220"
                      >
                        {/* 배경 원 (연한 보라색 트랙) */}
                        <circle
                          className="circle-bg"
                          cx="110"
                          cy="110"
                          r={radius}
                        />
                        {/* 달성률 원 (색상이 차오르는 게이지) */}
                        <circle
                          className={`circle-progress ${isActive ? "animate" : ""}`}
                          cx="110"
                          cy="110"
                          r={radius}
                          strokeDasharray={circumference}
                          style={{
                            strokeDashoffset: isActive
                              ? strokeDashoffset
                              : circumference,
                          }}
                        />
                      </svg>

                      {/* 원 중앙 텍스트 정보 */}
                      <div className="circle-content">
                        <span className="goal-title">{item.title}</span>
                        <span className="goal-subtitle">{item.subtitle}</span>
                        <span className="goal-score">{item.score}</span>
                        <span className="goal-max-score">
                          / {item.maxScore}
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* 💡 커스텀 커서/화살표 버튼 (좌/우) */}
          <button
            className="custom-swiper-prev"
            aria-label="이전"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className="custom-swiper-next"
            aria-label="다음"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        {/* 💡 편집 / 공유 버튼 */}
        <div className="action-button-group">
          <button className="action-btn">
            <Pencil size={15} />
            <span>편집</span>
          </button>
          <button className="action-btn">
            <Share2 size={15} />
            <span>공유</span>
          </button>
        </div>

        {/* ----------------------설정 모달--------------------- */}
        <SettingsModal
          isOpen={isSettingsOpen} // 모달 열기 값 true/false 전달
          onClose={() => setIsSettingsOpen(false)} // 모달 닫기
        />

        {/* ----------------------루틴 리스트--------------------- */}
        <RoutineList />
      </div>
    </>
  );
}
