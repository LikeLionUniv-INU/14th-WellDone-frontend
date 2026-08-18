import * as S from "../styles/DutyLounge"
import {  ChevronRight} from "lucide-react"; //  루시드 리엑트 라이브러리 에서 아이콘 가져오기 

function DutyLounge(){
    return(
        <>
        <S.MainLayout>
        <S.SrcLayout>
            <S.FirstLayout>
                <S.TitleLayout>
                    <S.Title>듀티 라운지</S.Title>
                    <S.SubTitle>전국의 동료들과 함께 <br/> 웰니스 게이지를 채워보세요!</S.SubTitle>
                </S.TitleLayout>

                <S.PointBox>💎 300P</S.PointBox>
            </S.FirstLayout>
            <S.ChallengBox>
                <S.ChSrcLayout>
                <S.TeamLayout>
                    <S.TeamBox>
                        <S.TeamName>Team NIGHT</S.TeamName>
                        <S.Type>NIGHT</S.Type>
                    </S.TeamBox>

                    <S.MoreBtn>상세 보기  <ChevronRight size = {16}/> </S.MoreBtn>


                </S.TeamLayout>

                  <div style={{ backgroundColor :"#D2D0D0", height: "1px", width : "100%",flex: "none" , margin : "10px 0"  }}></div>
                  </S.ChSrcLayout>
            </S.ChallengBox>


            <S.TalkBox>
               <S.ChSrcLayout>
                <S.TalkTitle>
                  실시간 듀티톡 LIVE 
                </S.TalkTitle>
              </S.ChSrcLayout>
            </S.TalkBox>


        </S.SrcLayout>
        </S.MainLayout>
        
        </>
    );
}

export default DutyLounge;