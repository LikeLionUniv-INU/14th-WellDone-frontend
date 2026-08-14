import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  // 토스트 팝업 표시 여부 및 사라지는 페이드아웃 상태 관리
  const [showToast, setShowToast] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const isFormValid = id.trim() !== "" && password.trim() !== "";

  const handleLogin = () => {
    if (!isFormValid) return;

    // 예시: 로그인 실패 상황 가정 (실제 통신 시 틀렸을 때 이 로직을 실행하면 됩니다)
    // 여기서는 테스트로 틀렸을 때를 가정해 팝업을 띄웁니다.
    triggerToast();
  };

  // 토스트 팝업을 띄우고 1초 유지 후 사라지게 하는 함수
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
          <span className="signup-link" onClick={() => navigate("/signup")}>
            회원가입
          </span>
        </div>
      </div>

      {/* 슉 올라왔다가 스르륵 사라지는 토스트 팝업 메시지 */}
      {showToast && (
        <div className={`login-toast-popup ${isFadingOut ? "fade-out" : ""}`}>
          <p>아이디 또는 비밀번호가 일치하지 않습니다.<br />다시 시도해주세요.</p>
        </div>
      )}
    </div>
  );
}