import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 경로가 변경될 때마다 화면 최상단(0, 0)으로 이동
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // 화면에 렌더링할 요소는 없음
}

export default ScrollToTop;