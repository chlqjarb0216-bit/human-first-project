import "../csss/MyPage.css";
import "../csss/userForm.css";
import "../csss/alert.css";
import { Container, Nav, Form, InputGroup, Button, Accordion, Badge, Alert } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import defualtProfile from "../assets/vite.svg";
import storage from "../pure_functions/storage";
import keys from "../datas/localStorageKeys.json";
import getPastTime from "../pure_functions/getPastTime";
import nowDate from "../pure_functions/nowDate";

const false7 = [false, false, false, false, false, false, false];
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

function MyPage(props) {
    const itemList = storage.get(keys.tradeItemListKey);

    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("home");
    const [shows, setShows] = useState(false7);
    const [confirmedNick, setConfirmedNick] = useState(props.loginUser?.nickName);
    const [confirmedEMail, setConfirmedEMail] = useState(props.loginUser?.email);
    // 현재 열어둘 아코디언의 eventKey를 관리하는 상태
    const [activePostKey, setActivePostKey] = useState(null);
    const [activeTradeHistoryKey, setActiveTradeHistoryKey] = useState(null);

    const nameRef = useRef(null);
    const nickRef = useRef(null);
    const emailRef = useRef(null);
    const passwordChangeRef = useRef(null);
    const passChangeConfirmRef = useRef(null);
    const passwordInfoRef = useRef(null);
    const passwordRef = useRef(null);
    const postNumRef = useRef(null);
    const addressRef = useRef(null);

    useEffect(() => {
        if (shows.every((show) => !show)) return;

        const timer = setTimeout(() => {
            setShows(false7);
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

    const registedList = storage.get(keys.registedUserListKey, []);

    let recentActivity = [];
    // 1. 등록한 아이템 순회 및 방어 코드 추가
    if (props.loginUser?.items) {
        props.loginUser.items.forEach((id) => {
            const foundItem = itemList.find((item) => item.id === id);

            // 아이템을 정상적으로 찾았을 때만 배열에 추가합니다 (에러 원천 차단)
            if (foundItem) {
                recentActivity.push({
                    id: id,
                    time: foundItem.등록일시, // 구조에 맞게 배열 형태 ["날짜", "시간"]가 들어감
                    type: "register", // 나중에 화면에서 '등록'인지 '거래'인지 구분용 타입 (선택)
                });
            }
        });
    }
    // 2. 거래 히스토리 순회
    if (props.loginUser?.tradeHistory) {
        props.loginUser.tradeHistory.forEach((history) => {
            recentActivity.push({
                id: history.itemId,
                time: history.time, // 구조에 맞게 배열 형태 ["날짜", "시간"]가 들어감
                type: history.side, // "sell" 또는 "buy" 구분용 (선택)
            });
        });
    }
    // 💡 최근 활동 배열을 날짜/시간 기준 최신순(내림차순)으로 정렬
    recentActivity.sort((a, b) => {
        const timeA = new Date(`${a.time[0]}T${a.time[1]}`);
        const timeB = new Date(`${b.time[0]}T${b.time[1]}`);
        return timeB - timeA; // 최신순 정렬
    });

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
        } else if (postNumRef.current.value.trim() == "") {
            const tmp = [...shows];
            tmp[3] = true;
            setShows(tmp);
            postNumRef.current.focus();
            postNumRef.current.classList.toggle("form-alert-bc-pink");
            setTimeout(() => {
                postNumRef.current.classList.toggle("form-alert-bc-pink");
            }, 3000);
        } else if (addressRef.current.value.trim() == "") {
            const tmp = [...shows];
            tmp[4] = true;
            setShows(tmp);
            addressRef.current.focus();
            addressRef.current.classList.toggle("form-alert-bc-pink");
            setTimeout(() => {
                addressRef.current.classList.toggle("form-alert-bc-pink");
            }, 3000);
        } else if (passwordChangeRef.current.value.trim() != "" && !handleCheckPassword()) {
            return;
        } else if (passChangeConfirmRef.current.value != passwordChangeRef.current.value) {
            const tmp = [...shows];
            tmp[5] = true;
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
            postNumRef.current.value.trim() === loginUser.postNum &&
            addressRef.current.value.trim() === loginUser.address &&
            passChangeConfirmRef.current.value.trim() === ""
        ) {
            alert("변경된 사항이 없습니다. 마이페이지 홈으로 돌아갑니다");
            setActiveTab("home");
        } else if (passwordRef.current.value.trim() === "") {
            const tmp = [...shows];
            tmp[6] = true;
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
                postNum: postNumRef.current.value.trim(),
                address: addressRef.current.value.trim(),
                password:
                    passwordChangeRef.current.value.trim() !== ""
                        ? passwordChangeRef.current.value.trim()
                        : passwordRef.current.value.trim(),
            };

            const userIdx = registedList.findIndex((item) => item.email === loginUser.email);

            registedList.splice(userIdx, 1, registerChangeData);
            storage.set(keys.registedUserListKey, registedList);

            props.setLoginUser(registerChangeData);

            storage.set(keys.currentUser, { user: { ...registerChangeData }, time: nowDate() });

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
                    setActivePostKey(null);
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
                        storage.set(keys.currentUser, null);
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
                            {recentActivity.length === 0 ? (
                                <>
                                    <div
                                        className="default-boarder m-1 p-1 abc"
                                        style={{ display: "flex", justifyContent: "space-between" }}>
                                        <span>거래가 완료되었습니다.</span>
                                        <span>3시간전</span>
                                    </div>
                                    <div
                                        className="default-boarder m-1 p-1"
                                        style={{ display: "flex", justifyContent: "space-between" }}>
                                        <span>물품을 등록하였습니다.</span>
                                        <span>1일전</span>
                                    </div>
                                </>
                            ) : (
                                recentActivity.map((activity) => {
                                    return (
                                        <div
                                            key={activity.time[0] + activity.time[1]}
                                            className="default-boarder m-1 p-1"
                                            onClick={() => {
                                                if (activity.type === "register") {
                                                    setActiveTab("post-list");
                                                    setActivePostKey(activity.id);
                                                } else {
                                                    setActiveTab("trade-history");
                                                    setActiveTradeHistoryKey(activity.id);
                                                }
                                            }}
                                            style={{ display: "flex", justifyContent: "space-between" }}>
                                            {activity.type === "register" ? (
                                                <>
                                                    <span>물품을 등록하였습니다.</span>
                                                    <span>{getPastTime(activity.time)}</span>
                                                </>
                                            ) : (
                                                <>
                                                    <div>
                                                        <Badge
                                                            bg={activity.type === "buy" ? "primary" : "danger"}
                                                            className="me-3"
                                                            style={{ display: "inline-block" }}>
                                                            {activity.type === "buy" ? "구매" : "판매"}
                                                        </Badge>
                                                        <span>거래가 완료되었습니다.</span>
                                                    </div>
                                                    <span>{getPastTime(activity.time)}</span>
                                                </>
                                            )}
                                        </div>
                                    );
                                })
                            )}
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
                                        onClose={() => setShows(false7)}
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
                                        onClose={() => setShows(false7)}
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
                                        onClose={() => setShows(false7)}
                                        dismissible
                                        className="alert-xs text-center">
                                        이메일 확인을 진행해주세요
                                    </Alert>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3 form-group-align-left" controlId="formPostNum">
                                <Form.Label>우편번호</Form.Label>
                                <Form.Control
                                    ref={postNumRef}
                                    type="number"
                                    placeholder="우편번호를 입력해주세요"
                                    className="placeholder-lightgray"
                                    defaultValue={props.loginUser.postNum}
                                />
                                {shows[3] && (
                                    <Alert
                                        variant="danger"
                                        onClose={() => setShows(false7)}
                                        dismissible
                                        className="alert-xs text-center">
                                        우편번호를 입력해주세요
                                    </Alert>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3 form-group-align-left" controlId="formAddress">
                                <Form.Label>주소</Form.Label>
                                <Form.Control
                                    ref={addressRef}
                                    type="text"
                                    placeholder="주소를 입력해주세요"
                                    className="placeholder-lightgray"
                                    defaultValue={props.loginUser.address}
                                />
                                {shows[4] && (
                                    <Alert
                                        variant="danger"
                                        onClose={() => setShows(false7)}
                                        dismissible
                                        className="alert-xs text-center">
                                        주소를 입력해주세요
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
                                {shows[5] && (
                                    <Alert
                                        variant="danger"
                                        onClose={() => setShows(false7)}
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
                                {shows[6] && (
                                    <Alert
                                        variant="danger"
                                        onClose={() => setShows(false7)}
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
                        <Accordion activeKey={activePostKey} onSelect={(key) => setActivePostKey(key)}>
                            {(props.loginUser.items ?? []).length === 0 ? (
                                <>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>
                                            <div
                                                className="px-1"
                                                style={{
                                                    width: "100%",
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                }}>
                                                <span>제목1</span>
                                                <span>####년##월##일</span>
                                            </div>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <p>
                                                본문내용1 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero
                                                laudantium ea sapiente, atque praesentium aliquid porro velit dolore
                                                explicabo, natus iusto ducimus aperiam nemo a optio blanditiis eos
                                                delectus adipisci!
                                            </p>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>
                                            <div
                                                className="px-1"
                                                style={{
                                                    width: "100%",
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                }}>
                                                <span>제목2</span>
                                                <span>####년##월##일</span>
                                            </div>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <p>
                                                본문내용2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
                                                voluptatibus reprehenderit ex quo qui eligendi ullam cupiditate officia
                                                suscipit perspiciatis incidunt dolorum unde, consectetur voluptate
                                                commodi beatae temporibus et? Eius?
                                            </p>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </>
                            ) : (
                                props.loginUser.items.map((id) => {
                                    const item = itemList.find((it) => it.id === id);
                                    if (!item) return;
                                    return (
                                        <Accordion.Item key={id} eventKey={id}>
                                            <Accordion.Header>
                                                <div
                                                    className="px-1"
                                                    style={{
                                                        width: "100%",
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                    }}>
                                                    <span>{item.제목}</span>
                                                    <span>{item.등록일시[0]}</span>
                                                </div>
                                            </Accordion.Header>
                                            <Accordion.Body
                                                style={{
                                                    overflow: "hidden",
                                                    display: "flex",
                                                }}>
                                                <img src={"/images/" + item.img} alt="" style={{ margin: "0 2rem" }} />
                                                <div
                                                    style={{
                                                        position: "relative",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        flex: 1,
                                                    }}>
                                                    <h3>카테고리: {item.카테고리}</h3>
                                                    <h4>품목: {item.품목}</h4>
                                                    <h5>태그: {item.태그}</h5>
                                                    <h3>가격: {item.가격}</h3>
                                                    <h6>상세설명: {item.상세설명}</h6>
                                                    <Button
                                                        onClick={() => navigate("/trade-detail/" + id)}
                                                        style={{ marginTop: "auto", marginLeft: "auto" }}>
                                                        페이지로 이동
                                                    </Button>
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    );
                                })
                            )}
                        </Accordion>
                    </div>
                )}
                {activeTab === "trade-history" && (
                    <div style={{ textAlign: "start" }}>
                        <h1>거래내역</h1>
                        <hr />
                        <Accordion activeKey={activeTradeHistoryKey} onSelect={(key) => setActiveTradeHistoryKey(key)}>
                            {(props.loginUser.tradeHistory ?? []).length === 0 ? (
                                <>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>
                                            <div
                                                className="px-1"
                                                style={{
                                                    width: "100%",
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                }}>
                                                <span>
                                                    <Badge
                                                        bg="primary"
                                                        className="me-3"
                                                        style={{ display: "inline-block" }}>
                                                        구매
                                                    </Badge>
                                                    제목1
                                                </span>
                                                <span>####년##월##일</span>
                                            </div>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <p>
                                                본문내용1 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero
                                                laudantium ea sapiente, atque praesentium aliquid porro velit dolore
                                                explicabo, natus iusto ducimus aperiam nemo a optio blanditiis eos
                                                delectus adipisci!
                                            </p>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>
                                            <div
                                                className="px-1"
                                                style={{
                                                    width: "100%",
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                }}>
                                                <span>
                                                    <Badge
                                                        bg="danger"
                                                        className="me-3"
                                                        style={{ display: "inline-block" }}>
                                                        판매
                                                    </Badge>
                                                    제목2
                                                </span>
                                                <span>####년##월##일</span>
                                            </div>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <p>
                                                본문내용2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
                                                voluptatibus reprehenderit ex quo qui eligendi ullam cupiditate officia
                                                suscipit perspiciatis incidunt dolorum unde, consectetur voluptate
                                                commodi beatae temporibus et? Eius?
                                            </p>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </>
                            ) : (
                                props.loginUser.tradeHistory.map((th) => {
                                    const item = itemList.find((it) => it.id === th.itemId);
                                    if (!item) return;
                                    return (
                                        <Accordion.Item eventKey={th.itemId}>
                                            <Accordion.Header>
                                                <div
                                                    className="px-1"
                                                    style={{
                                                        width: "100%",
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                    }}>
                                                    <span>
                                                        <Badge
                                                            bg={th.side === "buy" ? "primary" : "danger"}
                                                            className="me-3"
                                                            style={{ display: "inline-block" }}>
                                                            {th.side === "buy" ? "구매" : "판매"}
                                                        </Badge>
                                                        {item.제목}
                                                    </span>
                                                    <span>{th.time[0]}</span>
                                                </div>
                                            </Accordion.Header>
                                            <Accordion.Body
                                                style={{
                                                    overflow: "hidden",
                                                    display: "flex",
                                                }}>
                                                <img src={"/images/" + item.img} alt="" style={{ margin: "0 2rem" }} />
                                                <div
                                                    style={{
                                                        position: "relative",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        flex: 1,
                                                    }}>
                                                    <h3>카테고리: {item.카테고리}</h3>
                                                    <h4>품목: {item.품목}</h4>
                                                    <h5>태그: {item.태그}</h5>
                                                    <h3>가격: {item.가격}</h3>
                                                    <h6>상세설명: {item.상세설명}</h6>
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    );
                                })
                            )}
                        </Accordion>
                    </div>
                )}
            </Container>
        </div>
    );
}

export default MyPage;
