import { useEffect, useRef, useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import storage from "../pure_functions/storage";
import nowDate from "../pure_functions/nowDate";
import keys from "../datas/localStorageKeys.json";

function Chatting({ loginUser, itemDetail, isSeller }) {
    const mkChat = (sender, message, type) => {
        return { type: type, sender: sender, message: message, dateTime: nowDate() };
    };

    const textareaRef = useRef(null);
    const chatBoxRef = useRef(null);

    const chatKey = itemDetail.id + "chat";
    const [allChat, setAllChat] = useState(storage.get(chatKey, {}));
    const [currentChatKey, setCurrentChatKey] = useState(isSeller ? Object.keys(allChat)[0] : loginUser.nickName);

    const userList = storage.get(keys.registedUserListKey);
    const seller = userList.find((user) => {
        if (itemDetail.등록유저ID === undefined) return false;
        return user.id === itemDetail.등록유저ID;
    });

    if (allChat[currentChatKey] === undefined || allChat[currentChatKey].length === 0) {
        const tmp = [];
        tmp.push(mkChat(loginUser.nickName, "안녕하세요", "normal"));
        tmp.push(mkChat(seller ? seller.nickName : "seller.nickName", "안녕하세요", "normal"));
        setAllChat({ ...allChat, [currentChatKey]: [...tmp] });
    }

    const onRoomChange = (roomKey) => {
        setCurrentChatKey(roomKey);
    };

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
    }, [allChat]);

    return (
        <Container
            style={{
                backgroundColor: "lightgreen",
                width: "100%",
                borderRadius: "1rem",
                display: "flex",
                flexDirection: "column",
                maxHeight: "90vh",
                position: "relative",
            }}>
            {/* ⭐️ 2. 포스트잇 탭들을 모아두는 절대 좌표 박스 */}
            <div
                style={{
                    position: "absolute",
                    top: "2rem" /* 약간 위에서부터 정렬 시작 */,
                    left: "-3rem" /* 3. 내 몸통(너비 3rem)만큼 정확히 왼쪽 밖으로 탈출시켜 벽에 붙임 */,
                    width: "3rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    zIndex: 10 /* 상품 정보 이미지 위로 둥둥 뜨게 가드 */,
                }}>
                {/* 4. 열려있는 모든 채팅방 목록 루프 돌리기 */}
                {isSeller &&
                    Object.keys(allChat).map((roomKey) => {
                        const isActive = roomKey === currentChatKey;

                        return (
                            <div
                                key={roomKey}
                                onClick={() => onRoomChange(roomKey)} // 클릭 시 해당 방 키로 변경
                                style={{
                                    backgroundColor: isActive ? "lightskyblue" : "#e2e8f0", // 활성화된 방은 하늘색 칠하기
                                    color: isActive ? "black" : "#666",
                                    padding: "12px 6px",
                                    fontSize: "0.75rem",
                                    fontWeight: isActive ? "bold" : "normal",
                                    cursor: "pointer",
                                    // 5. 포스트잇 특유의 둥근 모서리 모양 잡기 (왼쪽만 둥글게)
                                    borderRadius: "0.5rem 0 0 0.5rem",
                                    boxShadow: "-2px 2px 4px rgba(0,0,0,0.1)",
                                    textAlign: "center",
                                    wordBreak: "break-all",
                                    writingMode: "vertical-lr", // 💡 글자를 세로로 이쁘게 흐르게 만듬
                                    transform: "rotate(180deg)" /* 세로 읽기 방향 보정 */,
                                }}>
                                {/* 방 이름이나 유저 닉네임의 앞 3글자 정도만 슬라이싱해서 표시 */}
                                {roomKey.substring(0, 3) || "대화방"}
                            </div>
                        );
                    })}
            </div>
            <h3 className="m-3">{seller ? seller.nickName : "seller.nickName"}</h3>
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
                {allChat[currentChatKey] === undefined ||
                    allChat[currentChatKey].map((item, index) => {
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
            <div style={{ height: "fit-content", margin: "1rem 0", marginTop: "auto" }}>
                <Form
                    style={{ display: "flex" }}
                    onSubmit={(e) => {
                        e.preventDefault();
                        const tmp = [...allChat[currentChatKey]];
                        tmp.push(mkChat(loginUser.nickName, textareaRef.current.value, "normal"));
                        const updatedAllChat = { ...allChat, [currentChatKey]: [...tmp] };
                        setAllChat(updatedAllChat);
                        storage.set(chatKey, updatedAllChat);
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
