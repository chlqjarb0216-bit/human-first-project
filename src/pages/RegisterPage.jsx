import { useEffect, useRef, useState } from "react";
import "../csss/userForm.css";
import "../csss/alert.css";
import { Button, Form, InputGroup, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router";
import nowDate from "../pure_functions/nowDate";

const false5 = [false, false, false, false, false];
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&~])[A-Za-z\d@$!%*?&~]{8,20}$/;

function RegisterPage(props) {
    const [shows, setShows] = useState(false5);
    const [confirmedNick, setConfirmedNick] = useState("");
    const [confirmedEMail, setConfirmedEMail] = useState("");

    const nameRef = useRef(null);
    const nickRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const passConfirmRef = useRef(null);
    const passwordInfoRef = useRef(null);

    const navigate = useNavigate();

    const registedListRaw = localStorage.getItem("registedList");
    const registedList = registedListRaw ? JSON.parse(registedListRaw) : [];

    const handleCheckPassword = () => {
        if (!passwordRegex.test(passwordRef.current.value.trim())) {
            passwordInfoRef.current.style.setProperty("background-color", "pink");
            setTimeout(() => {
                passwordInfoRef.current.style.setProperty("background-color", "white");
            }, 3000);
            return false;
        }
        return true;
    };

    const handleRegister = (e) => {
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
        } else if (confirmedEMail == "") {
            const tmp = [...shows];
            tmp[2] = true;
            setShows(tmp);
            emailRef.current.focus();
            emailRef.current.classList.toggle("form-alert-bc-pink");
            setTimeout(() => {
                emailRef.current.classList.toggle("form-alert-bc-pink");
            }, 3000);
        } else if (passwordRef.current.value.trim() == "") {
            const tmp = [...shows];
            tmp[3] = true;
            setShows(tmp);
            passwordRef.current.focus();
            passwordRef.current.classList.toggle("form-alert-bc-pink");
            setTimeout(() => {
                passwordRef.current.classList.toggle("form-alert-bc-pink");
            }, 3000);
        } else if (!handleCheckPassword()) {
            return;
        } else if (passConfirmRef.current.value != passwordRef.current.value) {
            const tmp = [...shows];
            tmp[4] = true;
            setShows(tmp);
            passConfirmRef.current.focus();
            passConfirmRef.current.classList.toggle("form-alert-bc-pink");
            setTimeout(() => {
                passConfirmRef.current.classList.toggle("form-alert-bc-pink");
            }, 3000);
        } else {
            const registerData = {
                name: nameRef.current.value.trim(),
                nickName: confirmedNick,
                email: confirmedEMail,
                password: passwordRef.current.value.trim(),
                registedDate: nowDate()[0],
            };
            registedList.push(registerData);
            localStorage.setItem("registedList", JSON.stringify(registedList));

            props.setLoginUser(registerData);

            navigate("/");
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

    useEffect(() => {
        if (shows.every((show) => !show)) return;

        const timer = setTimeout(() => {
            setShows(false5);
        }, 3000);

        return () => clearTimeout(timer);
    }, [shows]);

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <p style={{ fontSize: "2rem", fontWeight: "bold", marginTop: "2rem" }}>회원가입</p>
            <p style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>국내 유일 중고・경매 통합 사이트</p>
            <Form onSubmit={handleRegister} style={{ width: "25rem" }}>
                <Form.Group className="mb-3 form-group-align-left" controlId="formName">
                    <Form.Label>이름</Form.Label>
                    <Form.Control
                        ref={nameRef}
                        type="text"
                        placeholder="이름을 입력해주세요"
                        className="placeholder-lightgray"
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

                <Form.Group className="mb-0 form-group-align-left" controlId="formPassword">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control
                        ref={passwordRef}
                        type="password"
                        placeholder="비밀번호를 입력해주세요"
                        className="placeholder-lightgray"
                    />
                    {shows[3] && (
                        <Alert
                            variant="danger"
                            onClose={() => setShows(false5)}
                            dismissible
                            className="alert-xs text-center">
                            비밀번호를 입력해주세요
                        </Alert>
                    )}
                </Form.Group>
                <p ref={passwordInfoRef} style={{ fontSize: "0.7rem", color: "gray", textAlign: "start" }}>
                    ※비밀번호는 알파벳 대소문자 및 특수문자(@$!%*?&~)를 포함한 8자 이상이어야합니다(최대20자).
                </p>

                <Form.Group className="mb-3 form-group-align-left" controlId="formPasswordConfirm">
                    <Form.Label>비밀번호 확인</Form.Label>
                    <Form.Control
                        ref={passConfirmRef}
                        type="password"
                        placeholder="비밀번호를 다시 입력해주세요"
                        className="placeholder-lightgray"
                    />
                    {shows[4] && (
                        <Alert
                            variant="danger"
                            onClose={() => setShows(false5)}
                            dismissible
                            className="alert-xs text-center">
                            비밀번호가 일치하지 않습니다.
                        </Alert>
                    )}
                </Form.Group>
                <Button variant="primary" type="submit" size="lg" style={{ margin: "1rem" }}>
                    회원가입
                </Button>
            </Form>
            <Link to="/login" style={{ textDecoration: "underLine", cursor: "pointer", color: "black" }}>
                로그인 화면으로 돌아가기
            </Link>
        </div>
    );
}

export default RegisterPage;
