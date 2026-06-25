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

            <Row style={{border:'6px solid green', borderRadius: '15px'}}>
                <Col>
                    <span className="MainPage-Font-Main" style={{color:'red'}}>중고</span>
                    <div style={{display: 'flex',flexDirection:'column',alignItems: 'center'}}>
                        {
                            dataset.map((data, index) => {
                                if (index > 5) {
                                    return;
                                }
                                return (
                                    <Card style={{ width: '80%',height:'15rem' ,display:'flex', flexDirection:'row',
                                        marginBottom:'18px', padding: '12px', border:'none', borderRadius:'18px',backgroundColor:'orange'}} key={index}>
                                        <Card.Img variant="string" src={'images/' + data.img} className="MainPage-picture-size"/>
                                        <Card.Body className="MainPage-card-body">
                                            <Card.Title style={{fontSize:'1.5rem'}}>{data.제목}</Card.Title>
                                            <Card.Text className="MainPage-Font-Text-Size">
                                                카테고리:{data.카테고리}
                                            </Card.Text>
                                            <Card.Text className="MainPage-Font-Text-Size">
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
                <Col>
                    <span className="MainPage-Font-Main" style={{color:'blue'}}>경매</span>
                    <div>

                    </div>



                </Col>
            </Row>

        </Container>



    )



}

export default MainPage;