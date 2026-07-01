import "../csss/MyPage.css";
import "../csss/userForm.css";
import "../csss/alert.css";
import { Container, Nav, Form, InputGroup, Button, Accordion, Badge, Alert } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import defualtProfile from "../assets/vite.svg";
import storage from "../pure_functions/storage";

const false5 = [false, false, false, false, false];
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

function MyPage(props) {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("home");
    const [shows, setShows] = useState(false5);
    const [confirmedNick, setConfirmedNick] = useState(props.loginUser?.nickName);
    const [confirmedEMail, setConfirmedEMail] = useState(props.loginUser?.email);

    const nameRef = useRef(null);
    const nickRef = useRef(null);
    const emailRef = useRef(null);
    const passwordChangeRef = useRef(null);
    const passChangeConfirmRef = useRef(null);
    const passwordInfoRef = useRef(null);
    const passwordRef = useRef(null);

    useEffect(() => {
        if (shows.every((show) => !show)) return;

        const timer = setTimeout(() => {
            setShows(false5);
        }, 3000);

        return () => clearTimeout(timer);
    }, [shows]);
    useEffect(() => {
        if (props.loginUser === null) {
            navigate("/");
        }
    }, [navigate, props.loginUser]);
    if (props.loginUser === null) return;

    const loginUser = props.loginUser;

    const registedListKey = 'registedList'
    const registedList = storage.get(registedListKey,[])

    const handleCheckPassword = () => {
        if (!passwordRegex.test(passwordChangeRef.current.value.trim())) {
            passwordInfoRef.current.style.setProperty("background-color", "pink");
            setTimeout(() => {
                passwordInfoRef.current.style.setProperty("background-color", "white");
            }, 3000);
            return false;
        }
        return true;
    };

    const handleRegisterChange = (e) => {
        e.preventDefault();

        if (nameRef.current.value.trim() == "") {
            const tmp = [...shows];
            tmp[0] = true;
            setShows(tmp);
            nameRef.current.focus();
            nameRef.current.classList.toggle("form-alert-bc-pink");
            setTimeout(() => {
                nameRef.current.classList.toggle("form-alert-bc-pink");
            }, 3000);
        } else if (confirmedNick == "" || confirmedNick != nickRef.current.value) {
            nickRef.current.style.setProperty("background-color", "white");
            const tmp = [...shows];
            tmp[1] = true;
            setShows(tmp);
            nickRef.current.focus();
            nickRef.current.classList.toggle("form-alert-bc-pink");
            setTimeout(() => {
                nickRef.current.classList.toggle("form-alert-bc-pink");
            }, 3000);
        } else if (confirmedEMail == "" || confirmedEMail != emailRef.current.value.trim().toLowerCase()) {
            const tmp = [...shows];
            tmp[2] = true;
            setShows(tmp);
            emailRef.current.focus();
            emailRef.current.classList.toggle("form-alert-bc-pink");
            setTimeout(() => {
                emailRef.current.classList.toggle("form-alert-bc-pink");
            }, 3000);
        } else if (passwordChangeRef.current.value.trim() != "" && !handleCheckPassword()) {
            return;
        } else if (passChangeConfirmRef.current.value != passwordChangeRef.current.value) {
            const tmp = [...shows];
            tmp[3] = true;
            setShows(tmp);
            passChangeConfirmRef.current.focus();
            passChangeConfirmRef.current.classList.toggle("form-alert-bc-pink");
            setTimeout(() => {
                passChangeConfirmRef.current.classList.toggle("form-alert-bc-pink");
            }, 3000);
        } else if (
            nameRef.current.value.trim() === loginUser.name &&
            confirmedNick === loginUser.nickName &&
            confirmedEMail === loginUser.email &&
            passChangeConfirmRef.current.value.trim() === ""
        ) {
            alert("변경된 사항이 없습니다. 마이페이지 홈으로 돌아갑니다");
            setActiveTab("home");
        } else if (passwordRef.current.value.trim() === "") {
            const tmp = [...shows];
            tmp[4] = true;
            setShows(tmp);
            passwordRef.current.focus();
            passwordRef.current.classList.toggle("form-alert-bc-pink");
            setTimeout(() => {
                passwordRef.current.classList.toggle("form-alert-bc-pink");
            }, 3000);
        } else if (passwordRef.current.value.trim() !== loginUser.password) {
            alert("비밀번호를 다시 확인해주세요");
            passwordRef.current.focus();
            passwordRef.current.classList.toggle("form-alert-bc-pink");
            setTimeout(() => {
                passwordRef.current.classList.toggle("form-alert-bc-pink");
            }, 3000);
        } else {
            const registerChangeData = {
                ...loginUser,
                name: nameRef.current.value.trim(),
                nickName: confirmedNick,
                email: confirmedEMail,
                password:
                    passwordChangeRef.current.value.trim() !== ""
                        ? passwordChangeRef.current.value.trim()
                        : passwordRef.current.value.trim(),
            };

            const userIdx = registedList.findIndex((item) => item.email === loginUser.email);

            registedList.splice(userIdx, 1, registerChangeData);
            storage.set(registedListKey, registedList)

            props.setLoginUser(registerChangeData);

            alert("회원정보가 성공적으로 변경되었습니다.");

            setActiveTab("home");
        }
    };

    const handleCheckNick = (nickName) => {
        const same = registedList.find((item) => {
            return item.nickName === nickName;
        });
        if (same === undefined) return true;
        return false;
    };

    const handleCheckEmail = () => {
        if (!emailRef.current.validity.valid || emailRef.current.value.trim() == "") {
            if (!emailRef.current.value.trim()) {
                alert("이메일을 입력해주세요");
            }
            emailRef.current.reportValidity();
            return false;
        } else {
            const same = registedList.find((item) => item.email === emailRef.current.value.trim().toLowerCase());
            if (same !== undefined) {
                alert("이미 등록된 이메일입니다");
                return false;
            }
        }
        return true;
    };

    return (
        <div style={{ display: "flex", height: "300vh" }}>
            <Nav
                activeKey={activeTab}
                onSelect={(selectedkey) => {
                    setActiveTab(selectedkey);
                }}
                className="flex-column"
                style={{ width: "12rem", height: "fit-content", margin: "3rem 1rem", position: "sticky", top: "3rem" }}>
                <Nav.Link
                    eventKey="home"
                    className="nav-link-mypage"
                    style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                    마이페이지
                </Nav.Link>
                <hr />
                <Nav.Link eventKey="modify" className="mb-4 nav-link-mypage">
                    회원정보 수정
                </Nav.Link>
                <Nav.Link eventKey="post-list" className="mb-4 nav-link-mypage">
                    작성한 글목록
                </Nav.Link>
                <Nav.Link eventKey="trade-history" className="mb-2 nav-link-mypage">
                    거래내역
                </Nav.Link>
                <hr />
                <Nav.Link
                    as={Link}
                    to="/"
                    onClick={() => {
                        props.setLoginUser(null);
                    }}
                    className="nav-link-mypage-logout">
                    로그아웃
                </Nav.Link>
            </Nav>
            <Container style={{ margin: "1rem" }}>
                {activeTab === "home" && (
                    <div style={{ textAlign: "start" }}>
                        <h1>마이페이지</h1>
                        <hr />
                        <div className="default-boarder mb-5" style={{ display: "flex", alignItems: "center" }}>
                            <img
                                src={defualtProfile}
                                alt=""
                                style={{ width: "8rem", height: "8rem", borderRadius: "50%", margin: "1rem" }}
                            />
                            <div style={{ margin: "2rem" }}>
                                <h4 className="my-4">
                                    <strong>{props.loginUser.nickName}</strong>님 안녕하세요!
                                </h4>
                                <p>가입날짜: {props.loginUser.registedDate}</p>
                            </div>
                        </div>

                        <h3>최근 활동</h3>
                        <div className="default-boarder">
                            <div
                                className="default-boarder m-1 p-1"
                                style={{ display: "flex", justifyContent: "space-between" }}>
                                <span>거래가 완료되었습니다.</span>
                                <span>3시간전</span>
                            </div>
                            <div
                                className="default-boarder m-1 p-1"
                                style={{ display: "flex", justifyContent: "space-between" }}>
                                <span>물건을 등록하였습니다.</span>
                                <span>1일전</span>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === "modify" && (
                    <div style={{ textAlign: "start" }}>
                        <h1>회원 정보 수정</h1>
                        <hr />
                        <Form onSubmit={handleRegisterChange} style={{ width: "30rem" }}>
                            <Form.Group className="mb-3 form-group-align-left" controlId="formName">
                                <Form.Label>이름</Form.Label>
                                <Form.Control
                                    ref={nameRef}
                                    type="text"
                                    placeholder="이름을 입력해주세요"
                                    className="placeholder-lightgray"
                                    defaultValue={props.loginUser.name}
                                />
                                {shows[0] && (
                                    <Alert
                                        variant="danger"
                                        onClose={() => setShows(false5)}
                                        dismissible
                                        className="alert-xs text-center">
                                        이름을 입력해주세요
                                    </Alert>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3 form-group-align-left" controlId="formNickname">
                                <Form.Label>닉네임</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        ref={nickRef}
                                        type="text"
                                        placeholder="닉네임을 입력해주세요"
                                        className="placeholder-lightgray"
                                        defaultValue={props.loginUser.nickName}
                                    />
                                    <Button
                                        variant="outline-dark"
                                        onClick={() => {
                                            if (nickRef.current.value.trim() == "") {
                                                alert("닉네임을 입력해주세요");
                                                nickRef.current.style.setProperty("background-color", "white");
                                            } else if (!handleCheckNick(nickRef.current.value.trim())) {
                                                alert("이미 등록된 닉네임입니다");
                                                nickRef.current.style.setProperty("background-color", "white");
                                            } else {
                                                setConfirmedNick(nickRef.current.value.trim());
                                                nickRef.current.style.setProperty("background-color", "lightgreen");
                                            }
                                        }}>
                                        닉네임 중복확인
                                    </Button>
                                </InputGroup>
                                {shows[1] && (
                                    <Alert
                                        variant="danger"
                                        onClose={() => setShows(false5)}
                                        dismissible
                                        className="alert-xs text-center">
                                        닉네임 중복확인을 진행해주세요
                                    </Alert>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3 form-group-align-left" controlId="formEmail">
                                <Form.Label>이메일</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        ref={emailRef}
                                        type="email"
                                        placeholder="이메일을 입력해주세요"
                                        className="placeholder-lightgray"
                                        defaultValue={props.loginUser.email}
                                    />
                                    <Button
                                        variant="outline-dark"
                                        onClick={() => {
                                            if (handleCheckEmail()) {
                                                setConfirmedEMail(emailRef.current.value.trim().toLowerCase());
                                                emailRef.current.style.setProperty("background-color", "lightgreen");
                                                emailRef.current.disabled = true;
                                            }
                                        }}>
                                        이메일 확인
                                    </Button>
                                </InputGroup>
                                {shows[2] && (
                                    <Alert
                                        variant="danger"
                                        onClose={() => setShows(false5)}
                                        dismissible
                                        className="alert-xs text-center">
                                        이메일 확인을 진행해주세요
                                    </Alert>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-0 form-group-align-left" controlId="formPasswordChange">
                                <Form.Label>비밀번호 변경</Form.Label>
                                <Form.Control
                                    ref={passwordChangeRef}
                                    type="password"
                                    placeholder="비밀번호를 변경하려면 입력해주세요"
                                    className="placeholder-lightgray"
                                />
                            </Form.Group>
                            <p ref={passwordInfoRef} style={{ fontSize: "0.7rem", color: "gray", textAlign: "start" }}>
                                ※비밀번호는 알파벳 대소문자 및 특수문자를 포함한 8자 이상이어야합니다.
                            </p>

                            <Form.Group className="mb-3 form-group-align-left" controlId="formPasswordConfirm">
                                <Form.Label>비밀번호 확인</Form.Label>
                                <Form.Control
                                    ref={passChangeConfirmRef}
                                    type="password"
                                    placeholder="비밀번호를 다시 입력해주세요"
                                    className="placeholder-lightgray"
                                />
                                {shows[3] && (
                                    <Alert
                                        variant="danger"
                                        onClose={() => setShows(false5)}
                                        dismissible
                                        className="alert-xs text-center">
                                        비밀번호가 일치하지 않습니다.
                                    </Alert>
                                )}
                            </Form.Group>
                            <hr />
                            <Form.Group className="mb-3 form-group-align-left" controlId="formPassword">
                                <Form.Label>수정내용을 등록하기 위해 원래 비밀번호를 입력해주세요</Form.Label>
                                <Form.Control
                                    ref={passwordRef}
                                    type="password"
                                    placeholder="비밀번호를 입력해주세요"
                                    className="placeholder-lightgray"
                                />
                                {shows[4] && (
                                    <Alert
                                        variant="danger"
                                        onClose={() => setShows(false5)}
                                        dismissible
                                        className="alert-xs text-center">
                                        비밀번호를 입력해주세요
                                    </Alert>
                                )}
                            </Form.Group>
                            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                                <Button variant="primary" type="submit" size="lg" style={{ margin: "1rem" }}>
                                    수정한 정보로 등록
                                </Button>
                                <Button
                                    onClick={() => {
                                        setActiveTab("home");
                                    }}
                                    variant="danger"
                                    type="button"
                                    size="lg"
                                    style={{ margin: "1rem" }}>
                                    취소
                                </Button>
                            </div>
                        </Form>
                    </div>
                )}
                {activeTab === "post-list" && (
                    <div style={{ textAlign: "start" }}>
                        <h1>작성한 글목록</h1>
                        <hr />
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>
                                    <div
                                        className="px-1"
                                        style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                                        <span>제목1</span>
                                        <span>####년##월##일</span>
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <img src="" alt="" />
                                    <p>
                                        본문내용1 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero
                                        laudantium ea sapiente, atque praesentium aliquid porro velit dolore explicabo,
                                        natus iusto ducimus aperiam nemo a optio blanditiis eos delectus adipisci!
                                    </p>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>
                                    <div
                                        className="px-1"
                                        style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                                        <span>제목2</span>
                                        <span>####년##월##일</span>
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <img src="" alt="" />
                                    <p>
                                        본문내용2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
                                        voluptatibus reprehenderit ex quo qui eligendi ullam cupiditate officia suscipit
                                        perspiciatis incidunt dolorum unde, consectetur voluptate commodi beatae
                                        temporibus et? Eius?
                                    </p>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                )}
                {activeTab === "trade-history" && (
                    <div style={{ textAlign: "start" }}>
                        <h1>거래내역</h1>
                        <hr />
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>
                                    <div
                                        className="px-1"
                                        style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                                        <span>
                                            <Badge bg="primary" className="me-3" style={{ display: "inline-block" }}>
                                                구매
                                            </Badge>
                                            제목1
                                        </span>
                                        <span>####년##월##일</span>
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <img src="" alt="" />
                                    <p>
                                        본문내용1 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero
                                        laudantium ea sapiente, atque praesentium aliquid porro velit dolore explicabo,
                                        natus iusto ducimus aperiam nemo a optio blanditiis eos delectus adipisci!
                                    </p>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>
                                    <div
                                        className="px-1"
                                        style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                                        <span>
                                            <Badge bg="danger" className="me-3" style={{ display: "inline-block" }}>
                                                판매
                                            </Badge>
                                            제목2
                                        </span>
                                        <span>####년##월##일</span>
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <img src="" alt="" />
                                    <p>
                                        본문내용2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
                                        voluptatibus reprehenderit ex quo qui eligendi ullam cupiditate officia suscipit
                                        perspiciatis incidunt dolorum unde, consectetur voluptate commodi beatae
                                        temporibus et? Eius?
                                    </p>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                )}
            </Container>
        </div>
    );
}

export default MyPage;
