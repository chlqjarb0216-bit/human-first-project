import "../csss/TradeCompletePage.css";
import { Container, Spinner } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import keys from "../datas/localStorageKeys.json";
import storage from "../pure_functions/storage";
import nowDate from "../pure_functions/nowDate";

function TradeCompletePage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const itemId = Number(searchParams.get("itemId"));
    const buyerId = Number(searchParams.get("buyerId"));

    const [completed, setCompleted] = useState(false);
    useEffect(() => {
        const itemList = storage.get(keys.tradeItemListKey);
        const idxItem = itemList.findIndex((item) => item.id === itemId);
        const userList = storage.get(keys.registedUserListKey);
        const idxSeller = userList.findIndex((user) => user.id === itemList[idxItem].등록유저ID);
        const idxBuyer = userList.findIndex((user) => user.id === buyerId);
        if (idxItem === -1 || idxBuyer === -1 || idxSeller === -1) {
            alert("존재하지 않는 거래입니다.");
            navigate("/");
            return;
        }
        if (itemList[idxItem].status === "completed") {
            alert("이미 완료된 거래입니다.");
            navigate("/");
            return;
        }
        const now = nowDate();
        itemList[idxItem].status = "completed";
        itemList[idxItem].completeInfo = { buyerId: buyerId, time: now };
        storage.set(keys.tradeItemListKey, itemList);
        if (userList[idxSeller].tradeHistory) {
            userList[idxSeller].tradeHistory.push({ itemId: itemId, side: "sell", time: now });
        } else {
            userList[idxSeller].tradeHistory = [{ itemId: itemId, side: "sell", time: now }];
        }
        if (userList[idxBuyer].tradeHistory) {
            userList[idxBuyer].tradeHistory.push({ itemId: itemId, side: "buy", time: now });
        } else {
            userList[idxBuyer].tradeHistory = [{ itemId: itemId, side: "buy", time: now }];
        }
        storage.set(keys.registedUserListKey, userList);

        const timeout = setTimeout(() => {
            setCompleted(true);
        }, 5000);
        return () => clearTimeout(timeout);
    }, [buyerId, itemId, navigate]);

    return (
        <Container>
            {completed ? (
                <>
                    <h2 className="mb-4">거래가 완료되었습니다.</h2>
                    <h3 className="mb-4">향후 판매자가 택배를 발송하면 예상 도착시간을 안내하겠습니다.</h3>
                    <h3 className="mb-4">감사합니다.</h3>
                </>
            ) : (
                <>
                    <h3 className="mb-4">거래를 준비중입니다</h3>
                    <Spinner
                        variant="secondary"
                        animation="border"
                        role="status"
                        style={{ width: "5rem", height: "5rem" }}>
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </>
            )}
        </Container>
    );
}

export default TradeCompletePage;
