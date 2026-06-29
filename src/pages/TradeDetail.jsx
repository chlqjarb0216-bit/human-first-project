import '../csss/MainSecondHand.css';
import '../csss/TradeCategory.css';
import { Container, Row, Col, Card, CardImg, CardGroup } from "react-bootstrap";
import { useState, useEffect } from 'react';
import dataset from '../datas/dataset.json';
import TradeCategoty from './TradeCategory';
import { data, useNavigate, useParams } from 'react-router';


function TradeDetail() {

    let navigate = useNavigate();

    let { title } = useParams();

    let realTitle = title;

    if (title === 'LG 디오스 양문형 냉장고') {
        realTitle = 'LG 디오스 양문형 냉장고';
    }


    let titleDatas = dataset.filter((item)=>{
        return(
            item.제목 === realTitle
        )
    })



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
                </div>

                <div style={{ width: '73%', height: 'fit-content' }}>
                    <h2>{realTitle}</h2>
                    <div className='SecondHand-section'>
                        {/* 카드 목록 영역 */}
                        <p className='SecondHand-fontstyle'>🔥인기상품</p>
                        <CardGroup>
                            {
                                titleDatas.map((data)=>{

                                    return (
                                        <Card >
                                            <Card.Img variant="string" src={'images/' + data.img} className='MainSecondHand-Photo-Size' />
                                            <Card.Body>
                                                <Card.Text style={{ margin: '0' }}>
                                                    <small className="text-muted">태그:{data.태그}</small>
                                                </Card.Text>
                                                <Card.Text>
                                                    <small className="text-muted">카테고리:{data.가격}</small>
                                                </Card.Text>
                                                
                                                <Card.Text>
                                                    {/* 첫번째 인기품목 가격 등 들어갈곧 */}
                                                </Card.Text>
                                            </Card.Body>
                                            <Card.Footer>
                                                <Card.Title>{data.제목}</Card.Title>
                                                <Card.Text style={{ margin: '0' }}>
                                                    <small className="text-muted">태그:{data.상세설명}</small>
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
    )



}

export default TradeDetail;