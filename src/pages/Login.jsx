import { useState ,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import "../styles/Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  // 토스트 팝업 표시 여부 및 사라지는 페이드아웃 상태 관리
  const [showToast, setShowToast] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const isFormValid = id.trim() !== "" && password.trim() !== "";


// 1. 컴포넌트 마운트 시 환경변수 상태 즉시 점검
  useEffect(() => {
    console.log("==========================================");
    
    if (!import.meta.env.VITE_API_URL) {
      console.error("❌ [경고] VITE_API_URL이 undefined입니다! 배포 대시보드 환경변수를 확인하세요.");
    }
    console.log("==========================================");
  }, []);






  const handleLogin = async () => {
    console.log("🚀 [2. 버튼 클릭] handleLogin 실행됨");
   
    console.log("   - 유효성 통과 여부(isFormValid):", isFormValid);

    
    if (!isFormValid) {
      console.warn("⚠️ [유효성 실패] 아이디 또는 비밀번호가 비어있어 함수를 종료합니다.");
      return;
    }




    try {
      // API 요청 (Vite 환경 변수 사용 가정)
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        loginId: id,
        password: password,
      });
console.log("✅ [4. API 응답 완료] 전체 Response:", response);
      // 성공 시 (200 OK)
      if (response.data.isSuccess) {
        const { accessToken, refreshToken, isOnboardingComplete } = response.data.result;
        console.log("응답 전체 데이터:", response.data);
console.log("온보딩 완료 여부:", isOnboardingComplete);
console.log("result 내부 전체:", response.data.result);

        // 로컬 스토리지에 토큰 저장
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);


          navigate("/home"); 

      }
    } catch (error) {
      console.log("지금 보내려는 값 -> id:", id, "password:", password);
      // 실패 시 (401 Unauthorized 등)
      console.error("로그인 실패:", error);
      
      // 백엔드가 보내주는 에러 메시지가 있다면 그걸 띄울 수도 있습니다.
      // const errorMsg = error.response?.data?.message || "아이디 또는 비밀번호가 일치하지 않습니다.";
      
      triggerToast();
    }
  };

  // 토스트 팝업을 띄우고 1.5초 유지 후 사라지게 하는 함수
  const triggerToast = () => {
    setShowToast(true);
    setIsFadingOut(false);

    // 1.5초 동안 유지되다가 페이드아웃 시작
    setTimeout(() => {
      setIsFadingOut(true); // 사라지는 애니메이션 시작

      // 페이드아웃 애니메이션 시간(0.5초) 뒤에 돔에서 완전히 제거
      setTimeout(() => {
        setShowToast(false);
        setIsFadingOut(false);
      }, 500);
    }, 1500);
  };

  return (
    <div className="login-box">
      <div className="login-title-area">
        <h2>로그인</h2>
      </div>

      <div className="login-form-container">
        {/* 아이디 입력란 */}
        <div className="login-input-group">
          <label>아이디</label>
          <input
            type="text"
            placeholder="아이디를 입력하세요"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>

        {/* 비밀번호 입력란 */}
        <div className="login-input-group">
          <label>비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* 로그인 버튼 */}
        <button
          className={`login-submit-btn ${!isFormValid ? "disabled" : ""}`}
          onClick={handleLogin}
          disabled={!isFormValid}
        >
          로그인
        </button>

        {/* 하단 링크 */}
        <div className="login-footer-link">
          이용약관 및&nbsp;
          <span
            className="signup-link"
            onClick={() => navigate("/signup")}
          >
            회원가입
          </span>
        </div>
      </div>

      {/* 슉 올라왔다가 스르륵 사라지는 토스트 팝업 메시지 */}
      {showToast && (
        <div className={`login-toast-popup ${isFadingOut ? "fade-out" : ""}`}>
          <p>
            아이디 또는 비밀번호가 일치하지 않습니다.
            <br />
            다시 시도해주세요.
          </p>
        </div>
      )}
    </div>
  );
}
