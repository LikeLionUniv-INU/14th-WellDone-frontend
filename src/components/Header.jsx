import "../styles/Header.css";

const Header = ({ onOpenSettings }) => {
  return (
    <>
      <div className="headerbox">
        <img
          className="menu-icon"
          onClick={() => {
            onOpenSettings();
          }}
          src="list.svg"
          alt="메뉴"
        />{" "}
        <div className="logo">로고</div>
      </div>
    </>
  );
};

export default Header;
