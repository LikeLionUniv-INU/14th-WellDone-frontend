<div align="center">

# 🌙 Well - Done

**나의 근무 스케줄에 맞춰 웰니스 루틴을 설계하는 AI 서비스**

교대 근무자(간호사, 생산직, 서비스직 등)를 위한 맞춤형 웰니스 루틴 추천 & 회복 관리 서비스

</div>

---

## 서비스 소개

`Well Done`은 **불규칙한 교대 근무로 자기관리가 어려운 사람들**을 위한 웰니스 루틴 서비스입니다.

일반적인 건강관리 앱은 "매일 아침 7시 기상, 매일 저녁 9시 취침"처럼 고정된 하루를 전제로 하지만, 3교대 근무자에게는 통하지 않습니다. Well Done은 사용자의 **실제 근무 스케줄(Day/Evening/Night/Off)을 입력받아, AI가 그 스케줄에 맞춘 웰니스 루틴을 1주일 단위로 제안**합니다.

- 출근 전/퇴근 후/취침 전 등 **근무 컨텍스트별로 다른 루틴**을 추천
- 매달 자동으로 생성되는 **AI 웰니스 리포트**로 지난달을 돌아보고, 다음 달의 회복 포인트를 미리 안내
- 같은 근무조(Day/Evening/Night/Off)끼리 소통할 수 있는 **듀티 라운지**로 동료애와 동기부여 제공

---


## 기술 스택

### Frontend
| 분류 | 기술 |
|---|---|
| Language | JavaScript (JSX) |
| Framework / Library | React |
| Build Tool | Vite |
| Routing | React Router DOM (`useNavigate`) |
| Network | Axios |
| Styling | CSS, Inline Styles |
| UI & Animation | Swiper, Framer Motion, Lucide React |
| Utility | Day.js, html2canvas |



### Infra / DevOps
| 분류 | 기술 |
|---|---|
| Hosting & Deploy | Vercel (GitHub 연동 자동 배포) |
| 협업 | GitHub, Notion|

---

## 아키텍처

```
[Client (Frontend, Vercel)]
        │  HTTPS
        ▼
[Nginx Reverse Proxy] ── SSL (Let's Encrypt via sslip.io)
        │
        ▼
[Spring Boot 4.0 (Gabia g-cloud, Ubuntu 22.04)]
        │
        ├── Supabase PostgreSQL (Session Pooler)
        └── Gemini API (AI 루틴 생성 / 월간 리포트 생성)
```

---

## 📋 API 구성 (총 32개)

| 도메인 | 설명 |
|---|---|
| Auth | 회원가입, 로그인 (마스터 계정 방식) |
| Onboarding | 스케줄 입력, 카테고리/취향 선택, AI 루틴 생성·제안·적용 |
| Home | 오늘의 루틴/일정, 웰니스 게이지, 루틴 시작·일시정지·완료·사진인증 |
| My | 주간 기록, 월간 AI 리포트(달성률/카테고리/골든타임/다음달 예측) |
| Lounge | 듀티 라운지 메인, 듀티톡 조회·작성, 리워드샵 |
| Settings | 스케줄표 갱신 요청 |

---

## 팀 구성

| Frontend | cy123-coder |

| Frontend | Slys0820 |

---

##  주요 화면 및 기능 

- **🌱 온보딩 (Onboarding)**
  - 내 실제 근무 스케줄(Day/Evening/Night/Off) 입력 및 맞춤형 취향 선택
  - 입력한 데이터를 바탕으로 AI 웰니스 루틴 생성 요청 및 적용

- **🏠 홈 탭 (Home)**
  - 출근 전 / 퇴근 후 / 취침 전 컨텍스트별 오늘의 루틴 및 일정 확인
  - 웰니스 게이지 실시간 확인 및 루틴 시작·일시정지·완료 처리
  - 인증 사진 업로드 기능

- **📊 마이 페이지 (My)**
  - 주간 기록 및 달성률 시각화
  - 월간 AI 리포트(달성률, 카테고리 분석, 골든타임, 다음 달 예측) 확인
  - **html2canvas**를 활용한 나만의 스케줄표 이미지 캡처 및 저장 기능

- **💬 듀티 라운지 (Lounge)**
  - 같은 근무조끼리 소통할 수 있는 듀티톡 조회 및 작성
  - 리워드샵 기능

---

## 📌 프로젝트 배경

해커톤이라는 제한된 시간 속에서, **교대 근무자의 사용자 경험(UX)을 직관적으로 전달하는 것**에 집중했습니다.
- 복잡한 3교대 스케줄과 캘린더 UI를 빠르고 안정적으로 구현하기 위해 **React와 Vite** 환경을 신속하게 구축
- 교대 근무자의 가독성과 몰입도를 높이기 위해 **Swiper**와 **Framer Motion**을 활용한 모바일 최적화 UI 및 애니메이션 적용
- 날짜 계산(`Day.js`)과 스케줄표 이미지 캡처/저장(`html2canvas`) 등 사용자 편의 기능을 실속 있게 구현하여 완성도 보완
