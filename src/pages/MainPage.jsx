import { Container, Row, Col, Card, CardImg } from "react-bootstrap";
import dataset from '../datas/dataset.json';
import { useState } from "react";
import { data } from "react-router";
import '../csss/MainPage.css';


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

                    <img src="/images/banner.png" alt="banner" />

                </div>

            </div>

            {/* 수정 */}
            <Row className="g-4">
                <Col md={6}>
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

                        <div className="card-grid">

                            {
                                dataset.map((data, index) => {
                                    if (index > 5) {
                                        return;
                                    }
                                    return (
                                        // 삭제 + 추가
                                        <Card className="product-card" key={index}>

                                            {/* 수정 */}
                                            <Card.Img
                                                src={'images/' + data.img}
                                                className="product-image"
                                            />

                                            {/* 수정 */}
                                            <Card.Body>

                                                <Card.Title className="product-name">
                                                    {data.제목}
                                                </Card.Title>

                                                <Card.Text className="product-category">
                                                    {data.카테고리}
                                                </Card.Text>

                                                <Card.Text className="product-price">
                                                    ₩ {Number(data.가격).toLocaleString()}
                                                </Card.Text>

                                                <Card.Text className="product-view">
                                                    👁 {data.조회수}
                                                </Card.Text>

                                                <Card.Text className="auction-time" style={{ visibility: "hidden" }}>
                                                    남은시간 3일
                                                </Card.Text>

                                            </Card.Body>
                                        </Card>

                                    );
                                })
                            }
                        </div>
                    </div>

                </Col>

                {/* 수정 */}
                <Col lg={6}>
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
                        <div className="card-grid">
                            {
                                dataset.map((data, index) => {
                                    if (index > 5) {
                                        return;
                                    }
                                    return (
                                        //수정
                                        <Card className="product-card" key={index}>

                                            <Card.Img
                                                src={'images/' + data.img}
                                                className="product-image"
                                            />

                                            {/* 수정 */}
                                            <Card.Body>

                                                <Card.Title className="product-name">
                                                    {data.제목}
                                                </Card.Title>

                                                <Card.Text className="product-category">
                                                    {data.카테고리}
                                                </Card.Text>

                                                <Card.Text className="product-price">
                                                    ₩ {Number(data.가격).toLocaleString()}
                                                </Card.Text>

                                                <Card.Text className="product-view">
                                                    👁 {data.조회수}
                                                </Card.Text>

                                                <Card.Text className="auction-time">
                                                    남은시간 3일
                                                </Card.Text>

                                            </Card.Body>
                                        </Card>

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