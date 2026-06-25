import "../csss/loginRegisterPage.css";
import { Button, Form, InputGroup } from "react-bootstrap";

function RegisterPage() {
    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <p style={{ fontSize: "2rem", fontWeight: "bold", marginTop: "2rem" }}>회원가입</p>
            <p style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>국내 유일 중고・경매 통합 사이트</p>
            <Form style={{ width: "25rem" }}>
                <Form.Group className="mb-3 form-group-align-left" controlId="formBasicPassword">
                    <Form.Label>이름</Form.Label>
                    <Form.Control type="text" placeholder="이름을 입력해주세요" />
                </Form.Group>

                <Form.Group className="mb-3 form-group-align-left" controlId="formBasicEmail">
                    <Form.Label>닉네임</Form.Label>
                    <InputGroup>
                        <Form.Control type="text" placeholder="닉네임을 입력해주세요" />
                        <Button variant="outline-secondary">닉네임 중복확인</Button>
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3 form-group-align-left" controlId="formBasicEmail">
                    <Form.Label>이메일</Form.Label>
                    <InputGroup>
                        <Form.Control type="email" placeholder="이메일을 입력해주세요" />
                        <Button variant="outline-secondary">이메일 확인</Button>
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3 form-group-align-left" controlId="formBasicPassword">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control type="password" placeholder="비밀번호를 입력해주세요" />
                </Form.Group>
                <p style={{ fontSize: "0.7rem", color: "gray", textAlign: "start" }}>
                    ※비밀번호는 알파벳 대소문자 및 특수문자를 포함한 8자 이상이어야합니다.
                </p>
                <Button variant="primary" type="submit" size="lg" style={{ margin: "1rem" }}>
                    회원가입
                </Button>
            </Form>
            <p style={{ textDecoration: "underLine", cursor: "pointer" }}>로그인 화면으로 돌아가기</p>
        </div>
    );
}

export default RegisterPage;
