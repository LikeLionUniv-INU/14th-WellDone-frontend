import axios from "axios";

export const scheduleApi = {
  // 1. 스케줄표 이미지 업로드 API
  uploadScheduleImage: async (formData) => {
    try {
      const response = await axios.post("/onboarding/schedule/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("스케줄표 이미지 업로드 실패:", error);
      throw error;
    }
  },

  // 2. 교대근무표 수동 저장 API
  saveScheduleManual: async (dutyData) => {
    try {
      // dutyData 형태 예시: { duties: [{ date: "2026-08-01", dutyType: "D", memo: "" }, ...] }
      const response = await axios.post("/onboarding/schedule/manual", dutyData, {
        headers: {
          "Content-Type": "application/json",
          // 만약 토큰 인증이 필요하다면 아래와 같이 추가해 주세요
          // "Authorization": `Bearer ${token}` 
        },
      });
      return response.data;
    } catch (error) {
      console.error("교대근무표 수동 저장 실패:", error);
      throw error;
    }
  },
};