import '../csss/MainSecondHand.css';
import { Container, Row, Col, Card, CardImg } from "react-bootstrap";
import { useState } from 'react';
import dataset from '../datas/dataset.json';

function MainSecondHand() {


let [datas,setDatas] = useState(dataset);






    return (
        
        <Container style={{width:'100%',margin:'0',padding:'0'}}>           
            <div style={{display:'flex',justifyContent:'space-between'}}>
                <div style={{width:'23%',border:'1px solid black', position: 'sticky'}}>
                    {/* 카테고리 영역 */}
                    <p style={{fontWeight:'bold',fontSize:'30px'}}>중고카테고리</p>
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




                <div style={{width:'73%',border:'1px solid orange'}}>
                    {/* 카드 목록 영역 */}

                    
                </div>



            </div>

        </Container>



    );
}


export default MainSecondHand;
