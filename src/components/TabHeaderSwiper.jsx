import React, { useState, useRef ,useEffect} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import "swiper/css"; // Swiper 필수 스타일
import * as S from "../styles/TabHeaderSwiper.styles";
import RoutineCard from "./RoutineCard"; // 주간 웰니스 루틴 수행  컴포넌트
import BoosterCard from "./BoosterCard"; // 지난 달 리포트 1번째 박스
import RoutineSummaryCard from "./RoutineSummaryCard"; // 2번째 박스
import GoldenTimeCard from "./GoldenTimeCard"; // 3번째 박스
import NextMonthCard from "./NextMonthCard"; // 4번째 박스
import { PageWrapper } from "../styles/TabHeaderSwiper.styles";
import {
  getWeekly,
  getMonthly,
  getSummary,
  getGoldenTime,
  getNextMonth,
} from "../api/mypg";


// 탭 목록 데이터
const TABS = ["주간 기록", "지난 달 리포트"];

const CATEGORY_COLORS = ["#9DC8FF", "#C68BDB", "#A796FF", "#FFB7B2"];
/*
const MOCK_ROUTINE_DATA = {
  isSuccess: true,
  code: "COMMON_200",
  message: "요청에 성공했습니다.",
  result: {
    routines: [
      {
        routineName: "따뜻한 물 150ml",
        cycle: "매일",
        checks: [true, true, true, true, false, false, false],
      },
      {
        routineName: "반신욕 30분",
        cycle: "매일",
        checks: [true, true, true, true, false, false, false],
      },
      {
        routineName: "림프관 마사지",
        cycle: "매일",
        checks: [true, true, true, true, false, false, false],
      },
      {
        routineName: "하체부종 스트레칭",
        cycle: "매일",
        checks: [true, true, true, true, false, false, false],
      },
    ],
  },
};

// 📌 [참고 3] 백엔드 응답을 모방한 더미 데이터
const MOCK_REPORT_DATA = {
  reportMonth: "6월",
  booster: {
    days: 25,
    rate: 82,
    subText: "높은 달성률로\n루틴 전반을 수행했어요.",
  },
  // 📌 [참고 6] 만약 영역이 1개나 2개여도 막대가 가로를 자동으로 균등 분배합니다.
  routineCategories: [
    { name: "신체", rate: 75, color: "#9DC8FF" },
    { name: "피부", rate: 45, color: "#C68BDB" },
  
  ],
  bestCategory: "정서 웰니스",
  worstCategory: "환경 웰니스 (30%)",
  goldenTimeRate: 82,
  nextMonthPoint: {
    subTitle: "다음 달 회복 포인트",
    title: "7월 2주차 야간근무",
    description:
      "야간 근무가 이어지는 기간이에요.\n회복 부담을 줄인 루틴을 추천해드릴게요.",
  },
};
*/
export default function TabHeaderSwiper() {
  // 현재 선택된 탭 인덱스 (기본값: 1번 '주간')
  const [activeIndex, setActiveIndex] = useState(1);
  
  // Swiper 인스턴스를 제어하기 위한 ref
  const swiperRef = useRef(null);

  // 백엔드 데이터 상태
  const [weeklyRoutines, setWeeklyRoutines] = useState([]);
  const [monthlyData, setMonthlyData] = useState(null);
  const [summaryData, setSummaryData] = useState(null);
  const [goldenTimeData, setGoldenTimeData] = useState(null);
  const [nextMonthData, setNextMonthData] = useState(null);
  const [loading, setLoading] = useState(true);

// 데이터 로딩
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);

      // 1. 주간 데이터 조회
      try {
        const weeklyRes = await getWeekly();
        if (weeklyRes?.isSuccess) {
          setWeeklyRoutines(weeklyRes.result?.routines || []);
        }
      } catch (err) {
        console.error("주간 기록 조회 실패:", err);
      }

      // 2. 리포트 4개 API 병렬 조회 (개별 에러 핸들링으로 하나가 404여도 나머지는 정상 출력)
      await Promise.all([
        getMonthly()
          .then((res) => res?.isSuccess && setMonthlyData(res.result))
          .catch((err) => console.log("월간 리포트 없음(404) 또는 에러:", err)),

        getSummary()
          .then((res) => res?.isSuccess && setSummaryData(res.result))
          .catch((err) => console.log("카테고리 요약 없음(404) 또는 에러:", err)),

        getGoldenTime()
          .then((res) => res?.isSuccess && setGoldenTimeData(res.result))
          .catch((err) => console.log("골든타임 없음(404) 또는 에러:", err)),

        getNextMonth()
          .then((res) => res?.isSuccess && setNextMonthData(res.result))
          .catch((err) => console.log("다음달 회복포인트 없음(404) 또는 에러:", err)),
      ]);

      setLoading(false);
    };

    fetchAllData();
  }, []);



  // 💡 버튼을 터치/클릭했을 때 스와이퍼 슬라이드를 직접 이동시키는 함수
  const handleTabClick = (index) => {
    setActiveIndex(index);
    if (swiperRef.current) {
      swiperRef.current.slideTo(index); // Swiper 메소드로 해당 페이지로 쓱 이동
    }
  };

// 백엔드 데이터 -> 컴포넌트 Props 규격으로 변환
  const formattedCategories =
    summaryData?.categories?.map((cat, idx) => ({
      name: cat.name,
      rate: cat.achievementRate,
      color: CATEGORY_COLORS[idx % CATEGORY_COLORS.length],
    })) || [];

  const worstText = summaryData?.lowest
    ? `${summaryData.lowest.name} (${summaryData.lowest.achievementRate}%)`
    : null;

  const firstRisk = nextMonthData?.riskPeriods?.[0];



  return (
    <PageWrapper>
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
              <S.ReportTitle>주간 웰니스 루틴 수행 내역</S.ReportTitle>
              {/* 여기에 주간 데이터 리스트 배치 */}
             {weeklyRoutines.length > 0 ? (
                weeklyRoutines.map((routine, index) => (
                  <RoutineCard
                    key={index}
                    routineName={routine.routineName}
                    cycle={routine.cycle}
                    initialChecks={routine.checks}
                  />
                ))
              ) : (
                <div style={{ textAlign: "center", padding: "30px", color: "#888" }}>
                  {loading ? "기록을 불러오는 중..." : "주간 루틴 기록이 없습니다."}
                </div>
              )}
            </S.SlideContentArea>
          </SwiperSlide>

          <SwiperSlide>
            <S.SlideContentArea>
              <S.ReportTitle>{monthlyData?.month ? `${monthlyData.month}월 웰니스 리포트` : "지난 달 웰니스 리포트"}</S.ReportTitle>

              {/* 1. 부스터 모드 일수 컴포넌트 */}
           
              {monthlyData && monthlyData.reportStatus === "DONE" && (
                <BoosterCard
                  days={monthlyData.activeDays}
                  rate={monthlyData.achievementRate}
                  subText={monthlyData.badgeMessage}
                />
              )}

              {/* 2. 루틴 영역별 달성 요약 컴포넌트 */}
             {summaryData && summaryData.reportStatus === "DONE" && (
                <RoutineSummaryCard
                  categories={formattedCategories}
                  bestCategory={summaryData.highest?.name}
                  worstCategory={worstText}
                />
              )}

              {/* 3. 골든 타임 회복률 컴포넌트 */}
              {goldenTimeData && goldenTimeData.reportStatus === "DONE" && (
                <GoldenTimeCard rate={goldenTimeData.recoveryRate} />
              )}


              {/* 4. 다음 달 회복 포인트 컴포넌트 */}
             {nextMonthData && nextMonthData.reportStatus === "DONE" && firstRisk && (
                <NextMonthCard
                  subTitle="다음 달 회복 포인트"
                  title={firstRisk.label}
                  description={`${firstRisk.reason}\n${firstRisk.tip}`}
                />
              )}


{/* 리포트 데이터가 생성 중이거나 아예 없는 경우 */}
              {!monthlyData && !summaryData && !goldenTimeData && !nextMonthData && (
                <div style={{ textAlign: "center", padding: "40px 0", color: "#666" }}>
                  {loading ? "리포트를 불러오는 중..." : "지난 달 기록이 존재하지 않습니다."}
                </div>
              )}


            </S.SlideContentArea>
          </SwiperSlide>
        </Swiper>
      </S.Container>
    </PageWrapper>
  );
}
