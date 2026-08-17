import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/AIRoutine.css'; 

// 모든 아이콘 상단 import
import upload_cloud from '../images/Upload_cloud.svg';
import physicalIcon from '../images/Physical.svg';
import emotionalIcon from '../images/Emotional.svg';
import nutritionalIcon from '../images/Nutritional.svg';
import aestheticIcon from '../images/Aesthetic.svg';
import environmentalIcon from '../images/Environmental.svg';
import spritualIcon from '../images/Spritual.svg';
import logoColored from '../images/logo_colored.svg';
import smalllogo from '../images/welldone_colored.svg';

export default function AIRoutine() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  
  // --- STEP 1 상태 ---
  const [scheduleType, setScheduleType] = useState('근무 일정표');
  const [previewImage, setPreviewImage] = useState(null); 
  const galleryRef = useRef(null);
  const cameraRef = useRef(null);

  // --- STEP 2 상태 ---
  const [selectedCategories, setSelectedCategories] = useState(['신체적 건강']);

  // --- STEP 3 상태 ---
  const [fatigueFactors, setFatigueFactors] = useState([]); // 지치게 하는 순간
  const [recoveryPrefs, setRecoveryPrefs] = useState([]); // 피로 회복 방식
  const [requestText, setRequestText] = useState(""); // 요청사항 (선택)

  // --- STEP 4 상태 ---
  const [userName] = useState("홍길동"); // 추후 백엔드 연동 시 데이터로 대체할 자리

  // --- STEP 1 핸들러 ---
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  // --- STEP 2 핸들러 (슬라이딩 방식 적용) ---
  const handleCategoryClick = (categoryName) => {
    if (selectedCategories.includes(categoryName)) {
      setSelectedCategories(selectedCategories.filter((item) => item !== categoryName));
    } else {
      if (selectedCategories.length >= 3) {
        // 3개 가득 찬 상태에서 클릭 시 가장 오래된 항목(0번 인덱스) 밀어내고 추가
        setSelectedCategories([...selectedCategories.slice(1), categoryName]);
      } else {
        setSelectedCategories([...selectedCategories, categoryName]);
      }
    }
  };

  // --- STEP 3 핸들러 (슬라이딩 방식 적용) ---
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
        navigate('/home'); // 이동할 결과 페이지 경로로 수정하세요 (예: '/result')
        }, 3000); // 3초(3000ms) 후 이동, 현재 임시로 길게 연장
        return () => clearTimeout(timer);
    }
  }, [currentStep, navigate]);

  return (
    <div className="airoutine-container">
      {/* ==================== STEP 1 ==================== */}
      {currentStep === 1 && (
        <div className="step-wrapper fade-in">
          <div className="progress-header">
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: '25%' }}></div>
            </div>
            <span className="progress-text">1 / 4</span>
          </div>

          <div className="step-titles">
            <span className="step-indicator">STEP 1</span>
            <h2>스케줄표 업로드</h2>
            <p>근무 일정을 올려주시면<br />AI가 최적의 회복 루틴을 설계해드려요</p>
          </div>

          <div className="input-group">
            <label>스케줄표 유형 <span className="required">*</span></label>
            <select 
              value={scheduleType} 
              onChange={(e) => setScheduleType(e.target.value)}
              className="type-select"
            >
              <option value="근무 일정표">근무 일정표</option>
              <option value="기타 일정">기타 일정</option>
            </select>
          </div>

          <div className="upload-box" onClick={() => galleryRef.current.click()}>
            {previewImage ? (
              <img src={previewImage} alt="스케줄표 미리보기" className="preview-image" />
            ) : (
              <div className="upload-content">
                <img className="upload-icon" src={upload_cloud} alt="업로드 아이콘" />
                <p className="upload-main-text">이미지 등록</p>
                <p className="upload-sub-text">이미지 파일 (PNG, JPG)</p>
              </div>
            )}
          </div>

          <input type="file" accept="image/*" ref={galleryRef} onChange={handleImageChange} style={{ display: 'none' }} />
          <input type="file" accept="image/*" capture="environment" ref={cameraRef} onChange={handleImageChange} style={{ display: 'none' }} />

          <div className="sub-action-buttons">
            <button className="sub-btn" onClick={() => cameraRef.current.click()}>사진 촬영</button>
            <button className="sub-btn" onClick={() => galleryRef.current.click()}>갤러리</button>
            {/* 스케줄표 제작 버튼 클릭 시 STEP 5로 이동 */}
            <button className="sub-btn highlight-sub" onClick={() => setCurrentStep(5)}>스케줄표 제작</button>
          </div>

          <div className="bottom-nav-buttons">
            <button className="nav-btn cancel-btn" onClick={() => { navigate('/home'); }}>취소</button>
            <button className="nav-btn next-btn" onClick={() => setCurrentStep(2)}>다음 단계</button>
          </div>
        </div>
      )}

      {/* ==================== STEP 2 ==================== */}
      {currentStep === 2 && (
        <div className="step-wrapper fade-in">
          <div className="progress-header">
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: '50%' }}></div>
            </div>
            <span className="progress-text">2 / 4</span>
          </div>

          <div className="step-titles">
            <span className="step-indicator">STEP 2</span>
            <h2>웰니스 카테고리 선택</h2>
            <p>내 일상에 영향을 주는 주요 요소를<br />1~3개 선택하면 더 정확한 루틴이 됩니다.</p>
          </div>

          <div className="wellness-grid">
            {[
              { title: '신체적 건강', sub: 'Physical', icon: physicalIcon },
              { title: '피부 관리', sub: 'Emotional', icon: emotionalIcon },
              { title: '영양적 균형', sub: 'Nutritional', icon: nutritionalIcon },
              { title: '정서적 안정', sub: 'Aesthetic', icon: aestheticIcon },
              { title: '편안한 환경', sub: 'Environmental', icon: environmentalIcon },
              { title: '정신적 수양', sub: 'Spritual', icon: spritualIcon },
            ].map((item) => {
              const isSelected = selectedCategories.includes(item.title);
              return (
                <div 
                  key={item.title}
                  className={`wellness-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleCategoryClick(item.title)}
                >
                  <img src={item.icon} alt={item.title} className="card-svg-icon" />
                  <div className="card-title">{item.title}</div>
                  <div className="card-sub">{item.sub}</div>
                </div>
              );
            })}
          </div>

          <div className="bottom-nav-buttons">
            <button className="nav-btn cancel-btn" onClick={() => setCurrentStep(1)}>이전 단계</button>
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
              <div className="progress-bar-fill" style={{ width: '75%' }}></div>
            </div>
            <span className="progress-text">3 / 4</span>
          </div>

          <div className="step-titles">
            <span className="step-indicator">STEP 3</span>
            <h2>웰니스 취향 PICK</h2>
            <p>내 일상에서 실천하고 싶은 분야를<br />1~3개 선택하면 더 맞춤 루틴을 제안해요</p>
          </div>

          {/* 질문 1 */}
          <div className="question-section">
            <h3 className="question-title">1. 근무 중 나를 가장 지치게 하는 순간은?</h3>
            <div className="tag-group">
              {['갑작스러운 졸음', '수면 장애 및 불면증', '체중 변화', '불규칙적 식사로 인한 소화불량', '반복되는 일상', '교대 타임 전환 시 피로 누적'].map((tag) => (
                <button
                  key={tag}
                  className={`pill-tag ${fatigueFactors.includes(tag) ? 'selected' : ''}`}
                  onClick={() => toggleFatigueFactor(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* 질문 2 */}
          <div className="question-section">
            <h3 className="question-title">2. 선호하는 피로 회복 방식은?</h3>
            <div className="tag-group">
              {['푹 자고 일어나기', '가벼운 리프레시 활동', '간단한 운동', '밀린 자기관리'].map((tag) => (
                <button
                  key={tag}
                  className={`pill-tag ${recoveryPrefs.includes(tag) ? 'selected' : ''}`}
                  onClick={() => toggleRecoveryPref(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* 질문 3 */}
          <div className="question-section">
            <h3 className="question-title">3. 요청사항 (선택)</h3>
            <div className="textarea-wrapper">
              <textarea 
                className="request-textarea"
                placeholder="구체적으로 희망하는 바를 30자 이내로 입력해주세요.&#13;&#10;입력한 내용은 맞춤형 웰니스 루틴 형성에 참고됩니다."
                maxLength={200}
                value={requestText}
                onChange={(e) => setRequestText(e.target.value)}
              />
              <span className="char-counter">{requestText.length} / 200</span>
            </div>
          </div>

          <div className="bottom-nav-buttons">
            <button className="nav-btn cancel-btn" onClick={() => setCurrentStep(2)}>이전 단계</button>
            <button 
              className="nav-btn next-btn" 
              onClick={() => {
                if (fatigueFactors.length === 0 || recoveryPrefs.length === 0) {
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
              <div className="progress-bar-fill" style={{ width: '100%' }}></div>
            </div>
            <span className="progress-text">4 / 4</span>
          </div>

          <div className="step4-content">
            <div className="step4-image-slot">
              <img src={logoColored} alt="로고" className="step4-logo" />
            </div>
            
            <h2 className="step4-title">
              {userName}님을 위한<br />
              스케줄표를 만들고 있어요
            </h2>
          </div>

          <div className="step4-footer">
            <img src={smalllogo} alt="Well Done" className="step4-welldone-img" />
          </div>
        </div>
      )}

      {/* ==================== STEP 5 (주간 직접 입력) ==================== */}
      {currentStep === 5 && (
        <div className="step-wrapper fade-in no-progress">
          {/* 상단 탭 (스텝 5 / 6 전환) */}
          <div className="schedule-toggle-group">
            <button className="toggle-btn" onClick={() => setCurrentStep(6)}>교대 근무표 입력</button>
            <button className="toggle-btn active" onClick={() => setCurrentStep(5)}>주간 직접 입력</button>
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
                  <th></th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th>토</th><th>일</th>
                </tr>
              </thead>
              <tbody>
                {[7, 8, 9, 10, 11, 12, 13, 14].map((hour) => (
                  <tr key={hour}>
                    <td className="hour-cell">{hour}</td>
                    <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button className="outline-add-btn">+ 스케줄 추가</button>

          <div className="bottom-nav-buttons">
            <button className="nav-btn cancel-btn" onClick={() => setCurrentStep(1)}>취소</button>
            <button className="nav-btn next-btn" onClick={() => alert('이미지 저장 구현 대기')}>이미지 저장</button>
          </div>
        </div>
      )}

      {/* ==================== STEP 6 (교대 근무표 입력) ==================== */}
      {currentStep === 6 && (
        <div className="step-wrapper fade-in no-progress">
          {/* 상단 탭 (스텝 5 / 6 전환) */}
          <div className="schedule-toggle-group">
            <button className="toggle-btn active" onClick={() => setCurrentStep(6)}>교대 근무표 입력</button>
            <button className="toggle-btn" onClick={() => setCurrentStep(5)}>주간 직접 입력</button>
          </div>

          <div className="step-titles">
            <h2>스케줄표 제작</h2>
            <p>근무 일정을 확인하여 스케줄을 입력하세요</p>
          </div>

          <div className="monthly-schedule-container">
            <div className="calendar-header">
              <button className="cal-nav-btn">&lt;</button>
              <span className="cal-month">2026년 5월</span>
              <button className="cal-nav-btn">&gt;</button>
            </div>
            
            <table className="calendar-table">
              {/* 캘린더 내부 일정 로직은 보류이므로 빈 그리드만 렌더링 */}
              <tbody>
                {Array.from({ length: 5 }).map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    {Array.from({ length: 7 }).map((_, colIndex) => (
                      <td key={colIndex}>
                        <div className="cal-date-mock"></div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* 범례 (Legend) */}
            <div className="calendar-legend">
              <span className="legend-item"><span className="legend-dot d-day">D</span> DAY</span>
              <span className="legend-item"><span className="legend-dot evening">E</span> Evening</span>
              <span className="legend-item"><span className="legend-dot night">N</span> Night</span>
              <span className="legend-item"><span className="legend-dot off">E</span> OFF</span>
            </div>
          </div>

          <button className="outline-add-btn">+ 직접 일정 추가</button>

          <div className="bottom-nav-buttons">
            <button className="nav-btn cancel-btn" onClick={() => setCurrentStep(1)}>취소</button>
            <button className="nav-btn next-btn" onClick={() => alert('스케줄 저장 구현 대기')}>스케줄 저장</button>
          </div>
        </div>
      )}

    </div>
  );
}