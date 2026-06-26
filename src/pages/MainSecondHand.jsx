import '../csss/MainSecondHand.css';
import { Container, Row, Col, Card, CardImg, CardGroup } from "react-bootstrap";
import { useState, useEffect } from 'react';
import dataset from '../datas/dataset.json';

function MainSecondHand() {



    let [datas, setDatas] = useState(dataset);
    let babo = [...dataset];


    datas.sort((a, b) => {
        return (
            Number(b.조회수) - Number(a.조회수)
        )

    })

    let babobabo = babo.filter((item)=>{
        return(
            item.카테고리 === '굿즈'
        );
    })

    let gg =  dataset.filter((item)=>{
        return(
            item.카테고리 === '장난감'
        )
    })

    let st = 'red';
    let hot = {'color':st}


    let [gang,setgang]  = useState({color:'red'});

    function changeGang(){
        console.log(gang);

        console.log('gang color: '+gang.color) 
        if( gang.color == 'blue'){
            console.log('blue')
            setgang({color:'red'})
        }else {
            console.log('red')
            setgang({color:'blue'})               
        }  
    }

    useEffect(()=>{
        // const intv= setTimeout(changeGang(), 1000)
        const tm = setTimeout(changeGang, 1000)
        return ()=>{
            clearTimeout(tm);
        }
    }, [gang])


    return (

        <Container style={{ width: '100%', margin: '0', padding: '0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                <div style={{ width: '23%', border: '1px solid black', position: 'sticky', top:'80px', borderRadius:'10px' }}>
                    {/* 카테고리 영역 */}
                    <p style={{ fontWeight: 'bold', fontSize: '30px' }}>중고카테고리</p>
                    <p>생활/가전</p>
                    <p>낚시용품</p>
                    <p>it기기</p>
                    <p>의류</p>
                    <p>반려용품</p>
                    <p>가구</p>
                    <p>장난감</p>
                    <p>서적</p>
                    <p>굿즈</p>
                </div>

                <div style={{ width: '73%', height:'fit-content' }}>
                    <div className='SecondHand-section'>
                    {/* 카드 목록 영역 */}
                    <p className='SecondHand-fontstyle'>🔥인기상품<span style={gang}>HOT</span></p>
                    <CardGroup>
                        {
                            datas.map((data, index) => {
                                if (index > 2) {
                                    return;
                                }
                                return(
                                <Card>
                                    <Card.Img variant="string" src={'images/' + data.img} className='MainSecondHand-Photo-Size' />
                                    <Card.Body>
                                        <Card.Title>{data.제목}</Card.Title>
                                        <Card.Text>
                                            {/* 첫번째 인기품목 가격 등 들어갈곧 */}
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Card.Text style={{margin:'0'}}>
                                            <small className="text-muted">태그:{data.태그}</small>
                                        </Card.Text>
                                        <Card.Text>
                                            <small className="text-muted">카테고리:{data.카테고리}</small>
                                        </Card.Text>
                                        
                                        
                                    </Card.Footer>
                                    
                                </Card>
                                );
                            })
                        }
                    </CardGroup>
                    </div>

                



                <div className='SecondHand-section'>
                    {/* 카드 목록 영역 */}
                    <p className='SecondHand-fontstyle'>굿즈</p>
                    <CardGroup>
                        {
                            babobabo.map((data, index) => {
                                if (index > 2) {
                                    return;
                                }
                                return(
                                <Card>
                                    <Card.Img variant="string" src={'images/' + data.img} className='MainSecondHand-Photo-Size' />
                                    <Card.Body>
                                        <Card.Title>{data.제목}</Card.Title>
                                        <Card.Text>
                                            {/* 첫번째 인기품목 가격 등 들어갈곧 */}
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Card.Text style={{margin:'0'}}>
                                            <small className="text-muted">태그:{data.태그}</small>
                                        </Card.Text>
                                        <Card.Text>
                                            <small className="text-muted">카테고리:{data.카테고리}</small>
                                        </Card.Text>
                                        
                                        
                                    </Card.Footer>
                                    
                                </Card>
                                );
                            })
                        }
                    </CardGroup>
                    

                </div>

                        <div className='SecondHand-section'>
                    {/* 카드 목록 영역 */}
                    <p className='SecondHand-fontstyle'>장난감</p>
                    <CardGroup>
                        {
                            gg.map((data, index) => {
                                if (index > 2) {
                                    return;
                                }
                                return(
                                <Card>
                                    <Card.Img variant="string" src={'images/' + data.img} className='MainSecondHand-Photo-Size' />
                                    <Card.Body>
                                        <Card.Title>{data.제목}</Card.Title>
                                        <Card.Text>
                                            {/* 첫번째 인기품목 가격 등 들어갈곧 */}
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Card.Text style={{margin:'0'}}>
                                            <small className="text-muted">태그:{data.태그}</small>
                                        </Card.Text>
                                        <Card.Text>
                                            <small className="text-muted">카테고리:{data.카테고리}</small>
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



    );
}


export default MainSecondHand;
