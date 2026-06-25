import { Container, Row, Col, Card, CardImg } from "react-bootstrap";
import dataset from '../datas/dataset.json';
import { useState } from "react";
import { data } from "react-router";
import '../csss/MainPage.css';


function MainPage() {

    console.log(dataset);

    dataset.sort((a, b) => {
        return (
            Number(b.조회수) - Number(a.조회수)
        )

    })
    console.log(dataset);


    return (

        <Container>

            <Row style={{ columnGap: '20px', position: 'relative' }}>
                <Col style={{ flex: '1', border: '2px solid gray', borderRadius: '15px', borderRight: '2px solid gray', paddingRight: '20px' }}>
                <div className="MainPage-Title"><img src="/images/shopping_basket.png"alt="중고 거래"/>
                    <span className="MainPage-Font-Main" style={{ color: 'orange' }}>중고 거래</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {
                            dataset.map((data, index) => {
                                if (index > 5) {
                                    return;
                                }
                                return (
                                    <Card style={{
                                        width: '80%', height: '15rem', display: 'flex', flexDirection: 'row',
                                        marginBottom: '18px', padding: '12px', border: 'none', borderRadius: '18px', border:'2px solid orange'
                                    }} key={index}>
                                        <Card.Img variant="string" src={'images/' + data.img} className="MainPage-picture-size" />
                                        <Card.Body className="MainPage-card-body">
                                            <Card.Title style={{ fontSize: '1.5rem' }}>{data.제목}</Card.Title>
                                            <Card.Text className="MainPage-Font-Text-Size">
                                                카테고리:{data.카테고리}
                                            </Card.Text>
                                            <Card.Text className="MainPage-Font-Text-Size" style={{color:'orange'}}>
                                                가격:{data.가격}
                                            </Card.Text>
                                            <Card.Text className="MainPage-Font-Text-Size">
                                                조회수:{data.조회수}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>

                                );
                            })
                        }
                    </div>


                </Col>
                
                <Col style={{ flex: '1', border: '2px solid gray', borderRadius: '15px', paddingLeft: '20px' }}>
                    <div className="MainPage-Title"><img src="/images/auction.png"alt="중고"/>
                    <span className="MainPage-Font-Main" style={{ color: 'blue' }}>경매</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {
                            dataset.map((data, index) => {
                                if (index > 5) {
                                    return;
                                }
                                return (
                                    <Card style={{
                                        width: '80%', height: '15rem', display: 'flex', flexDirection: 'row',
                                        marginBottom: '18px', padding: '12px', border: 'none', borderRadius: '18px', border:'2px solid skyblue'
                                    }} key={index}>
                                        <Card.Img variant="string" src={'images/' + data.img} className="MainPage-picture-size" />
                                        <Card.Body className="MainPage-card-body">
                                            <Card.Title style={{ fontSize: '1.5rem' }}>{data.제목}</Card.Title>
                                            <Card.Text className="MainPage-Font-Text-Size">
                                                카테고리:{data.카테고리}
                                            </Card.Text>
                                            <Card.Text className="MainPage-Font-Text-Size" style={{color:'blue'}}>
                                                가격:{data.가격}
                                            </Card.Text>
                                            <Card.Text className="MainPage-Font-Text-Size">
                                                조회수:{data.조회수}
                                            </Card.Text>
                                            <Card.Text>남은시간: 3일 01:11:23s</Card.Text>
                                        </Card.Body>
                                    </Card>

                                );
                            })
                        }
                    </div>



                </Col>
            </Row>

        </Container>



    )



}

export default MainPage;