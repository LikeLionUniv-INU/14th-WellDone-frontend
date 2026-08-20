import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const scheduleApi = {
  // 1. 스케줄표 이미지 업로드 API
  uploadScheduleImage: async (formData) => {
    try {
      // 🔑 토큰 장착
      const token = localStorage.getItem("accessToken");

      const response = await axios.post(`${BASE_URL}/onboarding/schedule/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token && { Authorization: `Bearer ${token}` }),
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
      console.log("확인용 BASE_URL:", BASE_URL);
      
      // 🔑 토큰 장착
      const token = localStorage.getItem("accessToken");

      const response = await axios.post(`${BASE_URL}/onboarding/schedule/manual`, dutyData, {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      return response.data;
    } catch (error) {
      console.error("교대근무표 수동 저장 실패:", error);
      throw error;
    }
  },

  // 3. 웰니스 카테고리 선택 제출 API
  submitCategories: async (categories) => {
    try {
      const token = localStorage.getItem("accessToken");
      console.log("서버로 보내는 카테고리 데이터:", JSON.stringify({ categories }, null, 2));
      const response = await axios.post(`${BASE_URL}/onboarding/categories`, {
        categories: categories
      }, {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      return response.data;
    } catch (error) {
      console.error("카테고리 제출 실패:", error);
      throw error;
    }
  },

  // 4. 사전질문(취향 PICK) 제출 API
  submitPreferences: async (preferencesData) => {
    try {
      const token = localStorage.getItem("accessToken");
      
      const response = await axios.post(`${BASE_URL}/onboarding/preferences`, preferencesData, {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      return response.data;
    } catch (error) {
      console.error("사전질문 제출 실패:", error);
      throw error;
    }
  },

  // 5. AI 루틴 분석 요청 API
  generateAIRoutine: async () => {
    try {
      const token = localStorage.getItem("accessToken");
      
      const response = await axios.post(`${BASE_URL}/onboarding/routine/generate`, null, {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      return response.data;
    } catch (error) {
      console.error("AI 루틴 분석 요청 실패:", error);
      throw error;
    }
  },

  // 6. AI 루틴 제안 결과 조회 API
  getRoutineSuggestion: async () => {
    try {
      const token = localStorage.getItem("accessToken");
      
      const response = await axios.get(`${BASE_URL}/onboarding/routine/suggestion`, {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      return response.data;
    } catch (error) {
      console.error("AI 루틴 결과 조회 실패:", error);
      throw error;
    }
  },

  // 7. AI 루틴 재추천 API
  regenerateAIRoutine: async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.post(`${BASE_URL}/onboarding/routine/regenerate`, null, {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      return response.data;
    } catch (error) {
      console.error("AI 루틴 재추천 요청 실패:", error);
      throw error;
    }
  },

  // 8. 루틴 적용(온보딩 완료) API
  applyRoutine: async (analysisId) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.post(
        `${BASE_URL}/onboarding/routine/apply`,
        { analysisId },
        {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("루틴 적용 실패:", error);
      throw error;
    }
  },

  // 9. AI 루틴 분석 상태 조회 API (새로 추가)
  checkRoutineStatus: async (analysisId) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.get(
        `${BASE_URL}/onboarding/routine/status?analysisId=${analysisId}`,
        {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("AI 루틴 분석 상태 조회 실패:", error);
      throw error;
    }
  },
};