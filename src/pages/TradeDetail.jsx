import '../csss/TradeDetail.css';
import { Container, Card, CardImg, Button } from "react-bootstrap";
import { useState, useEffect } from 'react';
import dataset from '../datas/dataset.json';
import TradeCategoty from './TradeCategory';
import { data, useNavigate, useParams } from 'react-router';


function TradeDetail() {

    let navigate = useNavigate();

    let { id } = useParams();



    let idDatas = dataset.filter((item) => {
        return (
            item.id === Number(id)
        )
    })

    console.log(id);
    console.log(useParams());

    return (
        <Container style={{ width: '100%', margin: '0', padding: '0' }}>


            <div style={{ width: '100%', height: 'fit-content', marginLeft: '4rem' }}>

                {/* 카드 목록 영역 */}
                <div className="TradeDetail-wrap">
                    {idDatas.map((data) => (
                        <Card className="trade-detail-card">
                            <Card.Img
                                variant="top"
                                src={"/images/" + data.img}
                                className="trade-detail-image"
                            />

                            <Card.Body className="trade-detail-body">
                                <h1 className="trade-detail-title">
                                    {data.제목}
                                </h1>

                                <Card.Text>
                                    <small className="trade-detail-category" style={{ fontSize: "1.4rem" }}>
                                        카테고리 : {data.카테고리}
                                    </small>
                                </Card.Text>

                                <Card.Text>
                                    <p className="trade-detail-item" style={{ fontSize: "1.0rem" }}>
                                        품목 : {data.품목}
                                    </p>
                                </Card.Text>


                                <Card.Text>
                                    <p className="trade-detail-tag" style={{ fontSize: "0.9rem" }}>
                                        태그 : {data.태그}
                                    </p>
                                </Card.Text>

                                <Card.Text>
                                    <p className="trade-detail-price" style={{ fontSize: "1.4rem" }}>
                                        ₩ {Number(data.가격).toLocaleString()}
                                    </p>
                                </Card.Text>

                                <Card.Text>
                                    <small className="trade-detail-description" style={{ fontSize: "0.9rem" }}>
                                        {data.상세설명}
                                    </small>
                                </Card.Text>

                                <div className="trade-detail-buttons">
                                    <Button variant="warning" disabled={!data.즉시거래}>
                                        즉시거래
                                    </Button>

                                    <Button variant="success" disabled={!data.채팅}>
                                        판매자와 대화
                                    </Button></div>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </div>


        </Container>
    )



}

export default TradeDetail;