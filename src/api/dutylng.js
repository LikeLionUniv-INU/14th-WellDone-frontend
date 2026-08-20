import api from "./axios";

export const getMainData = async () => {
  // 메인 데이터 가져오기
  const response = await api.get("/lounge/main");
  return response.data;
};
export const getDutyTalk = async () => {
  //듀티톡 가져오기
  const response = await api.get("/lounge/talks");
  return response.data;
};

export const getItemLst = async () => {
  //상품 목록 가져오기
  const response = await api.get("/lounge/rewards");
  return response.data;
};

export const WriteDuTa = async (message) => {
  // 듀티톡 작성
  const response = await api.post("/lounge/talks", {
    message: message,
  });
  return response.data;
};
