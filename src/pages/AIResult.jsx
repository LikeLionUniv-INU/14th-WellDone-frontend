import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { scheduleApi } from "../api/scheduleApi";
import "../styles/AIResult.css";

import calendarIcon from "../images/today.svg";
import userIcon from "../images/person.svg";
import cupIcon from "../images/Coffee.svg";

export default function AIResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("1주차");
  const [loading, setLoading] = useState(true);

  // 🔑 1. 라우터 state 또는 localStorage에서 analysisId 안전하게 가져오기
  const [analysisId, setAnalysisId] = useState(() => {
    const stateId = location.state?.analysisId;
    if (stateId) {
      localStorage.setItem("analysisId", stateId);
      return stateId;
    }
    return localStorage.getItem("analysisId") || "";
  });

  const [routineData, setRoutineData] = useState(null);

  // 아코디언 토글 상태
  const [openSections, setOpenSections] = useState({
    "출근 전 케어": true,
    "퇴근 후 수면 골든타임": false,
    "근무 중 식사 및 영양": false,
  });

  const toggleSection = (situationTitle) => {
    setOpenSections((prev) => ({
      ...prev,
      [situationTitle]: !prev[situationTitle],
    }));
  };

  // 2. 서버에서 루틴 추천 결과 데이터 가져오기
  const fetchRoutineSuggestion = async () => {
    try {
      setLoading(true);
      const res = await scheduleApi.getRoutineSuggestion();

      if (res && res.isSuccess) {
        // 서버 응답에 analysisId가 있다면 상태 및 로컬스토리지 갱신
        if (res.result?.analysisId) {
          setAnalysisId(res.result.analysisId);
          localStorage.setItem("analysisId", res.result.analysisId);
        }
        setRoutineData(res.result?.weeklyRoutines || res.result);
      }
    } catch (error) {
      console.error("루틴 제안 조회 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("🆔 현재 확보된 analysisId:", analysisId);
    fetchRoutineSuggestion();
  }, []);

  // 3. 다른 루틴 세트로 재추천 API 연동
  const handleReRecommend = async () => {
    try {
      setLoading(true);
      const res = await scheduleApi.regenerateAIRoutine();
      
      if (res && res.isSuccess) {
        // 재추천 시 새로 발급된 analysisId 반영
        const newId = res.result?.analysisId;
        if (newId) {
          setAnalysisId(newId);
          localStorage.setItem("analysisId", newId);
        }
        alert("AI가 새로운 루틴 세트를 재추천했습니다!");
        await fetchRoutineSuggestion();
      }
    } catch (error) {
      console.error("재추천 요청 실패:", error);
      alert("루틴 재추천 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 4. 루틴 적용 (온보딩 완료) API 연동
  const handleApplyRoutine = async () => {
    const currentId = analysisId || localStorage.getItem("analysisId");
    
    if (!currentId) {
      alert("적용할 분석 ID가 유효하지 않습니다.");
      return;
    }

    try {
      const res = await scheduleApi.applyRoutine(currentId);
      if (res && res.isSuccess) {
        localStorage.removeItem("analysisId"); // 성공 시 정리
        alert("온보딩이 완료되었습니다!");
        navigate("/home");
      }
    } catch (error) {
      console.error("루틴 적용 실패:", error);
      if (error.response?.data?.code === "ONBOARDING_400_7") {
        alert("이미 적용된 루틴입니다.");
        navigate("/home");
      } else {
        alert("루틴 적용 중 오류가 발생했습니다.");
      }
    }
  };

  // 선택된 주차 데이터 가져오기 (데이터 없을 시 세이프가드)
  const currentData = routineData?.[activeTab] || routineData || {
    subTitle: "",
    weeklyBriefing: "루틴 분석 정보를 불러오는 중입니다.",
    groups: [],
  };

  if (loading) {
    return (
      <div className="ai-result-wrapper" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <p>AI가 분석한 맞춤형 루틴을 불러오는 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="ai-result-wrapper">
      {/* 헤더 */}
      <div className="header-row">
        <button className="back-btn" onClick={() => navigate(-1)}>&lt;</button>
        <h2 className="title-text">스케줄 기반 AI 루틴 형성</h2>
      </div>

      {/* 브리핑 박스 */}
      <div className="briefing-box">
        <p className="briefing-text">
          <span className="highlight">회원님</span>의 <span className="highlight">한 달 스케줄</span>을 분석하여<br />
          <span className="highlight">주차별 맞춤 웰니스 루틴</span>을 완성했어요!
        </p>
        <div className="inner-briefing">
          <h4>AI 월간 바이오 브리핑</h4>
          <p className="briefing-content">
            {currentData.weeklyBriefing}
          </p>
          <div className="briefing-footer">
            <span className="highlight">{activeTab} • 맞춤 구간</span>
            <span>주간 • 야간 비중</span>
          </div>
        </div>
      </div>

      {/* 주차 선택 탭 */}
      <div className="week-tabs">
        {["1주차", "2주차", "3주차", "4주차"].map((week) => (
          <button
            key={week}
            className={`tab-btn ${activeTab === week ? "active" : ""}`}
            onClick={() => setActiveTab(week)}
          >
            {week}
          </button>
        ))}
      </div>

      {/* 주차 제목 */}
      <div className="section-title-row">
        <img src={calendarIcon} alt="달력" className="calendar-icon" />
        <h3 className="section-title-main">
          {activeTab} 웰니스 루틴 {currentData.subTitle || ""}
        </h3>
      </div>

      {/* 아코디언 루틴 목록 */}
      <div className="routines-wrapper">
        {currentData.groups && currentData.groups.length > 0 ? (
          currentData.groups.map((group) => {
            const isOpen = openSections[group.situation] || false;
            return (
              <div className="section-container" key={group.situation}>
                <div
                  className="section-header"
                  onClick={() => toggleSection(group.situation)}
                >
                  <div className="header-left">
                    <span className={`chevron ${isOpen ? "down" : "right"}`}>
                      {isOpen ? "⌵" : "›"}
                    </span>
                    <span className="section-title-text">
                      {group.situation} ({group.count || group.routines?.length || 0})
                    </span>
                  </div>
                  {!isOpen && <span className="toggle-badge">펼치기</span>}
                </div>

                {isOpen && (
                  <div className="item-list">
                    {group.routines?.map((routine, idx) => (
                      <div className="item-card" key={idx}>
                        <div className="icon-wrapper">
                          {routine.type === "vitamin" ? (
                            <span className="vitamin-tag">B</span>
                          ) : (
                            <img
                              src={routine.type === "user" ? userIcon : cupIcon}
                              className="item-icon"
                              alt="아이콘"
                            />
                          )}
                        </div>
                        <div className="item-info">
                          <div className="routine-name">{routine.routineName}</div>
                          <div className="routine-sub">
                            • {routine.cycle} / {routine.suggestedTime}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p style={{ textAlign: "center", color: "#888", fontSize: "13px", padding: "20px 0" }}>
            해당 주차에 등록된 루틴이 없습니다.
          </p>
        )}
      </div>

      {/* 구분선 */}
      <div className="divider" />

      {/* 다른 루틴 세트로 재추천 버튼 */}
      <div className="re-recommend-card" onClick={handleReRecommend}>
        <span className="chevron right">›</span>
        <span className="re-recommend-text">다른 루틴 세트로 재추천</span>
      </div>

      {/* 최종 적용하기 버튼 */}
      <button className="apply-btn" onClick={handleApplyRoutine}>
        이대로 적용하기
      </button>
    </div>
  );
}