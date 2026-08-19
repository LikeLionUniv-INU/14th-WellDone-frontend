import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Onboard.css";
import logoWhite from "../images/logo_white.svg";
import logoColored from "../images/logo_colored.svg";

export default function Onboard() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  useEffect(() => {
    let timer;
    if (step === 1) {
      // 1번 화면에서 2초 후 2번 화면으로 전환
      timer = setTimeout(() => setStep(2), 2000);
    } else if (step === 2) {
      // 2번 화면에서 2초 후 3번 화면으로 전환
      timer = setTimeout(() => setStep(3), 2000);
    }
    // 3번 화면 타이머 미작동

    return () => clearTimeout(timer);
  }, [step]);
  const currentLogo = step === 1 ? logoWhite : logoColored;

  return (
    <div className={`onboard-box step-${step}`}>
      {/* 1번 & 2번 화면: 로고만 있는 스플래시 */}
      {(step === 1 || step === 2) && (
        <div className="splash-content">
          <div
            className="onboard-logo-img"
            style={{ backgroundImage: `url(${currentLogo})` }}
          />
          <div className={`onboard-brand-text step-${step}`}></div>
        </div>
      )}

      {/* 3번 화면: 그라데이션 배경 + 문구 + 로그인 버튼 */}
      {step === 3 && (
        <div className="main-content fade-in">
          <p className="intro-text">
            나의 근무 스케줄에 맞춰
            <br />
            웰니스 루틴을 설계하는 AI
          </p>

          <div className="button-group">
            <button
              className="login-btn"
              onClick={() => navigate("/login")}
            >
              로그인
            </button>
            <div className="sub-links">
              <span>이용약관</span>
              <span className="highlight-group">
                및{" "}
                <span
                  className="highlight"
                  onClick={() => navigate("/signup")}
                >
                  회원가입
                </span>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
