import '../csss/TradeCategory.css';
import '../csss/MainSecondHand.css';
import { Container, Row, Col, Card, CardImg, CardGroup, Button } from "react-bootstrap";
import { useState, useEffect } from 'react';
import dataset from '../datas/dataset.json';
import TradeCategoty from './TradeCategory';
import { data, useNavigate, useParams } from 'react-router';
import '../csss/TreadDetail.css';


function TradeDetail() {

    let navigate = useNavigate();

    let { id } = useParams();



    let idDatas = dataset.filter((item)=>{
        return(
            item.id === Number(id)
        )
    })

    console.log(id);
    console.log(useParams());

    return (
        <Container style={{ width: '100%', margin: '0', padding: '0' }}>


                <div style={{ width: '100%', height: 'fit-content', marginLeft:'4rem' }}>
                    <div style={{border:'1px solid orange'}}>
                        {/* 카드 목록 영역 */}
                        <CardGroup>
                            {
                                idDatas.map((data)=>{
                                    return (
                                        <Card className='TreadDetail-card-style'>
                                            <Card.Img variant="string" src={'/images/' + data.img} className='TreadDetail-poto-size' />
                                            <Card.Body className='TreadDetail-body-size'>
                                                <Card.Text>
                                                    <small className="text-dark" style={{fontSize:'3rem'}}>{data.제목}</small>
                                                </Card.Text>
                                                <Card.Text>
                                                    <small className="text-Dark" style={{fontSize:'2rem'}}>카테고리:{data.카테고리}</small>
                                                </Card.Text>
                                                <Card.Text>
                                                    <small className="text-danger" style={{fontSize:'1.2rem'}}>가격:{data.가격}</small>
                                                </Card.Text>
                                                <Card.Text>
                                                    <small className="text-muted" style={{fontSize:'1rem'}}>{data.상세설명}</small>
                                                </Card.Text>

                                                <Button variant="warning" disabled = {!data.즉시거래}>즉시거래</Button><Button variant="success" disabled = {!data.채팅}>판매자와대화</Button>
                                            </Card.Body>

                                        </Card>
                                    );
                                })
                            }
                        </CardGroup>
                    </div>
                </div>

        </Container>
    )



}

export default TradeDetail;