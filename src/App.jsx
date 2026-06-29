import "./App.css";
import { Routes, Route, Link, useNavigate } from "react-router";
import { Button, Container, Form, Nav, Navbar, Offcanvas } from "react-bootstrap";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage";
import MainSecondHand from "./pages/MainSecondHand";
import TradeCategoty from "./pages/TradeCategory";
import { useState } from "react";
import defualtProfile from "./assets/vite.svg";
import TradeDetail from "./pages/TradeDetail";

function App() {
    const [loginUser, setLoginUser] = useState(null);
    console.log(loginUser);

    return (
        <>
            {/* 네비게이션 바를 둘 것인가 */}
            <NavgationBar loginUser={loginUser} setLoginUser={setLoginUser} />
            <Routes>
                {/* 메인페이지를 따로 만들것인가 아니면 물품리스트로 바로 넘어갈 것인가 */}
                <Route path="/" element={<MainPage />} />

                {/* 로그인 페이지 */}
                <Route path="/login" element={<LoginPage setLoginUser={setLoginUser} />} />

                {/* 회원가입 페이지 */}
                <Route path="/register" element={<RegisterPage setLoginUser={setLoginUser} />} />

                {/* 로그인 했다면 마이 페이지 */}
                <Route path="/mypage" element={<MyPage loginUser={loginUser} setLoginUser={setLoginUser} />} />

                {/* 고객센터 페이지 */}
                <Route path="/customer-service" element={<div></div>} />

                {/* 통합/중고/경매 검색 페이지 */}
                <Route path="/search" element={<div></div>} />

                {/* 중고거래 페이지 */}
                <Route path="/MainSecondHand" element={<MainSecondHand />} />

                {/* 중고물품등록 페이지 */}
                <Route path="/trade-insert" element={<div></div>} />

                {/* 중고거래 카테고리 페이지 */}
                <Route path="/trade-category/:category" element={<TradeCategoty />} />

                {/* 중고물품상세 페이지 */}
                <Route path="/trade-detail/:id" element={<div></div>} />

                {/* 채팅 - 페이지를 따로 만들지 팝업이나 모달로 만들지 */}
                <Route path="/chat" element={<div></div>} />

                {/* 여기부터 추가사항 */}
                {/* 경매 메인페이지 */}
                <Route path="/auction" element={<div></div>} />

                {/* 경매물품등록 페이지 */}
                <Route path="/auction-insert" element={<div></div>} />

                {/* 경매 카테고리 페이지 */}
                <Route path="/auction-category" element={<div></div>} />

                {/* 경매상세 페이지 */}
                <Route path="/auction-detail/:id" element={<div></div>} />

                {/* 거래 및 결제 및 택배등록 등등 */}
                <Route path="/final" element={<div></div>} />

                {/* 잘못된 url */}
                <Route path="/*" element={<div></div>} />
            </Routes>

            {/* footer 필요하다면 */}
        </>
    );
}

export default App;

function NavgationBar(props) {
    const [isProfileHovered, setIsProfileHovered] = useState(false);
    const navigate = useNavigate();

    const expand = "md";

    return (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
            <Container fluid>
                <Navbar.Brand href="#">로고</Navbar.Brand>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-${expand}`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                    placement="end">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>Offcanvas</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-start flex-grow-1 pe-3">
                            <Nav.Link href="#action1">중고거래</Nav.Link>
                            <Nav.Link href="#action2">경매</Nav.Link>
                            <Nav.Link href="#action2">고객센터</Nav.Link>
                        </Nav>
                        <Form className="d-flex" style={{ margin: "0 1rem" }}>
                            <Form.Select
                                aria-label="Default select example"
                                className="ms-3 w-auto"
                                style={{ margin: "0 1rem" }}>
                                <option>통합검색</option>
                                <option value="1">통합검색</option>
                                <option value="2">중고검색</option>
                                <option value="3">경매검색</option>
                            </Form.Select>
                            <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                        {!props.loginUser ? (
                            <Nav className="justify-content-start flex-grow-1 pe-3">
                                <Nav.Link as={Link} to="/login" style={{ wordBreak: "keep-all" }}>
                                    로그인
                                </Nav.Link>
                            </Nav>
                        ) : (
                            <div
                                onMouseEnter={() => setIsProfileHovered(true)}
                                onMouseLeave={() => setIsProfileHovered(false)}
                                style={{ position: "relative", display: "inline-block" }}>
                                <img
                                    src={defualtProfile}
                                    alt=""
                                    onClick={() => navigate("/mypage")}
                                    style={{
                                        height: "2.5rem",
                                        aspectRatio: "1/1",
                                        borderRadius: "50%",
                                        cursor: "pointer",
                                    }}
                                />

                                {isProfileHovered && (
                                    <ul
                                        style={{
                                            position: "absolute",
                                            top: "100%",
                                            right: 0,
                                            listStyle: "none",
                                            padding: "0.6rem 0",
                                            margin: "0",
                                            zIndex: "10",
                                            width: "max-content",
                                            whiteSpace: "nowrap",
                                            textAlign: "center",
                                        }}>
                                        <div
                                            style={{
                                                border: "1px solid #ddd",
                                                borderRadius: "5%",
                                                boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                                                backgroundColor: "white",
                                                padding: "0.5rem",
                                            }}>
                                            <li
                                                style={{
                                                    padding: "0.5rem 0.75rem",
                                                    fontWeight: "bold",
                                                }}>
                                                <Link to="/mypage" style={{ textDecoration: "none", color: "black" }}>
                                                    마이페이지
                                                </Link>
                                            </li>
                                            <li
                                                onClick={() => {
                                                    props.setLoginUser(null);
                                                }}
                                                style={{ padding: "0.5rem 0.75rem", color: "red", cursor: "pointer" }}>
                                                로그아웃
                                            </li>
                                        </div>
                                    </ul>
                                )}
                            </div>
                        )}
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}
