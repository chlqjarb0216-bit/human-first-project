import "../csss/TradeCategory.css";
import "../csss/MainSecondHand.css";
import { Container, Card } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router";
import storage from "../pure_functions/storage";
import keys from "../datas/localStorageKeys.json";
import categories from "../datas/categories.json";

function SearchPage() {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const cate = searchParams.get("cate");
    const keyword = searchParams.get("keyword");
    if (cate === "경매검색") return <div>경매검색기능 준비중입니다</div>;

    const registedItemList = storage.get(keys.tradeItemListKey);

    const filteredItems = registedItemList.filter((item) => {
        // 2. ⭐️ 핵심: 글자(한글, 영문)와 숫자가 아닌 모든 것(\W+)을 기준으로 쪼갭니다.
        // [공백, 탭, 줄바꿈, !, @, #, $, %, ^, &, *, (, ), -, +, =, ,, ., /] 등이 전부 분할 기준이 됩니다.
        // 단, 한글은 특성상 문자로 인식되게 하기 위해 공백과 특수문자 패턴인 /[ \t\n\r`~!@#$%^&*()_\-+=[\]{};:'",.<>/?\\|]+/ 를 명시적으로 쓰는 것이 안전합니다.
        const splitRegex = /[ \t\n\r`~!@#$%^&*()_\-+=[\]{};:'",.<>/?\\|]+/;
        // 쪼갠 뒤 빈 문자열 찌꺼기(.filter(Boolean))를 완벽히 청소합니다.
        const searchWords = keyword.toLowerCase().split(splitRegex).filter(Boolean);
        // 만약 특수문자만 입력해서 검색 단어가 한 개도 안 남았다면 전체 노출 또는 검색 차단
        if (searchWords.length === 0) return false;
        if (item.status === "deleted" || item.status === "completed") return false;

        // 3. ⭐️ 핵심: 상품 객체의 모든 값(Value)을 하나의 문자열로 결합합니다.
        // 예: { itemName: "나이키", price: 50000, category: "의류" }
        // -> "나이키 50000 의류" 라는 하나의 거대한 검색용 텍스트가 됨
        // const itemAllText = Object.values(item).join(" ").toLowerCase();
        // 일부 태그만
        const itemAllText = `${item.카테고리} ${item.품목} ${item.제목} ${item.태그} ${item.상세설명}`;

        const isKeywordMatch = searchWords.some((word) => itemAllText.includes(word));
        return isKeywordMatch;
    });

    return (
        <Container style={{ width: "100%", margin: "0", padding: "0" }}>
            <div className="TradeCategory-layout" style={cate !== "중고검색" ? { justifyContent: "center" } : {}}>
                {cate === "중고검색" && (
                    <div className="TradeCategory-sidebar">
                        {/* 카테고리 영역 */}
                        <p style={{ fontWeight: "bold", fontSize: "30px" }} onClick={() => navigate("/MainSecondHand")}>
                            중고카테고리
                        </p>
                        {categories.map((item) => {
                            return <p onClick={() => navigate(`/trade-category/${item}`)}>{item}</p>;
                        })}
                    </div>
                )}

                <div style={{ width: "73%", height: "fit-content" }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            backgroundColor: "white",
                            borderLeft: "6px solid orange",
                            padding: "15px 20px",
                            borderRadius: "10px",
                            marginBottom: "20px",
                        }}>
                        <div>
                            <h2 style={{ margin: 0, fontWeight: "bold" }}>{cate}</h2>

                            <p style={{ margin: "5px 0 0 0", color: "black" }}>검색결과입니다.</p>
                        </div>
                    </div>
                    {filteredItems.length === 0 && (
                        <div className="mt-5">
                            <div className="SecondHand-section"></div>
                            <h3>검색결과가 존재하지 않습니다.</h3>
                            <h3>다른 검색어로 검색해주세요.</h3>
                        </div>
                    )}
                    <div className="SecondHand-section">
                        {/* 카드 목록 영역 */}

                        <div className="TradeCategory-card-list">
                            {filteredItems.map((data) => {
                                return (
                                    <Card
                                        key={data.id}
                                        className="TradeCategory-card"
                                        onClick={() => navigate("/trade-detail/" + data.id)}>
                                        <Card.Img
                                            variant="string"
                                            src={"/images/" + data.img}
                                            className="MainSecondHand-Photo-Size"
                                        />
                                        <Card.Body>
                                            <Card.Title>{data.제목}</Card.Title>
                                            <Card.Text>{/* 첫번째 인기품목 가격 등 들어갈곧 */}</Card.Text>
                                        </Card.Body>
                                        <Card.Footer>
                                            <Card.Text style={{ margin: "0" }}>
                                                <small className="text-muted">태그:{data.태그}</small>
                                            </Card.Text>
                                            <Card.Text>
                                                <small className="text-muted">카테고리:{data.카테고리}</small>
                                            </Card.Text>
                                            <Card.Text>
                                                <small className="text-muted">가격:{data.가격}원</small>
                                            </Card.Text>
                                        </Card.Footer>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default SearchPage;
