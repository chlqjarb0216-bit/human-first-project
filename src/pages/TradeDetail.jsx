import '../csss/MainSecondHand.css';
import '../csss/TradeCategory.css';
import { Container, Row, Col, Card, CardImg, CardGroup, Button } from "react-bootstrap";
import { useState, useEffect,useMemo } from 'react';
import dataset from '../datas/dataset.json';
import TradeCategoty from './TradeCategory';
import { data, useNavigate, useParams } from 'react-router';
import '../csss/TreadDetail.css';
import Chatting from './Chatting';
import storage from '../pure_functions/storage';
import keys from '../datas/localStorageKeys.json'
import nowDate from '../pure_functions/nowDate';


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
    const itemId = idDatas[0].id
    if(idDatas.status==="deleted"){
        alert("삭제된 물품입니다.")
        navigate('/')
    }
    if(idDatas.status==="completed"){
        if(props.loginUser.id!==idDatas.등록유저ID && props.loginUser.id!==idDatas.completeInfo.buyerId){
            alert("이미 거래 완료된 물품입니다.")
            navigate('/')
        }
    }

    const [isSeller, setIsSeller] = useState(() => {
        // 1. 로그인 유저 정보가 아예 없거나 null이면 무조건 주인이 아님(false) -> 원천 차단
        if (!props.loginUser || props.loginUser.id === null || props.loginUser.id === undefined) {
            return false; 
        }
        
        // 2. idDatas 내부 방 정보를 안전하게 긁어옴 (없으면 undefined)
        const ownerId = idDatas?.[0]?.등록유저ID; 
        
        // 3. ⭐️ 최종 안전 가드: ownerId가 진짜 존재하고, 그 값이 유저 id와 완벽하게 일치할 때만 true 반환
        return Boolean(ownerId) && ownerId === props.loginUser.id;
    });
    
    const hasChat = useMemo(() => {
        // 1. 셀러가 아니면 무거운 연산 근처에도 안 가고 즉시 false 탈출
        if (!isSeller) return false; 
        
        // 2. 셀러일 때만 최초 1회 로컬스토리지를 안전하게 조회
        const chatData = storage.get(itemId + "chat", {});
        return Object.keys(chatData).length !== 0;
        
    }, [isSeller, itemId]);

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

                                                <Button variant={isSeller?"danger":"warning"} disabled = {!data.즉시거래&&!isSeller} onClick={isSeller?()=>{
                                                    itemList[itemList.findIndex((item)=>item.id===itemId)].status = 'deleted'
                                                    storage.set(keys.tradeItemListKey,itemList)
                                                    const tmp={...props.loginUser,
                                                        items:props.loginUser.items.filter(item=>item!==itemId)
                                                    }
                                                    props.setLoginUser(tmp)
                                                    storage.set(keys.currentUser, {user:{...tmp}, time:nowDate()});
                                                    const userList = storage.get(keys.registedUserListKey)
                                                    userList.splice(userList.findIndex((user)=>user.id===tmp.id),1,tmp)
                                                    storage.set(keys.registedUserListKey, userList)
                                                    
                                                    alert('등록하신 물품이 삭제되었습니다.')
                                                    navigate('/MainSecondHand')
                                                }:()=>{
                                                    if (props.loginUser===null){
                                                        alert('로그인 후 이용해주세요')
                                                        return
                                                    }
                                                    navigate(`/final?itemId=${itemId}&buyerId=${props.loginUser.id}`)
                                                }}>{isSeller?"등록삭제":"즉시거래"}</Button><Button onClick={()=>{
                                                    if (props.loginUser===null){
                                                        alert('로그인 후 이용해주세요')
                                                        return
                                                    }
                                                    setViewChat(!viewChat)}} variant="success" disabled = {!data.채팅||(isSeller&&!hasChat)}>{isSeller?"채팅목록":"판매자와대화"}</Button>
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