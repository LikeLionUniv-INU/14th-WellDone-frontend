import api from "./axios";

export const Loutine = async () => {
  //루틴 가져오기
  const response = await api.get("/home/today");
  return response.data;
};
