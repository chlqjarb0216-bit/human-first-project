import '../csss/TradeCategory.css';
import { Container, Card, CardImg, CardGroup } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { data, useNavigate, useParams } from 'react-router';
import TradeDetail from './TradeDetail';
import ProductCard from "./ProductCard";
import key from '../datas/localStorageKeys.json';



function TradeCategory() {

    let dataset = JSON.parse(localStorage.getItem(key.tradeItemListKey));

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
            <div className='trade-layout'>
                <div className='trade-sidebar'>
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




                <div style={{
                    flex: 1,
                    paddingTop: "40px"
                }}
                >
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
                    <div className='trade-section'>
                        {/* 카드 목록 영역 */}

                        <div className="card-grid">
                            {categoryDatas.map((data) => (
                                <ProductCard
                                    key={data.id}
                                    image={data.img}
                                    title={data.제목}
                                    category={data.카테고리}
                                    price={data.가격}
                                    views={data.조회수}
                                    auction={false}
                                    onClick={() => navigate("/trade-detail/" + data.id)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </Container>


    )
}


export default TradeCategory;