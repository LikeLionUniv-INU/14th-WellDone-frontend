import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Onboarding() {
    const navigate = useNavigate();
    const scrollRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // 슬라이드 페이지 데이터
    const slides = [
        {
            text: "매번 바뀌는 교대근무,\n내게 맞지 않는 서비스로 지치셨나요?"
        },
        {
            text: "스케줄표 사진 한 장이면 끝!\n나의 근무 스케줄에 맞춰 웰니스 루틴을 설계하는 AI"
        },
        {
            text: "지친 일상을 케어해주는\n나만의 스마트한 헬스케어 루틴"
        }
    ];

    // 특정 인덱스로 스크롤
    const handleScrollTo = (index) => {
        if (scrollRef.current) {
            const width = scrollRef.current.clientWidth;
            scrollRef.current.scrollTo({
                left: width * index,
                behavior: 'smooth',
            });
            setCurrentIndex(index);
        }
    };

    // 스크롤 감지 이벤트
    const handleScroll = (e) => {
        const scrollLeft = e.target.scrollLeft;
        const width = e.target.clientWidth;
        const newIndex = Math.round(scrollLeft / width);
        if (newIndex !== currentIndex) {
            setCurrentIndex(newIndex);
        }
    };

    // 이전 슬라이드로 이동
    const handlePrev = () => {
        if (currentIndex > 0) {
            handleScrollTo(currentIndex - 1);
        }
    };

    // 다음 슬라이드로 이동
    const handleNext = () => {
        if (currentIndex < slides.length - 1) {
            handleScrollTo(currentIndex + 1);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#e0e0e0', minHeight: '100vh', justifyContent: 'center' }}>
            
            {/* 전체 모바일 목업 박스 */}
            <div style={{ width: '100%', maxWidth: '450px', height: '600px', background: '#fff', borderRadius: '30px', padding: '30px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
                
                {/* 1. 슬라이드 영역 */}
                <div 
                    ref={scrollRef}
                    onScroll={handleScroll}
                    style={{ display: 'flex', overflowX: 'auto', scrollSnapType: 'x mandatory', scrollbarWidth: 'none', width: '100%', flex: 1 }}
                >
                    {slides.map((slide, idx) => (
                        <div key={idx} style={{ flex: '0 0 100%', scrollSnapAlign: 'start', display: 'flex', flexDirection: 'column', alignItems: 'center', boxSizing: 'border-box' }}>
                            
                            {/* 그래픽 박스 */}
                            <div 
                                style={{ width: '100%', height: '320px', border: '1px solid #000', borderRadius: '8px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '20px', boxSizing: 'border-box' }}
                            >
                                {/* 상단 화살표 내비게이션 영역 */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                    {/* 왼쪽 화살표: 2번째, 3번째 슬라이드에만 출력 (idx > 0) */}
                                    {idx > 0 ? (
                                        <button 
                                            onClick={handlePrev}
                                            style={{ background: 'none', border: 'none', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer', padding: '4px 8px' }}
                                        >
                                            ←
                                        </button>
                                    ) : (
                                        <div style={{ width: '28px' }} /> /* 공간 맞춤용 빈 박스 */
                                    )}

                                    {/* 오른쪽 화살표: 1번째, 2번째 슬라이드에만 출력 (idx < slides.length - 1) */}
                                    {idx < slides.length - 1 ? (
                                        <button 
                                            onClick={handleNext}
                                            style={{ background: 'none', border: 'none', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer', padding: '4px 8px' }}
                                        >
                                            →
                                        </button>
                                    ) : (
                                        <div style={{ width: '28px' }} /> /* 공간 맞춤용 빈 박스 */
                                    )}
                                </div>

                                {/* 중앙 텍스트 */}
                                <div style={{ textAlign: 'center', fontSize: '14px', whiteSpace: 'pre-line', lineHeight: '1.4' }}>
                                    {slide.text}
                                </div>

                                <div style={{ height: '20px' }} /> {/* 하단 정렬용 공백 */}
                            </div>

                        </div>
                    ))}
                </div>

                {/* 2. 하단 인디케이터 점 */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', margin: '15px 0' }}>
                    {slides.map((_, idx) => (
                        <span 
                            key={idx} 
                            onClick={() => handleScrollTo(idx)}
                            style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: currentIndex === idx ? '#666' : '#cd6d6d',
                                cursor: 'pointer'
                            }}
                        />
                    ))}
                </div>

                {/* 3. 고정 로고 영역 */}
                <div style={{ textAlign: 'center', fontWeight: '900', fontSize: '32px', letterSpacing: '2px', margin: '10px 0 20px 0' }}>
                    LOGO
                </div>

                {/* 4. 고정 로그인 버튼 및 링크 */}
                <div>
                    <button onClick= {() => navigate("/login")}  style={{ width: '100%', padding: '14px', background: '#000', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '12px' }}>
                        로그인
                    </button>
                    <span>
                        이용약관
                        {/* 추후 이용약관 페이지 생기면 경로 추가 */}
                    </span>
                    <p> 및 </p>
                    <span onClick= {() => navigate("/signup")}>회원가입</span>
                </div>

            </div>
        </div>
    );
}