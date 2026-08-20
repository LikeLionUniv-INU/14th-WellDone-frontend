import axios from "axios";

// console.log("현재 API 주소:", import.meta.env.VITE_API_URL); // 주석 처리: 개발 중 불필요한 로그

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

// 요청 인터셉터 설정 (매 API 요청 직전에 실행됨)
api.interceptors.request.use(
  (config) => {
    // 저장소(localStorage 등)에서 최신 토큰 꺼내기
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
