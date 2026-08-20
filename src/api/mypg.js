import api from "./axios";

export const RcPoint = async () => {
  //회복 포인트 가져오기
  const response = await api.get("/my/report/next-month");
  return response.data;
};

export const ReRate = async () => {
  //골든 타임 회복률 가져오기
  const response = await api.get("/my/report/golden-time");
  return response.data;
};

export const Summary = async () => {
  //카테고리 별 달성 요약 가져오기
  const response = await api.get("/my/report/category");
  return response.data;
};

export const Monthly = async () => {
  //월간 웰니스 리포트 가져오기
  const response = await api.get("/my/report/monthly");
  return response.data;
};

export const Weekly = async () => {
  //주간 루틴 수행률 가져오기
  const response = await api.get("/my/weekly");
  return response.data;
};
