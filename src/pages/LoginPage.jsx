import "../csss/LoginPage.css";
import { Button, Form } from "react-bootstrap";

function LoginPage() {
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Form style={{ width: "30rem", marginTop: "3rem" }}>
                <p style={{ fontSize: "2rem", fontWeight: "bold" }}>로그인</p>
                <p style={{ fontSize: "1.5rem", marginBottom: "3rem" }}>국내 유일 중고・경매 통합 사이트</p>
                <Form.Group className="mb-3 login-page-form-group" controlId="formBasicEmail">
                    <Form.Label>이메일</Form.Label>
                    <Form.Control type="email" placeholder="이메일을 입력해주세요" />
                </Form.Group>

                <Form.Group className="mb-3 login-page-form-group" controlId="formBasicPassword">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control type="password" placeholder="비밀번호" />
                </Form.Group>
                <Button variant="primary" type="submit" size="lg" style={{ margin: "1rem" }}>
                    로그인
                </Button>
                <p style={{ textDecoration: "underLine", cursor: "pointer" }}>아직 가입하시지 않으셨나요?</p>
            </Form>
        </div>
    );
}

export default LoginPage;
