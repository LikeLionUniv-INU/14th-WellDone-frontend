import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import "../styles/AIRoutine.css";

import ScheduleModal from "../components/ScheduleModal";

// 모든 아이콘 상단 import
import upload_cloud from "../images/Upload_cloud.svg";
import physicalIcon from "../images/Physical.svg";
import emotionalIcon from "../images/Emotional.svg";
import nutritionalIcon from "../images/Nutritional.svg";
import aestheticIcon from "../images/Aesthetic.svg";
import environmentalIcon from "../images/Environmental.svg";
import spritualIcon from "../images/Spritual.svg";
import logoColored from "../images/logo_colored.svg";
import smalllogo from "../images/welldone_colored.svg";

export default function AIRoutine() {
  const scheduleCaptureRef = useRef(null);
  const monthlyCaptureRef = useRef(null);
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);

  // --- STEP 1 상태 (드롭박스 상태 삭제됨) ---
  const [previewImage, setPreviewImage] = useState(null);
  const galleryRef = useRef(null);
  const cameraRef = useRef(null);

  // --- STEP 2 상태 ---
  const [selectedCategories, setSelectedCategories] = useState(["신체적 건강"]);

  // --- STEP 3 상태 ---
  const [fatigueFactors, setFatigueFactors] = useState([]); // 지치게 하는 순간
  const [recoveryPrefs, setRecoveryPrefs] = useState([]); // 피로 회복 방식
  const [requestText, setRequestText] = useState(""); // 요청사항 (선택)

  // --- STEP 4 상태 ---
  const [userName] = useState("홍길동");

  // --- STEP 5 상태 (주간 직접 입력) ---
  const [schedules, setSchedules] = useState([]); // 등록된 일정 목록
  const days = ["월", "화", "수", "목", "금", "토", "일"];
  const hours = [7, 8, 9, 10, 11, 12, 13, 14];

  // --- 모달 제어 상태 통합 (modalType: 'weekly' | 'monthly' | null) ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  //--- STEP 6 & 7 관련 상태 ---
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 1)); // Month는 0부터 시작 (4 = 5월)
  const [shiftData, setShiftData] = useState({}); // 교대 근무 데이터 { '2026-05-01': 'D', ... }
  const [memoData, setMemoData] = useState({}); // 메모 데이터 { '2026-05-01': '메모내용', ... }

  const [selectedDateForAction, setSelectedDateForAction] = useState(null); // 선택된 날짜
  const [inputDate, setInputDate] = useState(""); // STEP 7에서 편집할 날짜
  const [selectedShiftType, setSelectedShiftType] = useState("D"); // STEP 7 근무 유형 선택 (D, E, N, O)
  const [inputMemo, setInputMemo] = useState(""); // STEP 7 메모 입력

  // 월 이동 함수
  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };
  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  // 달력 날짜 계산 함수 (월요일 시작 기준)
  const getCalendarRows = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    let firstDay = new Date(year, month, 1).getDay();
    firstDay = firstDay === 0 ? 7 : firstDay;

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const cells = [];

    // 1. 이전 달 날짜 채우기
    for (let i = firstDay - 1; i > 0; i--) {
      const prevM = month === 0 ? 12 : month;
      const prevY = month === 0 ? year - 1 : year;
      cells.push({
        day: daysInPrevMonth - i + 1,
        isCurrentMonth: false,
        dateStr: `${prevY}-${String(prevM).padStart(2, "0")}-${String(daysInPrevMonth - i + 1).padStart(2, "0")}`,
      });
    }

    // 2. 이번 달 날짜 채우기
    for (let i = 1; i <= daysInMonth; i++) {
      cells.push({
        day: i,
        isCurrentMonth: true,
        dateStr: `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`,
      });
    }

    // 3. 다음 달 날짜 채우기
    const totalCells = cells.length > 35 ? 42 : 35;
    const remaining = totalCells - cells.length;
    for (let i = 1; i <= remaining; i++) {
      const nextM = month === 11 ? 1 : month + 2;
      const nextY = month === 11 ? year + 1 : year;
      cells.push({
        day: i,
        isCurrentMonth: false,
        dateStr: `${nextY}-${String(nextM).padStart(2, "0")}-${String(i).padStart(2, "0")}`,
      });
    }

    const rows = [];
    for (let i = 0; i < cells.length; i += 7) {
      rows.push(cells.slice(i, i + 7));
    }
    return rows;
  };

  const calendarRows = getCalendarRows();

  // 기존 주간 스케줄과 시간 겹침 처리
  const handleAddSchedule = (newSchedule) => {
    setSchedules((prev) => {
      const filtered = prev.filter((s) => {
        if (s.day !== newSchedule.day) return true;
        const isOverlapping = !(
          newSchedule.endHour <= s.startHour ||
          newSchedule.startHour >= s.endHour
        );
        return !isOverlapping;
      });
      return [...filtered, newSchedule];
    });
  };

  // --- STEP 1 핸들러 ---
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  // --- STEP 2 핸들러 ---
  const handleCategoryClick = (categoryName) => {
    if (selectedCategories.includes(categoryName)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== categoryName)
      );
    } else {
      if (selectedCategories.length >= 3) {
        setSelectedCategories([...selectedCategories.slice(1), categoryName]);
      } else {
        setSelectedCategories([...selectedCategories, categoryName]);
      }
    }
  };

  // --- STEP 3 핸들러 ---
  const toggleFatigueFactor = (factor) => {
    if (fatigueFactors.includes(factor)) {
      setFatigueFactors(fatigueFactors.filter((item) => item !== factor));
    } else {
      if (fatigueFactors.length >= 3) {
        setFatigueFactors([...fatigueFactors.slice(1), factor]);
      } else {
        setFatigueFactors([...fatigueFactors, factor]);
      }
    }
  };

  const toggleRecoveryPref = (pref) => {
    if (recoveryPrefs.includes(pref)) {
      setRecoveryPrefs(recoveryPrefs.filter((item) => item !== pref));
    } else {
      if (recoveryPrefs.length >= 3) {
        setRecoveryPrefs([...recoveryPrefs.slice(1), pref]);
      } else {
        setRecoveryPrefs([...recoveryPrefs, pref]);
      }
    }
  };

  // --- STEP 4 핸들러 ---
  useEffect(() => {
    if (currentStep === 4) {
      const timer = setTimeout(() => {
        navigate("/result");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, navigate]);

  // ===== STEP 5 화면 이미지 저장 ======
  const handleSaveImage = async () => {
    if (!scheduleCaptureRef.current) return;
    try {
      const canvas = await html2canvas(scheduleCaptureRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "weekly-schedule.png";
      link.click();
    } catch (error) {
      console.error("이미지 저장 중 오류 발생:", error);
      alert("이미지 저장에 실패했습니다.");
    }
  };

  // ===== STEP 6 화면 이미지 저장 및 스텝 1에 자동등록 ======
  const handleSaveAndRegister = async () => {
    if (!monthlyCaptureRef.current) return;
    try {
      const canvas = await html2canvas(monthlyCaptureRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });
      const image = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = image;
      link.download = "monthly-schedule.png";
      link.click();

      setPreviewImage(image);
      alert(
        "스케줄 표가 갤러리에 저장되었으며, 스케줄표 업로드 화면에 자동으로 등록되었습니다!"
      );
    } catch (error) {
      console.error("이미지 캡처 및 등록 중 오류 발생:", error);
      alert("이미지 처리에 실패했습니다.");
    }
  };

  // STEP 7 진입 시 선택된 날짜의 기존 데이터 연동
  useEffect(() => {
    if (currentStep === 7 && selectedDateForAction) {
      setInputDate(selectedDateForAction);
      setSelectedShiftType(shiftData[selectedDateForAction] || "D");
      setInputMemo(memoData[selectedDateForAction] || "");
    }
  }, [currentStep, selectedDateForAction]);

  // STEP 7 저장 처리 함수
  const handleSaveStep7 = () => {
    if (!inputDate) {
      alert("날짜를 선택해 주세요!");
      return;
    }

    setShiftData((prev) => ({
      ...prev,
      [inputDate]: selectedShiftType,
    }));

    if (inputMemo.trim() !== "") {
      setMemoData((prev) => ({
        ...prev,
        [inputDate]: inputMemo,
      }));
    } else {
      setMemoData((prev) => {
        const copy = { ...prev };
        delete copy[inputDate];
        return copy;
      });
    }

    setCurrentStep(6); // 저장 후 다시 월간 달력(STEP 6)으로 이동
  };

  return (
    <>
      {/* 주간 스케줄 전용 모달 */}
      {isModalOpen && modalType === "weekly" && (
        <ScheduleModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setModalType(null);
          }}
          onAddSchedule={handleAddSchedule}
        />
      )}

      <div className="airoutine-container">
        {/* ==================== STEP 1 ==================== */}
        {currentStep === 1 && (
          <div className="step-wrapper fade-in">
            <div className="progress-header">
              <div className="progress-bar-bg">
                <div
                  className="progress-bar-fill"
                  style={{ width: "25%" }}
                ></div>
              </div>
              <span className="progress-text">1 / 4</span>
            </div>

            <div className="step-titles">
              <span className="step-indicator">STEP 1</span>
              <h2>스케줄표 업로드</h2>
              <p>
                근무 일정을 올려주시면
                <br />
                AI가 최적의 회복 루틴을 설계해드려요
              </p>
            </div>

            <div
              className="upload-box"
              onClick={() => galleryRef.current.click()}
            >
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="스케줄표 미리보기"
                  className="preview-image"
                />
              ) : (
                <div className="upload-content">
                  <img
                    className="upload-icon"
                    src={upload_cloud}
                    alt="업로드 아이콘"
                  />
                  <p className="upload-main-text">이미지 등록</p>
                  <p className="upload-sub-text">이미지 파일 (PNG, JPG)</p>
                </div>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              ref={galleryRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <input
              type="file"
              accept="image/*"
              capture="environment"
              ref={cameraRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
            />

            <div className="sub-action-buttons">
              <button
                className="sub-btn"
                onClick={() => cameraRef.current.click()}
              >
                사진 촬영
              </button>
              <button
                className="sub-btn"
                onClick={() => galleryRef.current.click()}
              >
                갤러리
              </button>
              <button
                className="sub-btn highlight-sub"
                onClick={() => setCurrentStep(5)}
              >
                스케줄표 제작
              </button>
            </div>

            <div className="bottom-nav-buttons">
              <button
                className="nav-btn cancel-btn"
                onClick={() => {
                  navigate("/home");
                }}
              >
                취소
              </button>
              <button
                className="nav-btn next-btn"
                onClick={() => setCurrentStep(2)}
              >
                다음 단계
              </button>
            </div>
          </div>
        )}

        {/* ==================== STEP 2 ==================== */}
        {currentStep === 2 && (
          <div className="step-wrapper fade-in">
            <div className="progress-header">
              <div className="progress-bar-bg">
                <div
                  className="progress-bar-fill"
                  style={{ width: "50%" }}
                ></div>
              </div>
              <span className="progress-text">2 / 4</span>
            </div>

            <div className="step-titles">
              <span className="step-indicator">STEP 2</span>
              <h2>웰니스 카테고리 선택</h2>
              <p>
                내 일상에 영향을 주는 주요 요소를
                <br />
                1~3개 선택하면 더 정확한 루틴이 됩니다.
              </p>
            </div>

            <div className="wellness-grid">
              {[
                { title: "신체적 건강", sub: "Physical", icon: physicalIcon },
                { title: "피부 관리", sub: "Emotional", icon: emotionalIcon },
                {
                  title: "영양적 균형",
                  sub: "Nutritional",
                  icon: nutritionalIcon,
                },
                { title: "정서적 안정", sub: "Aesthetic", icon: aestheticIcon },
                {
                  title: "편안한 환경",
                  sub: "Environmental",
                  icon: environmentalIcon,
                },
                { title: "정신적 수양", sub: "Spritual", icon: spritualIcon },
              ].map((item) => {
                const isSelected = selectedCategories.includes(item.title);
                return (
                  <div
                    key={item.title}
                    className={`wellness-card ${isSelected ? "selected" : ""}`}
                    onClick={() => handleCategoryClick(item.title)}
                  >
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="card-svg-icon"
                    />
                    <div className="card-title">{item.title}</div>
                    <div className="card-sub">{item.sub}</div>
                  </div>
                );
              })}
            </div>

            <div className="bottom-nav-buttons">
              <button
                className="nav-btn cancel-btn"
                onClick={() => setCurrentStep(1)}
              >
                이전 단계
              </button>
              <button
                className="nav-btn next-btn"
                onClick={() => {
                  if (selectedCategories.length === 0) {
                    alert("카테고리를 1개 이상 선택해 주세요!");
                  } else {
                    setCurrentStep(3);
                  }
                }}
              >
                다음 단계
              </button>
            </div>
          </div>
        )}

        {/* ==================== STEP 3 ==================== */}
        {currentStep === 3 && (
          <div className="step-wrapper fade-in">
            <div className="progress-header">
              <div className="progress-bar-bg">
                <div
                  className="progress-bar-fill"
                  style={{ width: "75%" }}
                ></div>
              </div>
              <span className="progress-text">3 / 4</span>
            </div>

            <div className="step-titles">
              <span className="step-indicator">STEP 3</span>
              <h2>웰니스 취향 PICK</h2>
              <p>
                내 일상에서 실천하고 싶은 분야를
                <br />
                1~3개 선택하면 더 맞춤 루틴을 제안해요
              </p>
            </div>

            <div className="question-section">
              <h3 className="question-title">
                1. 근무 중 나를 가장 지치게 하는 순간은?
              </h3>
              <div className="tag-group">
                {[
                  "갑작스러운 졸음",
                  "수면 장애 및 불면증",
                  "체중 변화",
                  "불규칙적 식사로 인한 소화불량",
                  "반복되는 일상",
                  "교대 타임 전환 시 피로 누적",
                ].map((tag) => (
                  <button
                    key={tag}
                    className={`pill-tag ${fatigueFactors.includes(tag) ? "selected" : ""}`}
                    onClick={() => toggleFatigueFactor(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="question-section">
              <h3 className="question-title">2. 선호하는 피로 회복 방식은?</h3>
              <div className="tag-group">
                {[
                  "푹 자고 일어나기",
                  "가벼운 리프레시 활동",
                  "간단한 운동",
                  "밀린 자기관리",
                ].map((tag) => (
                  <button
                    key={tag}
                    className={`pill-tag ${recoveryPrefs.includes(tag) ? "selected" : ""}`}
                    onClick={() => toggleRecoveryPref(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="question-section">
              <h3 className="question-title">3. 요청사항 (선택)</h3>
              <div className="textarea-wrapper">
                <textarea
                  className="request-textarea"
                  placeholder={`구체적으로 희망하는 바를 200자 이내로 \n입력해주세요.\n입력한 내용은 맞춤형 웰니스 루틴 형성에 참고됩니다.`}
                  maxLength={200}
                  value={requestText}
                  onChange={(e) => setRequestText(e.target.value)}
                />
                <span className="char-counter">{requestText.length} / 200</span>
              </div>
            </div>

            <div className="bottom-nav-buttons">
              <button
                className="nav-btn cancel-btn"
                onClick={() => setCurrentStep(2)}
              >
                이전 단계
              </button>
              <button
                className="nav-btn next-btn"
                onClick={() => {
                  if (
                    fatigueFactors.length === 0 ||
                    recoveryPrefs.length === 0
                  ) {
                    alert("질문 1, 2에 대해 최소 1개 이상 선택해 주세요!");
                  } else {
                    setCurrentStep(4);
                  }
                }}
              >
                다음 단계
              </button>
            </div>
          </div>
        )}

        {/* ==================== STEP 4 ==================== */}
        {currentStep === 4 && (
          <div className="step4-container fade-in">
            <div className="progress-header">
              <div className="progress-bar-bg">
                <div
                  className="progress-bar-fill"
                  style={{ width: "100%" }}
                ></div>
              </div>
              <span className="progress-text">4 / 4</span>
            </div>

            <div className="step4-content">
              <div className="step4-image-slot">
                <img
                  src={logoColored}
                  alt="로고"
                  className="step4-logo"
                />
              </div>

              <h2 className="step4-title">
                {userName}님을 위한
                <br />
                스케줄표를 만들고 있어요
              </h2>
            </div>

            <div className="step4-footer">
              <img
                src={smalllogo}
                alt="Well Done"
                className="step4-welldone-img"
              />
            </div>
          </div>
        )}

        {/* ==================== STEP 5 (주간 직접 입력) ==================== */}
        {currentStep === 5 && (
          <div
            className="step-wrapper fade-in no-progress"
            ref={scheduleCaptureRef}
          >
            <div className="schedule-toggle-group">
              <button
                className="toggle-btn"
                onClick={() => setCurrentStep(6)}
              >
                교대 근무표 입력
              </button>
              <button
                className="toggle-btn active"
                onClick={() => setCurrentStep(5)}
              >
                주간 직접 입력
              </button>
            </div>

            <div className="step-titles">
              <h2>스케줄표 제작</h2>
              <p>근무 일정을 확인하여 스케줄을 입력하세요</p>
            </div>

            <div className="weekly-schedule-container">
              <div className="weekly-header">Weekly Schedule</div>
              <table className="weekly-table">
                <thead>
                  <tr>
                    <th className="hour-cell"></th>
                    {days.map((day) => (
                      <th key={day}>{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hours.map((hour) => (
                    <tr key={hour}>
                      <td className="hour-cell">{hour}</td>
                      {days.map((day) => {
                        const matched = schedules.find(
                          (s) =>
                            s.day === day &&
                            hour >= s.startHour &&
                            hour < s.endHour
                        );
                        const isStart = matched && matched.startHour === hour;

                        return (
                          <td
                            key={`${day}-${hour}`}
                            className={matched ? "filled-cell" : ""}
                          >
                            {matched && isStart && (
                              <div className="schedule-block">
                                <span className="sched-title">
                                  {matched.title}
                                </span>
                                {matched.location && (
                                  <span className="sched-location">
                                    ({matched.location})
                                  </span>
                                )}
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              className="outline-add-btn"
              onClick={() => {
                setModalType("weekly");
                setIsModalOpen(true);
              }}
            >
              + 스케줄 추가
            </button>

            <div className="bottom-nav-buttons">
              <button
                className="nav-btn cancel-btn"
                onClick={() => setCurrentStep(1)}
              >
                취소
              </button>
              <button
                className="nav-btn next-btn"
                onClick={handleSaveImage}
              >
                이미지 저장
              </button>
            </div>
          </div>
        )}

        {/* ==================== STEP 6 (교대 근무표 입력) ==================== */}
        {currentStep === 6 && (
          <div
            className="step-wrapper fade-in no-progress"
            ref={monthlyCaptureRef}
          >
            <div className="schedule-toggle-group">
              <button
                className="toggle-btn active"
                onClick={() => setCurrentStep(6)}
              >
                교대 근무표 입력
              </button>
              <button
                className="toggle-btn"
                onClick={() => setCurrentStep(5)}
              >
                주간 직접 입력
              </button>
            </div>

            <div className="step-titles">
              <h2>스케줄표 제작</h2>
              <p>근무 일정을 확인하여 스케줄을 입력하세요</p>
            </div>

            <div className="monthly-schedule-container">
              <div className="calendar-header">
                <button
                  className="cal-nav-btn"
                  onClick={handlePrevMonth}
                >
                  &lt;
                </button>
                <span className="cal-month">
                  {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
                </span>
                <button
                  className="cal-nav-btn"
                  onClick={handleNextMonth}
                >
                  &gt;
                </button>
              </div>

              <table className="calendar-table">
                <thead>
                  <tr>
                    {["월", "화", "수", "목", "금", "토", "일"].map((day) => (
                      <th key={day}>{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {calendarRows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, colIndex) => (
                        <td
                          key={colIndex}
                          className={
                            cell.isCurrentMonth
                              ? "current-month"
                              : "other-month"
                          }
                          onClick={() => {
                            setSelectedDateForAction(cell.dateStr);
                            setCurrentStep(7); // 날짜 클릭 시 바로 STEP 7(직접 일정 추가/수정 폼)으로 이동
                          }}
                        >
                          <div className="cal-date-mock">
                            <span className="date-number">{cell.day}</span>
                            {shiftData[cell.dateStr] && (
                              <div
                                className={`shift-badge type-${shiftData[cell.dateStr]}`}
                              >
                                {shiftData[cell.dateStr]}
                              </div>
                            )}
                            {memoData[cell.dateStr] && (
                              <div className="calendar-memo">
                                {memoData[cell.dateStr].length > 2
                                  ? memoData[cell.dateStr].substring(0, 2) +
                                    "..."
                                  : memoData[cell.dateStr]}
                              </div>
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="calendar-legend">
                <span className="legend-item">
                  <span className="legend-dot d-day">D</span> DAY
                </span>
                <span className="legend-item">
                  <span className="legend-dot evening">E</span> Evening
                </span>
                <span className="legend-item">
                  <span className="legend-dot night">N</span> Night
                </span>
                <span className="legend-item">
                  <span className="legend-dot off">O</span> OFF
                </span>
              </div>
            </div>

            <button
              className="outline-add-btn"
              onClick={() => {
                // 오늘 날짜 기본값으로 세팅 후 STEP 7 이동
                const todayStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-01`;
                setSelectedDateForAction(todayStr);
                setCurrentStep(7);
              }}
            >
              + 직접 일정 추가
            </button>

            <div className="bottom-nav-buttons">
              <button
                className="nav-btn cancel-btn"
                onClick={() => setCurrentStep(1)}
              >
                취소
              </button>
              <button
                className="nav-btn next-btn"
                onClick={handleSaveAndRegister}
              >
                스케줄 저장
              </button>
            </div>
          </div>
        )}

        {/* ==================== STEP 7 (교대 근무 및 메모 직접 입력) ==================== */}
        {currentStep === 7 && (
          <div
            className="step-wrapper fade-in no-progress"
            ref={monthlyCaptureRef}
          >
            {/* 상단 토글 바 */}
            <div className="schedule-toggle-group">
              <button
                className="toggle-btn active"
                onClick={() => setCurrentStep(6)}
              >
                교대 근무표 입력
              </button>
              <button
                className="toggle-btn"
                onClick={() => setCurrentStep(5)}
              >
                주간 직접 입력
              </button>
            </div>

            {/* 타이틀 영역 */}
            <div className="step-titles mt-20">
              <h2>스케줄표 제작</h2>
              <p>근무 일정을 확인하여 스케줄을 입력하세요</p>
            </div>

            {/* 일정 추가 섹션 */}
            <div className="input-group mt-20">
              <label>일정추가</label>
              <div className="sub-label mt-10">날짜 선택</div>
              <input
                type="date"
                value={inputDate}
                onChange={(e) => setInputDate(e.target.value)}
                className="type-select date-input-field mt-8"
              />
            </div>

            <div className="input-group mt-20">
              <label>근무 유형 선택</label>
              <div className="shift-type-container mt-8">
                {[
                  { type: "D", label: "DAY", className: "type-d" },
                  { type: "E", label: "Evening", className: "type-e" },
                  { type: "N", label: "Night", className: "type-n" },
                  { type: "O", label: "OFF", className: "type-o" },
                ].map((item) => (
                  <div
                    key={item.type}
                    className="shift-type-item"
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedShiftType(item.type)}
                      className={`shift-type-btn ${item.className} ${selectedShiftType === item.type ? "selected" : ""}`}
                    >
                      {item.type}
                    </button>
                    <span className="shift-label">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 메모 입력창 (글자 수 제한 0/30 포함) */}
            <div className="input-group mt-20">
              <label>메모 (선택)</label>
              <div className="memo-input-wrap mt-8">
                <input
                  type="text"
                  value={inputMemo}
                  onChange={(e) => {
                    if (e.target.value.length <= 30) {
                      setInputMemo(e.target.value);
                    }
                  }}
                  placeholder=""
                  className="memo-text-input"
                />
                <span className="memo-counter">{inputMemo.length}/30</span>
              </div>
            </div>

            {/* 하단 단일 버튼 */}
            <div className="bottom-nav-buttons mt-30">
              <button
                className="nav-btn next-btn full-width-btn"
                onClick={handleSaveStep7}
              >
                추가하기
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
