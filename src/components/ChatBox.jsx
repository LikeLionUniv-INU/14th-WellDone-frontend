import * as S from "../styles/ChatBoxStyle";

export default function ChatBox({ time, comment }) {
  return (
    <>
      <S.ChatLayout>
        <S.circle>
          <img
            style={{ width: "45%" }}
            src="Icon.svg"
            alt="사람"
          />
        </S.circle>
        <S.Text>{comment}</S.Text>
        <S.Time>{time}</S.Time>
      </S.ChatLayout>
    </>
  );
}
