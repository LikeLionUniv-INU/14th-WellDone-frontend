import React, { useState, useEffect, useRef } from "react";
import { Pause, Play, Camera } from "lucide-react";
import {
  startRoutine,
  pauseRoutine,
  completeRoutine,
  uploadRoutinePhoto,
} from "../api/routineApi";
import * as S from "../styles/CurrentRoutine.styles";

// "18:35" 형태의 분:초 문자열을 초(seconds) 단위 숫자로 변환
const parseTimeToSeconds = (timeStr) => {
  if (!timeStr) return 0;
  const parts = timeStr.split(":").map(Number);
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  if (parts.length === 1) return parts[0] * 60;
  return 0;
};

// 초(seconds) 숫자를 "MM:SS" 문자로 변환
const formatSecondsToTime = (totalSeconds) => {
  const m = Math.floor(totalSeconds / 60);
  const s = Math.floor(totalSeconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

export default function CurrentRoutine({ routineData, onStatusChange }) {
  const fileInputRef = useRef(null);

  // 백엔드 데이터 구조 destructing
  const {
    routineId,
    routineName,
    routineType,
    recommendedDuration,
    videoUrl,
    remainingTime,
  } = routineData || {};

  const isVideo = routineType === "VIDEO";
  const totalSeconds = parseTimeToSeconds(remainingTime);

  // 상태 관리: NOT_STARTED | IN_PROGRESS | PAUSED | COMPLETED
  const [status, setStatus] = useState("NOT_STARTED");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // LocalStorage 키 생성
  const storageKey = `routine_elapsed_${routineId}`;

  // 새 루틴 로드 시 초기화
  useEffect(() => {
    setStatus("NOT_STARTED");
    const savedElapsed = localStorage.getItem(storageKey);
    setElapsedSeconds(savedElapsed ? Number(savedElapsed) : 0);
  }, [routineId]);

  // 타이머 동작 (VIDEO 타입 & IN_PROGRESS 상태)
  useEffect(() => {
    let timer = null;
    if (isVideo && status === "IN_PROGRESS") {
      timer = setInterval(() => {
        setElapsedSeconds((prev) => {
          if (prev >= totalSeconds) {
            clearInterval(timer);
            return totalSeconds;
          }
          const next = prev + 1;
          localStorage.setItem(storageKey, next);
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isVideo, status, totalSeconds, storageKey]);

  // 콘텐츠/유튜브 링크 이동
  const handleContentClick = () => {
    if (isVideo && videoUrl) {
      window.open(videoUrl, "_blank");
    }
  };

  // 시작하기 버튼 클릭
  const handleStart = async () => {
    if (isVideo) {
      try {
        const res = await startRoutine(routineId);
        if (res?.isSuccess) {
          setStatus("IN_PROGRESS");
        }
      } catch (err) {
        console.error("루틴 시작 실패:", err);
      }
    } else {
      // GENERAL 타입은 바로 진행 상태로 변경하여 인증/완료 버튼 노출
      setStatus("IN_PROGRESS");
    }
  };

  // 일시정지 / 재개 버튼 클릭
  const handleTogglePause = async () => {
    if (status === "IN_PROGRESS") {
      try {
        const res = await pauseRoutine(routineId);
        if (res?.isSuccess) {
          setStatus("PAUSED");
        }
      } catch (err) {
        console.error("일시정지 실패:", err);
      }
    } else if (status === "PAUSED") {
      setStatus("IN_PROGRESS");
    }
  };

  // 완료하기 버튼 클릭
  const handleComplete = async () => {
    try {
      const res = await completeRoutine(routineId);
      if (res?.isSuccess) {
        setStatus("COMPLETED");
        localStorage.removeItem(storageKey);
        if (onStatusChange) onStatusChange();
      }
    } catch (err) {
      console.error("루틴 완료 실패:", err);
    }
  };

  // 사진 촬영 클릭
  const handlePhotoUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const res = await uploadRoutinePhoto(routineId, file);
      if (res?.isSuccess) {
        alert("사진 인증이 완료되었습니다.");
        if (onStatusChange) onStatusChange();
      }
    } catch (err) {
      alert(err.response?.data?.message || "사진 업로드에 실패했습니다.");
    }
  };

  // 진행률 및 완료 판단 조건
  const progressPercent =
    totalSeconds > 0
      ? Math.min(100, (elapsedSeconds / totalSeconds) * 100)
      : 0;

  // 타이머 종료 여부 (VIDEO 전용)
  const isTimerDone = isVideo && (elapsedSeconds >= totalSeconds || progressPercent >= 100);

  // 일시정지 버튼 대신 [사진촬영] 버튼을 노출할 조건:
  // 1. GENERAL 루틴이거나 2. VIDEO 루틴의 타이머가 완료된 경우
  const showPhotoButton = !isVideo || isTimerDone;

  // 완료 버튼 비활성화 여부
  const isCompleteDisabled = isVideo && !isTimerDone;

  // SVG 원형 그래프 계산
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (progressPercent / 100) * circumference;

  const isCompletedState = status === "COMPLETED";

  return (
    <S.RoutineContainer $isCompleted={isCompletedState}>
      {/* Hidden File Input for Photo Upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: "none" }}
      />

      {/* 루틴 제목 및 영상 정보 영역 */}
      <S.RoutineContentWrapper $isVideo={isVideo} onClick={handleContentClick}>
        {/* 비디오 타입일 때만 원형 그래프 노출 */}
        {isVideo && (
          <S.CircleProgressWrapper>
            <S.CircleSvg viewBox="0 0 90 90">
              <defs>
                <linearGradient
                  id={`routineGradient-${routineId}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#7B61FF" />
                  <stop offset="53%" stopColor="#7B61FF" />
                  <stop offset="100%" stopColor="#A796FF" />
                </linearGradient>
              </defs>
              <S.CircleBg cx="45" cy="45" r={radius} />
              <S.CircleProgress
                cx="45"
                cy="45"
                r={radius}
                stroke={`url(#routineGradient-${routineId})`}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
              />
            </S.CircleSvg>
            <S.CircleCenterText $isCompleted={isCompletedState}>
              {formatSecondsToTime(Math.max(0, totalSeconds - elapsedSeconds))}
            </S.CircleCenterText>
          </S.CircleProgressWrapper>
        )}

        <S.RoutineInfoArea>
          <S.RoutineTitle $isVideo={isVideo} $isCompleted={isCompletedState}>
            {routineName}
          </S.RoutineTitle>
          {recommendedDuration && (
            <S.RoutineSubText>{recommendedDuration}</S.RoutineSubText>
          )}
        </S.RoutineInfoArea>
      </S.RoutineContentWrapper>

      {/* 하단 버튼 영역 */}
      <S.ButtonGroup>
        {/* 1. 시작 전 */}
        {status === "NOT_STARTED" && (
          <S.PrimaryButton onClick={handleStart}>시작하기</S.PrimaryButton>
        )}

        {/* 2. 진행 중 / 일시정지 / 타이머 완료 상태 */}
        {(status === "IN_PROGRESS" || status === "PAUSED") && (
          <>
            {/* 왼쪽 버튼: [사진촬영] 또는 [일시정지/재생] */}
            {showPhotoButton ? (
              <S.SecondaryButton onClick={handlePhotoUploadClick}>
                <Camera size={18} color="#7B61FF" /> 사진촬영
              </S.SecondaryButton>
            ) : (
              <S.SecondaryButton onClick={handleTogglePause}>
                {status === "PAUSED" ? (
                  <>
                    <Play size={18} color="#7B61FF" /> 재생하기
                  </>
                ) : (
                  <>
                    <Pause size={18} color="#7B61FF" /> 일시정지
                  </>
                )}
              </S.SecondaryButton>
            )}

            {/* 오른쪽 버튼: [완료하기] */}
            <S.PrimaryButton
              onClick={handleComplete}
              disabled={isCompleteDisabled}
            >
              완료하기
            </S.PrimaryButton>
          </>
        )}

        {/* 3. 최종 완료 후 상태 */}
        {isCompletedState && (
          <S.PhotoButton onClick={handlePhotoUploadClick}>
            <Camera size={18} color="#7B61FF" /> 사진촬영
          </S.PhotoButton>
        )}
      </S.ButtonGroup>
    </S.RoutineContainer>
  );
}