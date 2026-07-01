import '../csss/MainSecondHand.css';
import '../csss/TradeCategory.css';
import { Container, Row, Col, Card, CardImg, CardGroup, Button } from "react-bootstrap";
import { useState, useEffect } from 'react';
import dataset from '../datas/dataset.json';
import TradeCategoty from './TradeCategory';
import { data, useNavigate, useParams } from 'react-router';
import '../csss/TreadDetail.css';
import Chatting from './Chatting';
import storage from '../pure_functions/storage';
import keys from '../datas/localStorageKeys.json'


function TradeDetail(props) {

    let navigate = useNavigate();

    const [viewChat, setViewChat] = useState(false);

    let { id } = useParams();


    const itemList = storage.get(keys.tradeItemListKey)
    let idDatas = itemList.filter((item)=>{
        return(
            item.id === Number(id)
        )
    })
    console.log(idDatas)
    const [isSeller, setIsSeller] = useState(props.loginUser!==null && idDatas[0].등록유저ID===props.loginUser.id && props.loginUser.id!==undefined);
    console.log(isSeller)

    return (
        <Container style={{ width: '100%', margin: '0', padding: '0'}}>


                <div style={{ width: '100%', height: 'fit-content', marginLeft:'4rem', display:'flex'  }}>
                    <div style={viewChat?{border:'1px solid orange',width:'60%'}:{border:'1px solid orange'}}>
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

                                                <Button variant={isSeller?"danger":"warning"} disabled = {!data.즉시거래&&!isSeller} onClick={()=>{
                                                    itemList[itemList.findIndex((item)=>item.id===Number(id))].status = 'deleted'
                                                    storage.set(keys.tradeItemListKey,itemList)
                                                    alert('등록하신 물품이 삭제되었습니다.')
                                                    navigate('/MainSecondHand')
                                                }}>{isSeller?"등록삭제":"즉시거래"}</Button><Button onClick={()=>{
                                                    if (props.loginUser===null){
                                                        alert('로그인 후 이용해주세요')
                                                        return
                                                    }
                                                    setViewChat(!viewChat)}} variant="success" disabled = {!data.채팅}>{isSeller?"채팅목록":"판매자와대화"}</Button>
                                            </Card.Body>

                                        </Card>
                                    );
                                })
                            }
                        </CardGroup>
                    </div>
                    {viewChat&&<Chatting loginUser={props.loginUser} itemDetail={idDatas[0]} isSeller={isSeller}/>}
                </div>
                

        </Container>
    )



}

export default TradeDetail;