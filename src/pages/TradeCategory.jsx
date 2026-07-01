import '../csss/TradeCategory.css';
import '../csss/MainSecondHand.css';
import dataset from '../datas/dataset.json';
import { Container, Card, CardImg, CardGroup } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { data, useNavigate, useParams } from 'react-router';
import TradeDetail from './TradeDetail';


function TradeCategoty() {

    let navigate = useNavigate();

    let { category } = useParams();


    let realCartegory = category;

    if (category === '생활가전') {
        realCartegory = '생활/가전';
    }

    let categoryDatas = dataset.filter((item) => {
        return (
            item.카테고리 === realCartegory
        )
    });
    console.log(realCartegory)


    return (
        <Container style={{ width: '100%', margin: '0', padding: '0' }}>
            <div className='TradeCategory-layout'>
                <div className='TradeCategory-sidebar'>
                    {/* 카테고리 영역 */}
                    <p style={{ fontWeight: 'bold', fontSize: '23px' }} onClick={() => navigate('/MainSecondHand')}>중고카테고리</p>
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
                </div>




                <div style={{ width: '73%', height: 'fit-content' }}>
                    <div
                        style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', borderLeft: '6px solid orange',
                            padding: '15px 20px', borderRadius: '10px', marginBottom: '20px'
                        }}>
                        <div>
                            <h2 style={{ margin: 0, fontWeight: 'bold' }}>{realCartegory}</h2>

                            <p style={{ margin: '5px 0 0 0', color: 'black' }}>{realCartegory} 상품 목록입니다.</p>
                        </div>
                    </div>
                    <div className='SecondHand-section'>
                        {/* 카드 목록 영역 */}

                        <div className="TradeCategory-card-list">
                            {
                                categoryDatas.map((data) => {
                                    return (
                                        <Card key={data.id} className="TradeCategory-card" onClick={()=>navigate('/trade-detail/' + data.id)}>
                                            <Card.Img variant="string" src={'/images/' + data.img} className='MainSecondHand-Photo-Size' />
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
                                                <Card.Text>
                                                    <small className="text-muted">가격:{data.가격}원</small>
                                                </Card.Text>



                                            </Card.Footer>

                                        </Card>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>

        </Container>


    )
}


export default TradeCategoty;