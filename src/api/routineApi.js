import api from "./axios";


/**
 * 17. 현재 루틴 조회 API
 */
export const getCurrentRoutine = async () => {
  const response = await api.get("/home/routine/current");
  return response.data;
};

/**
 * 18. 루틴 시작 API (VIDEO 한정)
 */
export const startRoutine = async (routineId) => {
  const response = await api.post(`/home/routine/${routineId}/start`);
  return response.data;
};

/**
 * 19. 루틴 일시정지 API (VIDEO 한정)
 */
export const pauseRoutine = async (routineId) => {
  const response = await api.post(`/home/routine/${routineId}/pause`);
  return response.data;
};

/**
 * 20. 루틴 완료 API
 */
export const completeRoutine = async (routineId) => {
  const response = await api.post(`/home/routine/${routineId}/complete`);
  return response.data;
};

/**
 * 21. 루틴 사진 인증 API
 */
export const uploadRoutinePhoto = async (routineId, imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await api.post(
    `/home/routine/${routineId}/photo`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};