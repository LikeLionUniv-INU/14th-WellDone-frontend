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
  const [openSections, setOpenSections] = useState({ "출근 전 케어": true });

  const toggleSection = (title) =>
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));

  return (
    <div className="ai-result-wrapper">
      <div className="header-row">
        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          &lt;
        </button>
        <h2 className="title-text">스케줄 기반 AI 루틴 형성</h2>
      </div>

      <div className="briefing-box">
        <p className="briefing-text">
          <span className="highlight">OO님</span>의{" "}
          <span className="highlight">한 달 스케줄</span>을 분석하여
          <br />
          <span className="highlight">주차별 맞춤 웰니스 루틴</span>을
          완성했어요!
        </p>
        <div className="inner-briefing">
          <h4>AI 월간 바이오 브리핑</h4>
          <p className="briefing-content">
            이번 달은 2, 3주차에 야간(N) 근무가 집중되어 있어요. 수면 케어와
            부종 완화 위주로 자동 설계되었습니다.
          </p>
          <div className="briefing-footer">
            <span className="highlight">1주차 • D-N 혼합</span>
            <span>주간 • 야간 비중</span>
          </div>
        </div>
      </div>

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

      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "16px",
          gap: "8px",
        }}
      >
        <img
          src={calendarIcon}
          alt="달력"
          style={{ width: "20px" }}
        />
        <h3 className="section-title">1주차 웰니스 루틴 (D-N 혼합 구간)</h3>
      </div>

      <div className="section-container">
        <div
          className="section-header"
          onClick={() => toggleSection("출근 전 케어")}
        >
          <span className="section-title">출근 전 케어 (3)</span>
          <span className="toggle-badge">
            {openSections["출근 전 케어"] ? "접기" : "펼치기"}
          </span>
        </div>

        {openSections["출근 전 케어"] && (
          <div className="item-list">
            <div className="item-card">
              <img
                src={userIcon}
                className="item-icon"
                alt="스트레칭"
              />
              <div>
                <div style={{ fontSize: "13px", fontWeight: "bold" }}>
                  10분 목과 어깨 스트레칭
                </div>
                <div style={{ fontSize: "11px", color: "#888" }}>
                  • 주 3회 / 출근 30분 전
                </div>
              </div>
            </div>
            <div className="item-card">
              <img
                src={cupIcon}
                className="item-icon"
                alt="물"
              />
              <div>
                <div style={{ fontSize: "13px", fontWeight: "bold" }}>
                  따뜻한 물 150ml
                </div>
                <div style={{ fontSize: "11px", color: "#888" }}>
                  • 매일 / 출근 직전
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        className="apply-btn"
        onClick={() => navigate("/home")}
      >
        이대로 적용하기
      </button>
    </div>
  );
}
