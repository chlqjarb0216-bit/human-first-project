import '../csss/MainSecondHand.css';
import { Container, Row, Col, Card, CardImg, CardGroup } from "react-bootstrap";
import { useState, useEffect } from 'react';
// import dataset from '../datas/dataset.json';
import TradeCategoty from './TradeCategory';
import { data, useNavigate, useParams } from 'react-router';
import TradeDetail from './TradeDetail';
import key from '../datas/localStorageKeys.json';

function MainSecondHand() {

    let navigate = useNavigate();

    let datas = JSON.parse(localStorage.getItem(key.tradeItemListKey));

    let babo = [...datas];


    datas.sort((a, b) => {
        return (
            Number(b.조회수) - Number(a.조회수)
        )

    })

    let babobabo = babo.filter((item) => {
        return (
            item.카테고리 === '굿즈'
        );
    })

    let gg = babo.filter((item) => {
        return (
            item.카테고리 === '장난감'
        )
    })

    let st = 'red';
    let hot = { 'color': st }


    let [gang, setgang] = useState({ color: 'red' });

    function changeGang() {


        console.log('gang color: ' + gang.color)
        if (gang.color == 'blue') {

            setgang({ color: 'red' })
        } else {

            setgang({ color: 'blue' })
        }
    }

    useEffect(() => {
        // const intv= setTimeout(changeGang(), 1000)
        const tm = setTimeout(changeGang, 1000)
        return () => {
            clearTimeout(tm);
        }
    }, [gang])


    return (

        <Container style={{ width: '100%', margin: '0', padding: '0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ width: '23%', border: '1px solid black', position: 'sticky', top: '80px', borderRadius: '10px' }}>
                    {/* 카테고리 영역 */}
                    <p style={{ fontWeight: 'bold', fontSize: '30px' }} onClick={() => navigate('/MainSecondHand')}>중고카테고리</p>
                    <p onClick={() => navigate('/trade-category/생활가전')}>생활/가전</p>
                    <p onClick={() => navigate('/trade-category/낚시용품')}>낚시용품</p>
                    <p onClick={() => navigate('/trade-category/IT기기')}>IT기기</p>
                    <p onClick={() => navigate('/trade-category/의류')}>의류</p>
                    <p onClick={() => navigate('/trade-category/반려용품')}>반려용품</p>
                    <p onClick={() => navigate('/trade-category/가구')}>가구</p>
                    <p onClick={() => navigate('/trade-category/장난감')}>장난감</p>
                    <p onClick={() => navigate('/trade-category/서적')}>서적</p>
                    <p onClick={() => navigate('/trade-category/굿즈')}>굿즈</p>
                    <p onClick={() => navigate('/trade-category/헬스')}>헬스</p>
                    <p onClick={() => navigate('/trade-insert')}>물품등록</p>
                </div>

                <div style={{ width: '73%', height: 'fit-content' }}>
                    <div className='SecondHand-section'>
                        {/* 카드 목록 영역 */}
                        <p className='SecondHand-fontstyle'>🔥인기상품<span style={gang}>HOT</span></p>
                        <CardGroup>
                            {
                                datas.map((data, index) => {
                                    if (index > 2) {
                                        return;
                                    }
                                    return (
                                        <Card onClick={() => navigate('/trade-detail/' + data.id)}>
                                            <Card.Img variant="string" src={'images/' + data.img} className='MainSecondHand-Photo-Size' />
                                            <Card.Body>
                                                <Card.Title>{data.제목}</Card.Title>
                                                <Card.Text>
                                                    {/* 첫번째 인기품목 가격 등 들어갈곧 */}
                                                </Card.Text>
                                            </Card.Body>
                                            <Card.Footer>
                                                <Card.Text style={{ margin: '0' }}>
                                                    <small className="text-muted">태그:{data.태그}</small>
                                                </Card.Text>
                                                <Card.Text>
                                                    <small className="text-muted">카테고리:{data.카테고리}</small>
                                                </Card.Text>


                                            </Card.Footer>

                                        </Card>
                                    );
                                })
                            }
                        </CardGroup>
                    </div>





                    <div className='SecondHand-section'>
                        {/* 카드 목록 영역 */}
                        <p className='SecondHand-fontstyle'>굿즈</p>
                        <CardGroup>
                            {
                                babobabo.map((data, index) => {
                                    if (index > 2) {
                                        return;
                                    }
                                    return (
                                        <Card onClick={() => navigate('/trade-detail/' + data.id)}>
                                            <Card.Img variant="string" src={'images/' + data.img} className='MainSecondHand-Photo-Size' />
                                            <Card.Body>
                                                <Card.Title>{data.제목}</Card.Title>
                                                <Card.Text>
                                                    {/* 첫번째 인기품목 가격 등 들어갈곧 */}
                                                </Card.Text>
                                            </Card.Body>
                                            <Card.Footer>
                                                <Card.Text style={{ margin: '0' }}>
                                                    <small className="text-muted">태그:{data.태그}</small>
                                                </Card.Text>
                                                <Card.Text>
                                                    <small className="text-muted">카테고리:{data.카테고리}</small>
                                                </Card.Text>


                                            </Card.Footer>

                                        </Card>
                                    );
                                })
                            }
                        </CardGroup>


                    </div>

                    <div className='SecondHand-section'>
                        {/* 카드 목록 영역 */}
                        <p className='SecondHand-fontstyle'>장난감</p>
                        <CardGroup>
                            {
                                gg.map((data, index) => {
                                    if (index > 2) {
                                        return;
                                    }
                                    return (
                                        <Card onClick={() => navigate('/trade-detail/' + data.id)}>
                                            <Card.Img variant="string" src={'images/' + data.img} className='MainSecondHand-Photo-Size' />
                                            <Card.Body>
                                                <Card.Title>{data.제목}</Card.Title>
                                                <Card.Text>
                                                    {/* 첫번째 인기품목 가격 등 들어갈곧 */}
                                                </Card.Text>
                                            </Card.Body>
                                            <Card.Footer>
                                                <Card.Text style={{ margin: '0' }}>
                                                    <small className="text-muted">태그:{data.태그}</small>
                                                </Card.Text>
                                                <Card.Text>
                                                    <small className="text-muted">카테고리:{data.카테고리}</small>
                                                </Card.Text>


                                            </Card.Footer>

                                        </Card>
                                    );
                                })
                            }
                        </CardGroup>


                    </div>

                </div>




            </div>

        </Container>



    );
}


export default MainSecondHand;
