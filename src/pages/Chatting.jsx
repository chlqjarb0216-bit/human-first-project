import { useEffect, useRef, useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import storage from "../pure_functions/storage";
import nowDate from "../pure_functions/nowDate";

function Chatting({ loginUser, itemDetail }) {
    const mkChat = (sender, message, type) => {
        return { type: type, sender: sender, message: message, dateTime: nowDate() };
    };

    const textareaRef = useRef(null);
    const chatBoxRef = useRef(null);

    const chatKey = itemDetail.id + "chat";
    const allChat = storage.get(chatKey, {});
    const currentChatKey = loginUser.email;
    const [chatList, setChatList] = useState(allChat[currentChatKey] || []);

    if (chatList.length === 0) {
        const tmp = [...chatList];
        tmp.push(mkChat(loginUser.nickName, "안녕하세요", "normal"));
        tmp.push(
            mkChat(itemDetail.user ? itemDetail.user.nickName : "itemDetail.user.nickName", "안녕하세요", "normal"),
        );
        setChatList(tmp);
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "auto",
        });
    }, []);
    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTo({ behavior: "smooth", top: chatBoxRef.current.scrollHeight });
        }

        const updatedAllChat = { ...allChat, [currentChatKey]: [...chatList] };
        storage.set(chatKey, updatedAllChat);
    }, [chatList]);

    return (
        <Container
            style={{
                backgroundColor: "lightgreen",
                width: "100%",
                borderRadius: "1rem",
                display: "flex",
                flexDirection: "column",
                maxHeight: "90vh",
            }}>
            {/* <div style={{ flex: 1 }}> */}
            <h3 className="m-3">{itemDetail.user ? itemDetail.user.nickName : "itemDetail.user.nickName"}</h3>
            <div
                ref={chatBoxRef}
                style={{
                    flex: 1,
                    overflow: "auto",
                    display: "flex",
                    flexDirection: "column",
                    msOverflowStyle: "none",
                    scrollbarWidth: "none",
                    WebkitScrollbar: { display: "none" },
                }}>
                {chatList.map((item, index) => {
                    const name = item.sender === loginUser.nickName ? "나" : item.sender;

                    const msgLines = item.message.split("\n");

                    return (
                        <div key={index} style={{ margin: "1rem" }}>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: name === "나" ? "flex-end" : "flex-start",
                                }}>
                                <p style={{ margin: 0 }}>{name}</p>
                                <div
                                    className="mb-3"
                                    style={{
                                        backgroundColor: "lightskyblue",
                                        width: "fit-content",
                                        minWidth: "7.5rem",
                                        maxWidth: "70%",
                                        borderRadius: "0.5rem",
                                        padding: "0.2rem",
                                    }}>
                                    {msgLines.map((msg, idx) => {
                                        if (msg) {
                                            return (
                                                <p key={idx} style={{ margin: 0 }}>
                                                    {msg}
                                                </p>
                                            );
                                        } else {
                                            return <br key={idx} />;
                                        }
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* </div> */}
            <div style={{ height: "fit-content", margin: "1rem 0", marginTop: "auto" }}>
                <Form
                    style={{ display: "flex" }}
                    onSubmit={(e) => {
                        e.preventDefault();
                        const tmp = [...chatList];
                        tmp.push(mkChat(loginUser.nickName, textareaRef.current.value, "normal"));
                        setChatList(tmp);
                        textareaRef.current.value = "";
                        textareaRef.current.focus();
                        if (textareaRef.current) textareaRef.current.style.height = "auto";
                    }}>
                    <Button variant="secondary">+</Button>
                    <Form.Group controlId="chat" style={{ flex: 1 }}>
                        <Form.Label style={{ display: "none" }}>chatting input</Form.Label>
                        <Form.Control
                            ref={textareaRef}
                            as="textarea"
                            rows={1}
                            required
                            onChange={() => {
                                const textarea = textareaRef.current;
                                if (!textarea) return;

                                // 1. 높이 계산이 꼬이지 않도록 먼저 높이를 초기화(최소값)해 줍니다.
                                textarea.style.height = "auto";

                                // 2. 글자 수에 맞춰 늘어난 실제 스크롤 높이(scrollHeight)를 주입합니다.
                                // 최대 높이를 제한하고 싶다면 Math.min(textarea.scrollHeight, 150) 처럼 짤 수 있습니다.
                                textarea.style.height = `${textarea.scrollHeight}px`;
                            }}
                            style={{
                                resize: "none",
                                minHeight: "1rem",
                                maxHeight: "9rem",
                                overflowY: "auto", // ⭐️ 스크롤바 숨기기 무적의 3종 세트
                                msOverflowStyle: "none" /* 1. IE 및 에지(Edge)용 */,
                                scrollbarWidth: "none" /* 2. 파이어폭스(Firefox)용 */,
                                WebkitScrollbar: {
                                    /* 3. 크롬, 사파리, 웨일, 인앱 브라우저용 */ display: "none",
                                },
                            }}
                        />
                    </Form.Group>
                    <Button
                        type="submit"
                        onClick={() => {
                            if (textareaRef.current.value.trim() === "") textareaRef.current.value = "";
                        }}>
                        송신
                    </Button>
                </Form>
            </div>
        </Container>
    );
}

export default Chatting;
