import { Container, Row, Col } from "react-bootstrap";
import dataset from '../datas/dataset.json';
import { useState } from "react";
import { data } from "react-router";
import '../csss/MainPage.css';
import ProductCard from "./ProductCard";


function MainPage() {


    dataset.sort((a, b) => {
        return (
            Number(b.조회수) - Number(a.조회수)
        )

    })


    return (

        //수정
        <Container fluid className="main-container">

            {/* 추가 */}
            <div className="hero-banner">

                <div className="hero-left">

                    <span className="hero-badge">
                        🔒 안전한 즉시거래
                    </span>

                    <h1>
                        믿고 거래하는
                        <br />
                        중고거래 플랫폼
                    </h1>

                    <p>
                        사기 예방 시스템과 즉시거래를 통해
                        더욱 안전하고 빠른 거래를 경험하세요.
                    </p>

                    <div className="hero-btn-wrap">

                        <button className="hero-btn-used">
                            중고거래
                        </button>

                        <button className="hero-btn-auction">
                            경매
                        </button>

                    </div>

                </div>

                <div className="hero-right">

                    <img src="images/banner.png" alt="banner" />

                </div>

            </div>

            
            <Row className="g-4">
                {/* 중고거래 */}
                <Col lg={6}>
                    <div className="main-section">

                        {/* 수정 */}
                        <div className="section-header">

                            <div className="section-title">

                                <img
                                    src="/images/shopping_basket.png"
                                    className="section-icon"
                                />

                                <span>중고거래</span>

                            </div>


                            <button className="more-btn">
                                전체보기 →
                            </button>

                        </div>


                        {/* <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}> */}

                        <div className="used-grid">

                            {
                                dataset.map((data, index) => {
                                    if (index > 5) {
                                        return;
                                    }
                                    return (

                                        //카드로 변경 
                                        <ProductCard
                                            key={index}
                                            image={data.img}
                                            title={data.제목}
                                            category={data.카테고리}
                                            price={data.가격}
                                            views={data.조회수}
                                            showBadge={false}
                                            showView={true}
                                        />

                                    );
                                })
                            }
                        </div>
                    </div>

                </Col>

                
                <Col lg={6}>
                 {/* 경매 */}
                    <div className="main-section">
                        {/* 수정 */}
                        <div className="section-header">

                            <div className="section-title">

                                <img
                                    src="/images/auction.png"
                                    className="section-icon"
                                />

                                <span>경매</span>

                            </div>

                            <button className="more-btn">
                                전체보기 →
                            </button>

                        </div>


                        {/* 수정 */}
                        <div className="auction-grid">
                            {
                                dataset.map((data, index) => {
                                    if (index > 5) {
                                        return;
                                    }
                                    return (
                                        //카드로 변경
                                        <ProductCard
                                            key={index}
                                            image={data.img}
                                            title={data.제목}
                                            category={data.카테고리}
                                            price={data.가격}
                                            auction={true}
                                            showView={false}
                                            remainTime="3일 남음"
                                        />

                                    );
                                })
                            }
                        </div>
                    </div>


                </Col>
            </Row>

        </Container>



    )



}

export default MainPage;