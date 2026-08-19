import React, { useState } from "react";
import "../styles/ScheduleModal.css";

export default function ScheduleModal({ isOpen, onClose, onAddSchedule }) {
  const days = ["월", "화", "수", "목", "금", "토", "일"];
  const hours = [7, 8, 9, 10, 11, 12, 13, 14];

  const [form, setForm] = useState({
    title: "",
    location: "",
    day: "월",
    startHour: 7,
    endHour: 8,
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "startHour") {
      const newStart = Number(value);
      setForm((prev) => ({
        ...prev,
        startHour: newStart,
        // 시작 시간이 기존 종료 시간과 같거나 크면, 종료 시간을 자동으로 (시작 + 1)로 밀어줌
        endHour:
          prev.endHour <= newStart ? Math.min(newStart + 1, 15) : prev.endHour,
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      alert("스케줄명을 입력해 주세요.");
      return;
    }

    const start = Number(form.startHour);
    const end = Number(form.endHour);

    // 최종 유효성 검사 안전장치
    if (end <= start) {
      alert("종료 시간은 시작 시간보다 뒤여야 합니다.");
      return;
    }

    const newSchedule = {
      id: Date.now(),
      title: form.title,
      location: form.location,
      day: form.day,
      startHour: start,
      endHour: end,
    };

    onAddSchedule(newSchedule);
    onClose();
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          <div className="modal-input-group">
            <input
              type="text"
              name="title"
              placeholder="스케줄명"
              value={form.title}
              onChange={handleChange}
              className="modal-line-input"
              autoFocus
            />
          </div>

          <div className="modal-input-group">
            <input
              type="text"
              name="location"
              placeholder="근무장소"
              value={form.location}
              onChange={handleChange}
              className="modal-line-input"
            />
          </div>

          <div className="modal-select-row">
            <select
              name="day"
              value={form.day}
              onChange={handleChange}
              className="modal-select day-select"
            >
              {days.map((d) => (
                <option
                  key={d}
                  value={d}
                >
                  {d}요일
                </option>
              ))}
            </select>

            <div className="time-range-wrapper">
              <select
                name="startHour"
                value={form.startHour}
                onChange={handleChange}
                className="modal-select time-select start-time"
              >
                {hours.map((h) => (
                  <option
                    key={h}
                    value={h}
                  >
                    {String(h).padStart(2, "0")}:00
                  </option>
                ))}
              </select>
              <span className="time-dash">-</span>
              <select
                name="endHour"
                value={form.endHour}
                onChange={handleChange}
                className="modal-select time-select"
              >
                {/* 시작 시간보다 큰 시간대만 선택 가능하도록 필터링 */}
                {hours.concat(15).map((h) => (
                  <option
                    key={h}
                    value={h}
                    disabled={h <= form.startHour}
                  >
                    {String(h).padStart(2, "0")}:00
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="modal-submit-wrapper">
            <button
              type="submit"
              className="modal-submit-btn"
            >
              추가
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
