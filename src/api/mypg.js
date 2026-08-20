
import api from "./axios";

// 1. 주간 루틴 수행 내역
export const getWeekly = async () => {
  const response = await api.get("/my/weekly");
  return response.data;
};

// 2. 월간 웰니스 리포트 (부스터 모드)
export const getMonthly = async () => {
  const response = await api.get("/my/report/monthly");
  return response.data;
};

// 3. 카테고리별 달성 요약
export const getSummary = async () => {
  const response = await api.get("/my/report/category");
  return response.data;
};

// 4. 골든 타임 회복률
export const getGoldenTime = async () => {
  const response = await api.get("/my/report/golden-time");
  return response.data;
};

// 5. 다음 달 회복 포인트
export const getNextMonth = async () => {
  const response = await api.get("/my/report/next-month");
  return response.data;
};