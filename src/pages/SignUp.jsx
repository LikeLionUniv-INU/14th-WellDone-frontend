import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignUp.css"; 

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [idError, setIdError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmError, setConfirmError] = useState(false);

  // 아이디 중복 확인 통과 여부 상태
  const [isIdChecked, setIsIdChecked] = useState(false);

  const validatePassword = (pwd) => {
    // 일단 백엔드 요청에 따른 아무 제한 없는 비밀번호
    const hasLength = pwd.length >= 0;
    //const hasSpecialChar = /[~!@#$%^&*(),.?":{}|<>]/.test(pwd);
    return hasLength /*&& hasSpecialChar*/;
  };

  // 중복 확인 버튼 클릭 시
  const handleDuplicateCheck = () => {
    if (!id.trim()) {
      alert("아이디를 입력해주세요.");
      return;
    }
    alert("사용 가능한 아이디입니다!");
    setIsIdChecked(true); 
    setIdError(false);
  };

  // 모든 조건이 완벽히 충족되었는지 확인하는 활성화 조건 변수
  const isFormValid = 
    name.trim() !== "" && 
    id.trim() !== "" && 
    isIdChecked && 
    password.trim() !== "" && 
    !passwordError && 
    confirmPassword.trim() !== "" && 
    !confirmError;

  //  최종 회원가입 핸들러 함수
  const handleSignUp = () => {
    if (!isFormValid) return;
    alert("회원가입 요청 성공!"); //임시 로그
    navigate("/");
  };

  return (
    <div className="signup-box">
      <div className="signup-title-area">
        <h2>회원가입</h2>
      </div>

      <div className="signup-form-container">
        {/* 이름 */}
        <div className="signup-input-group">
          <label>이름</label>
          <input 
            type="text" 
            placeholder="홍길동" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </div>

        {/* 아이디 */}
        <div className="signup-input-group">
          <label>아이디</label>
          <div className={`signup-input-wrapper ${idError ? "has-error" : ""}`}>
            <input 
              type="text" 
              placeholder="아이디를 입력하세요" 
              value={id} 
              onChange={(e) => {
                setId(e.target.value);
                setIdError(false);
                setIsIdChecked(false); 
              }} 
            />
            <button 
              type="button" 
              className={`inner-duplicate-btn ${isIdChecked ? "disabled" : ""}`} 
              onClick={handleDuplicateCheck}
              disabled={isIdChecked} 
            >
              중복 확인
            </button>
          </div>
          {idError && <span className="signup-error-text">사용할 수 없는 아이디입니다</span>}
        </div>

        {/* 비밀번호 */}
        <div className="signup-input-group">
          <label>비밀번호</label>
          <input 
            type="password" 
            placeholder="비밀번호 입력"
            value={password} 
            onChange={(e) => {
              const value = e.target.value;
              setPassword(value);

              if (value.length > 0 && !validatePassword(value)) {
                setPasswordError(true);
              } else {
                setPasswordError(false);
              }

              if (confirmPassword && value !== confirmPassword) {
                setConfirmError(true);
              } else {
                setConfirmError(false);
              }
            }} 
          />
          {passwordError && <span className="signup-error-text">올바른 비밀번호를 입력해주세요</span>}
        </div>

        {/* 비밀번호 확인 */}
        <div className="signup-input-group password-confirm-group">
          <div className={`signup-input-wrapper ${confirmError ? "has-error" : ""}`}>
            <input 
              type="password" 
              placeholder="비밀번호 확인" 
              value={confirmPassword} 
              onChange={(e) => {
                const value = e.target.value;
                setConfirmPassword(value);

                if (value !== password) {
                  setConfirmError(true);
                } else {
                  setConfirmError(false);
                }
              }} 
            />
            {confirmPassword.length > 0 && !confirmError && (
              <div className="check-icon-box">
                ✓
              </div>
            )}
          </div>
          {confirmError && <span className="signup-error-text">비밀번호가 일치하지 않습니다</span>}
        </div>

        {/* 회원가입 버튼 */}
        <button 
          className={`signup-submit-btn ${!isFormValid ? "disabled" : ""}`} 
          onClick={handleSignUp}
          disabled={!isFormValid}
        >
          회원가입
        </button>

        {/* 하단 링크 */}
        <div className="signup-footer-link">
          이용약관 및&nbsp;
          <span className="login-link" onClick={() => navigate("/")}>
            로그인
          </span>
        </div>
      </div>
    </div>
  );
}