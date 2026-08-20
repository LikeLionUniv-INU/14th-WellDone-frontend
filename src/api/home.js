import api from "./axios";

export const Loutine = async () => {
  //루틴 가져오기
  const response = await api.get("/home/today");
  return response.data;
};


export const Condition = async () => {
  //현재 상황 가져오기
  const response = await api.get("/home/status");
  return response.data;
};

export const Wellness = async () => {
  //현재 상황 가져오기
  const response = await api.get("home/wellness");
  return response.data;
};