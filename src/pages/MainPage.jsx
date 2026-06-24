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

            <Row>
                <Col style={{ backgroundColor: 'orange' }}>
                    <span>중고</span>
                    <div>
                        {
                            dataset.map((data, index) => {
                                if (index > 5) {
                                    return;
                                }
                                return (
                                    <Card style={{ width: '18rem', display:'flex', flexDirection:'row'}}>
                                        <Card.Img variant="string" src={'images/' + data.img} className="MainPage-picture-size"/>
                                        <Card.Body style={{fontSize:'15px', width:'50%'}}>
                                            <Card.Title>{data.품목}</Card.Title>
                                            <Card.Text>
                                                카테고리:{data.카테고리}
                                            </Card.Text>
                                            <Card.Text>
                                                가격:{data.가격}
                                            </Card.Text>
                                            <Card.Text>
                                                조회수:{data.조회수}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>

                                );
                            })
                        }
                    </div>


                </Col>
                <Col style={{ backgroundColor: 'skyblue' }}>
                    <span>경매</span>
                    <div>

                    </div>



                </Col>
            </Row>

        </Container>



    )



}

export default MainPage;