import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AIResult.css";

// 이미지 import (경로는 실제 폴더 구조에 맞게 수정해주세요)
import calendarIcon from "../images/today.svg";
import userIcon from "../images/person.svg";
import cupIcon from "../images/Coffee.svg";

export default function AIResult() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("1주차");
  
  // 아코디언 토글 상태 (그룹별로 열리고 닫히는 상태 관리)
  const [openSections, setOpenSections] = useState({
    "출근 전 케어": true,
    "퇴근 후 수면 골든타임": false,
    "근무 중 식사 및 영양": false,
  });

  const toggleSection = (situationTitle) => {
    setOpenSections((prev) => ({ 
      ...prev, 
      [situationTitle]: !prev[situationTitle] 
    }));
  };

  // 주차별 가상 더미 데이터 (주차마다 다른 브리핑과 루틴을 보여줍니다!)
  const dummyRoutineData = {
    "1주차": {
      weeklyBriefing: "이번 달 1주차는 주간 근무 위주로, 가벼운 스트레칭과 수분 섭취를 통한 컨디션 예열이 중심입니다.",
      groups: [
        {
          situation: "출근 전 케어",
          count: 2,
          routines: [
            { routineName: "10분 목과 어깨 스트레칭", cycle: "주 3회", suggestedTime: "출근 30분 전" },
            { routineName: "따뜻한 물 150ml 마시기", cycle: "매일", suggestedTime: "출근 직전" }
          ]
        },
        {
          situation: "근무 중 식사 및 영양",
          count: 1,
          routines: [
            { routineName: "비타민 한 포 섭취", cycle: "매일", suggestedTime: "점심 식사 직후" }
          ]
        }
      ]
    },
    "2주차": {
      weeklyBriefing: "2주차부터 야간(N) 근무가 시작됩니다. 생체 리듬 유지를 위한 수면 환경 조성과 부종 완화가 핵심입니다.",
      groups: [
        {
          situation: "퇴근 후 수면 골든타임",
          count: 2,
          routines: [
            { routineName: "반신욕 30분", cycle: "매일", suggestedTime: "취침 1시간 전" },
            { routineName: "블루라이트 차단 암막 커튼 치기", cycle: "매일", suggestedTime: "취침 30분 전" }
          ]
        },
        {
          situation: "출근 전 케어",
          count: 1,
          routines: [
            { routineName: "가벼운 유산소 스트레칭", cycle: "주 2회", suggestedTime: "기상 직후" }
          ]
        }
      ]
    },
    "3주차": {
      weeklyBriefing: "야간 근무 피로가 누적되는 3주차입니다. 카페인 섭취를 조절하고 심신 안정을 위한 이완 루틴이 적용됩니다.",
      groups: [
        {
          situation: "퇴근 후 수면 골든타임",
          count: 2,
          routines: [
            { routineName: "캐모마일 티 한 잔", cycle: "매일", suggestedTime: "취침 전" },
            { routineName: "종아리 마사지 링 활용", cycle: "매일", suggestedTime: "취침 직전" }
          ]
        }
      ]
    },
    "4주차": {
      weeklyBriefing: "다시 주간 근무로 돌아오는 구간입니다. 흐트러진 생체 시계를 원래대로 되돌리는 주간 적응 루틴입니다.",
      groups: [
        {
          situation: "출근 전 케어",
          count: 2,
          routines: [
            { routineName: "아침 햇볕 10분 쬐기", cycle: "매일", suggestedTime: "기상 직후" },
            { routineName: "단백질 중심 가벼운 아침 식사", cycle: "매일", suggestedTime: "출근 1시간 전" }
          ]
        }
      ]
    }
  };

  // 현재 선택된 탭의 더미 데이터 가져오기
  const currentData = dummyRoutineData[activeTab];

  return (
    <div className="ai-result-wrapper">
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
            <span className="highlight">{activeTab} • 맞춤형 구간</span>
            <span>주간 • 야간 비중</span>
          </div>
        </div>
      </div>

      {/* 주차별 탭 버튼 */}
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

      <div style={{ display: "flex", alignItems: "center", marginBottom: "16px", gap: "8px" }}>
        <img src={calendarIcon} alt="달력" style={{ width: "20px" }} />
        <h3 className="section-title">{activeTab} 웰니스 루틴</h3>
      </div>

      {/* ---------------------------------------------------- */}
      {/* [나중에 백엔드 연동할 때 참고할 영역 주석] */}
      {/* 
        const [routineData, setRoutineData] = useState(null);
        // useEffect 안에서 scheduleApi.getRoutineSuggestion() 호출하여 
        // routineData에 넣고 아래 groups를 map 돌리면 됩니다!
      */}
      {/* ---------------------------------------------------- */}

      {/* 더미 데이터 기반 아코디언 리스트 렌더링 */}
      {currentData.groups.map((group) => {
        const isOpen = openSections[group.situation] || false;
        return (
          <div className="section-container" key={group.situation}>
            <div
              className="section-header"
              onClick={() => toggleSection(group.situation)}
            >
              <span className="section-title">{group.situation} ({group.count})</span>
              <span className="toggle-badge">
                {isOpen ? "접기" : "펼치기"}
              </span>
            </div>

            {isOpen && (
              <div className="item-list">
                {group.routines.map((routine, idx) => (
                  <div className="item-card" key={idx}>
                    <img 
                      src={group.situation.includes("출근") ? userIcon : cupIcon} 
                      className="item-icon" 
                      alt="아이콘" 
                    />
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: "bold" }}>
                        {routine.routineName}
                      </div>
                      <div style={{ fontSize: "11px", color: "#888" }}>
                        • {routine.cycle} / {routine.suggestedTime}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      <button className="apply-btn" onClick={() => navigate("/home")}>
        이대로 적용하기
      </button>
    </div>
  );
}