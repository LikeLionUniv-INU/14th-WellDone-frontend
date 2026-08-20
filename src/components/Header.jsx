import "../styles/Header.css";

const Header = ({ onOpenSettings }) => {
  return (
    <>
      <div className="headerbox">
        <img
          className="menu-icon"
          onClick={() => {
            onOpenSettings(); // Home에서 설정 모달 열기
          }}
          src="list.svg"
          alt="메뉴"
        />
        <img
          src="main_icon.svg"
          alt="well-done"
          className="logo"
        ></img>
      </div>
    </>
  );
};

export default Header;
