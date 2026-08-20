// 1. 비디오 타입 루틴 더미 데이터 (타이머 + 원형 그래프 + 유튜브 링크)
export const dummyVideoRoutine = {
  isSuccess: true,
  code: "COMMON_200",
  message: "요청에 성공했습니다.",
  result: {
    routineId: 3021,
    routineName: "하체 부종 스트레칭",
    routineType: "VIDEO",
    recommendedDuration: "Youtube 30분",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    remainingTime: "18:35",
    isVerificationRequired: false,
  },
};

// 2. 일반(GENERAL) 타입 루틴 더미 데이터 (타이머 없음, 큰 글씨)
export const dummyGeneralRoutine = {
  isSuccess: true,
  code: "COMMON_200",
  message: "요청에 성공했습니다.",
  result: {
    routineId: 3040,
    routineName: "미온수 500ml 마시기",
    routineType: "GENERAL",
    recommendedDuration: null,
    videoUrl: null,
    remainingTime: null,
    isVerificationRequired: false,
  },
};

// 3. 루틴이 없는 상태 (404 응답 테스트용)
export const dummyNoRoutine = {
  isSuccess: false,
  code: "HOME_404_1",
  message: "현재 수행할 루틴이 없습니다.",
  result: null,
};