import "../csss/userForm.css";
import "../csss/alert.css";
import { useRef, useState, useEffect } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router";
import storage from "../pure_functions/storage";
import keys from "../datas/localStorageKeys.json";
import nowDate from "../pure_functions/nowDate"

const false2 = [false, false];

function LoginPage(props) {
    const [shows, setShows] = useState(false2);

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const navigate = useNavigate();

    const registedList = storage.get(keys.registedUserListKey, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (emailRef.current.value.trim() == "") {
            const tmp = [...shows];
            tmp[0] = true;
            setShows(tmp);
            emailRef.current.focus();
            emailRef.current.classList.toggle("form-alert-bc-pink");
            setTimeout(() => {
                emailRef.current.classList.toggle("form-alert-bc-pink");
            }, 3000);
        } else if (!emailRef.current.validity.valid) {
            emailRef.current.reportValidity();
        } else if (passwordRef.current.value.trim() == "") {
            const tmp = [...shows];
            tmp[1] = true;
            setShows(tmp);
            passwordRef.current.focus();
            passwordRef.current.classList.toggle("form-alert-bc-pink");
            setTimeout(() => {
                passwordRef.current.classList.toggle("form-alert-bc-pink");
            }, 3000);
        } else {
            const same = registedList.find((item) => item.email === emailRef.current.value.trim().toLowerCase());
            if (same === undefined || same.password !== passwordRef.current.value.trim()) {
                alert("이메일 또는 비밀번호가 틀렸습니다. 다시 확인해주세요.");
                return;
            }

            props.setLoginUser(same);
            storage.set(keys.currentUser, {user:{...same}, time:nowDate()});

            navigate("/");
        }
    };

    useEffect(() => {
        if (shows.every((show) => !show)) return;

        const timer = setTimeout(() => {
            setShows(false2);
        }, 3000);

        return () => clearTimeout(timer);
    }, [shows]);

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <p style={{ fontSize: "2rem", fontWeight: "bold", marginTop: "3rem" }}>로그인</p>
            <p style={{ fontSize: "1.5rem", marginBottom: "3rem" }}>국내 유일 중고・경매 통합 사이트</p>
            <Form onSubmit={handleSubmit} style={{ width: "20rem" }}>
                <Form.Group className="mb-3 form-group-align-left" controlId="formBasicEmail">
                    <Form.Label>이메일</Form.Label>
                    <Form.Control
                        ref={emailRef}
                        type="email"
                        placeholder="이메일을 입력해주세요"
                        className="placeholder-lightgray"
                    />
                    {shows[0] && (
                        <Alert
                            variant="danger"
                            onClose={() => setShows(false2)}
                            dismissible
                            className="alert-xs text-center">
                            이메일을 입력해주세요
                        </Alert>
                    )}
                </Form.Group>

                <Form.Group className="mb-3 form-group-align-left" controlId="formBasicPassword">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control
                        ref={passwordRef}
                        type="password"
                        placeholder="비밀번호를 입력해주세요"
                        className="placeholder-lightgray"
                    />
                    {shows[1] && (
                        <Alert
                            variant="danger"
                            onClose={() => setShows(false2)}
                            dismissible
                            className="alert-xs text-center">
                            비밀번호를 입력해주세요
                        </Alert>
                    )}
                </Form.Group>
                <Button variant="primary" type="submit" size="lg" style={{ margin: "1rem" }}>
                    로그인
                </Button>
            </Form>
            <Link to="/register" style={{ textDecoration: "underLine", cursor: "pointer", color: "black" }}>
                아직 가입하시지 않으셨나요?
            </Link>
        </div>
    );
}

export default LoginPage;
