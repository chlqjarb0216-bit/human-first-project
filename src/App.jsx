import "./App.css";
import { Routes, Route } from "react-router";

function App() {
    return (
        <>
            {/* 네비게이션 바를 둘 것인가 */}
            <Routes>
                {/* 메인페이지를 따로 만들것인가 아니면 물품리스트로 바로 넘어갈 것인가 */}
                <Route path="/" element={<div></div>} />

                {/* 로그인 및 회원가입 페이지 */}
                <Route path="/login" element={<div></div>} />

                {/* 중고거래 페이지 */}
                <Route path="/trade" element={<div></div>} />

                {/* 물품등록 페이지 */}
                <Route path="/trade-insert" element={<div></div>} />

                {/* 물품상세 페이지 */}
                <Route path="/trade-detail/:id" element={<div></div>} />

                {/* 채팅 - 페이지를 따로 만들지 팝업이나 모달로 만들지 */}
                <Route path="/chat" element={<div></div>} />

                {/* 여기부터 추가사항 */}
                {/* 경매 메인페이지 */}
                <Route path="/auction" element={<div></div>} />

                {/* 경매물품등록 페이지 */}
                <Route path="/auction-insert" element={<div></div>} />

                {/* 경매상세 페이지 */}
                <Route path="/auction-detail/:id" element={<div></div>} />

                {/* 거래 및 결제 및 택배등록 등등 */}
                <Route path="/final" element={<div></div>} />
            </Routes>

            {/* footer 필요하다면 */}
        </>
    );
}

export default App;
