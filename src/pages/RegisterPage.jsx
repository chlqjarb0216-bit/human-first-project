import "../csss/loginRegisterPage.css";
import { Button, Form } from "react-bootstrap";

function RegisterPage() {
    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <p style={{ fontSize: "2rem", fontWeight: "bold", marginTop: "3rem" }}>로그인</p>
            <p style={{ fontSize: "1.5rem", marginBottom: "3rem" }}>국내 유일 중고・경매 통합 사이트</p>
            <Form style={{ width: "20rem" }}>
                <Form.Group className="mb-3 form-group-align-left" controlId="formBasicEmail">
                    <Form.Label>이메일</Form.Label>
                    <Form.Control type="email" placeholder="이메일을 입력해주세요" />
                </Form.Group>

                <Form.Group className="mb-3 form-group-align-left" controlId="formBasicPassword">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control type="password" placeholder="비밀번호를 입력해주세요" />
                </Form.Group>
                <Button variant="primary" type="submit" size="lg" style={{ margin: "1rem" }}>
                    로그인
                </Button>
            </Form>
            <p style={{ textDecoration: "underLine", cursor: "pointer" }}>아직 가입하시지 않으셨나요?</p>
        </div>
    );
}

export default RegisterPage;
