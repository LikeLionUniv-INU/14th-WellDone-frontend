import "../styles/Home.css"; // 홈의 스타일 가져오기
import Header from "../components/Header"; // 헤더 컴포넌트 가져오기
import { getMonthWeek } from "../function/getMonthWeek";
import React, { useState, useEffect } from "react"; //
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight, Pencil, Share2 } from "lucide-react";
import SettingsModal from "../components/SettingsModal";
import "swiper/css";
import RoutineItem from "../components/RoutineItem";
import { Loutine, Condition , Wellness} from "../api/home";
import CurrentRoutine from "../components/CurrentRoutine";
import { getCurrentRoutine } from "../api/routineApi";


const DUMMY_RESPONSE = {
  isSuccess: true,
  code: "COMMON_200",
  message: "요청에 성공했습니다.",
  result: {
    areas: [
      { areaName: "신체 건강", score: 78, achievementRate: 78 },
      { areaName: "정서 안정", score: 65, achievementRate: 65 },
      { areaName: "수면 패턴", score: 82, achievementRate: 82 },
      { areaName: "영양 균형", score: 90, achievementRate: 90 },
    ],
  },
};


export default function Home() {
  const [goals, setGoals] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); // 설정모달 오픈 상태
  const [condition, setCondition]  = useState([]);
  const [currentRoutineData, setCurrentRoutineData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasRoutine, setHasRoutine] = useState(true);

  

  const [routines, setRoutines] = useState([]); //루틴 데이터

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const data = await Loutine();
        if (data.isSuccess) {
          setRoutines(data.result.items);
        }
      } catch (error) {
        console.error("오늘의 루틴을 불러오는데 실패했습니다.", error);
      }
    };

    fetchRoutines();

  }, []);

  // 💡 백엔드 연동 예시 코드 (현재는 더미데이터 바인딩)
  useEffect(() => {

    
    const fetchGoals = async () => {
      try {
        const response = await Wellness();

        if (response?.isSuccess && response?.result?.areas) {
          // 백엔드 result.areas 배열 저장
          setGoals(response.result.areas);
        }
      } catch (error) {
        console.error("영역별 점수 조회 실패:", error);
      }
    };

    fetchGoals(); 

 
  }, []);


  

  useEffect(() => { // 현재 상태 받아오기

    const fetchCondition= async () => {
      try {
        const data = await Condition();
        if (data.isSuccess) {
          setCondition(data.result);
        }
      } catch (error) {
        console.error( "현재 상태를 불러오는데 실패했습니다.", error);
      }
    };

    fetchCondition();

    
   
  }, []);
// 17. 현재 루틴 조회 함수

  const fetchCurrentRoutine = async () => {
    try {
      
      setLoading(true);

      
      const res = await getCurrentRoutine(); 
      if (res?.isSuccess && res.result) {
        setCurrentRoutineData(res.result);
        setHasRoutine(true);
      } else {
        setHasRoutine(false);
      }
    } catch (error) {
      // 404 (HOME_404_1: 현재 수행할 루틴이 없습니다.) 처리
      if (error.response?.status === 404) {
        setHasRoutine(false);
      }
      console.error("현재 루틴 조회 실패:", error);
     
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentRoutine();
  }, []);

 

  return (
    <>
      <div className="wrapper">
        <Header onOpenSettings={() => setIsSettingsOpen(true)} />
        <div className=" array">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></div>
          <div className="weekbox">
            <img
              style={{ width: "23px" }}
              src="today.svg"
              alt="달력"
            />
            <span>{getMonthWeek()} </span>
          </div>
          <div className="nowbar">
            <div className="nowbox">
              <span className="text">NOW</span>
            </div>
            <h2>{condition.statusMessage}</h2>
          </div>
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
              const maxScore = 100; // 100점으로 고정
              const radius = 90;
              const circumference = 2 * Math.PI * radius; // 원둘레 (약 565.48)
              const percentage = item.score / maxScore;
              const strokeDashoffset = circumference * (1 - percentage);

              // 현재 활성화된 슬라이드인지 확인 (애니메이션 재실행용)
              const isActive = activeIndex === index;

              return (
                <SwiperSlide key={item.areaName || index}>
                  <div className="circle-card">
                    {/* 💡 원그래프 (SVG) */}
                    <div className="circle-chart-container">
                      <svg
                        className="circle-chart"
                        viewBox="0 0 220 220"
                      >
                        <defs>
                          {/* x1, y1, x2, y2로 그라데이션 방향 지정 (90deg = 왼쪽에서 오른쪽) */}
                          <linearGradient
                            id= "purpleGradient"
                            x1="100%"
                            y1="100%"
                            x2="0%"
                            y2="0%"
                          >
                            <stop
                              offset="40%"
                              stopColor="#7b61ff"
                            />
                            <stop
                              offset="60%"
                              stopColor="#767bf6"
                            />
                            <stop
                              offset="100%"
                              stopColor="#c2d0ff"
                            />
                          </linearGradient>
                        </defs>
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
                        <span className="goal-title">{item.areaName}</span>
                        
                        <span className="goal-score">{item.score}</span>
                        <span className="goal-max-score">
                          / {maxScore}
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



{/* ----------------------현재 할일--------------------- */}
        <div style={{ width: "87%", margin: "0 auto", paddingTop: "16px" }}>
      
      {hasRoutine && currentRoutineData ? (
        <CurrentRoutine
          routineData={currentRoutineData}
          onStatusChange={fetchCurrentRoutine} // 완료/사진인증 후 새 목표 받아오기
        />
      ) : (
        <div
          style={{
            padding: "24px",
            textAlign: "center",
            backgroundColor: "#f5f5f5",
            borderRadius: "16px",
            color: "#666",
          }}
        >
          현재 수행할 루틴이 없습니다.
        </div>
      )}
    </div>


        {/* ----------------------루틴 리스트--------------------- */}
        <div className="array">

        <div className="loutin-title" >오늘의 루틴 <img style={{height: "1rem"}} src="alert.svg"/> </div>
</div>
        <div className="today-routine-box">
          <div className="routine-list-wrapper">
            {routines.map((item, index) => (
              <RoutineItem
                key={index}
                time={item.time}
                title={item.title}
                duration = {item.duration}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
