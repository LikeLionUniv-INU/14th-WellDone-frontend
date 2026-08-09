import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css"; 

export default function Signup() {
  const navigate = useNavigate();

  // 사용자 입력 정보 관리, 전화,이름 형식 대신 아이디, 비밀번호 형식으로 바뀔수 있음
  const [name, setName] = useState(""); 
  const [phone, setPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [phoneError, setPhoneError] = useState(false);

  const handleSignUp = () => {
    if (!phone || phone.length < 10) {
      setPhoneError(true);
      return;
    }
    setPhoneError(false);
    alert("회원가입 버튼 클릭됨! (UI 테스트용)");
  };

  return (
    <div className="signup-box">
      <div className="signup-title-area">
        <h2>회원가입</h2>
      </div>

      <div className="signup-form-container">
        {/* 이름 입력 */}
        <div className="signup-input-group">
          <label>이름</label>
          <div className="signup-input-wrapper">
            <input
              type="text"
              placeholder="홍길동"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        {/* 전화번호 입력 */}
        <div className="signup-input-group">
          <label>전화번호</label>
          <div className={`signup-input-wrapper ${phoneError ? "has-error" : ""}`}>
            <span className="signup-country-code">+82</span>
            <input
              type="text"
              placeholder="010-0000-0000"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (phoneError) setPhoneError(false);
              }}
            />
            <button type="button" className="verify-btn">
              인증번호 전송
            </button>
          </div>
          {phoneError && (
            <span className="signup-error-message">올바른 전화번호를 입력해주세요</span>
          )}
        </div>

        {/* 인증번호 입력 */}
        <div className="signup-input-group">
          <label>인증번호</label>
          <div className="signup-input-wrapper">
            <input
              type="text"
              placeholder="인증번호 입력"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </div>
        </div>

        {/* 회원가입 버튼 */}
        <button className="signup-submit-btn" onClick={handleSignUp}>
          회원가입
        </button>

        {/* 하단 링크 */}
        <div className="signup-footer-link">
          이용약관 및
          <span onClick={() => navigate("/")}>로그인</span>
        </div>
      </div>
    </div>
  );
}

