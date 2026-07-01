import '../csss/MainSecondHand.css';
import { Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import dataset from '../datas/dataset.json';
import TradeCategory from './TradeCategory';
import { data, useNavigate, useParams } from 'react-router';
import TradeDetail from './TradeDetail';
import ProductCard from "./ProductCard";


function MainSecondHand() {

    let navigate = useNavigate();

    let [datas, setDatas] = useState(dataset);
    let babo = [...dataset];


    datas.sort((a, b) => {
        return (
            Number(b.조회수) - Number(a.조회수)
        )

    })

    let babobabo = babo.filter((item) => {
        return (
            item.카테고리 === '굿즈'
        );
    })

    let gg = dataset.filter((item) => {
        return (
            item.카테고리 === '장난감'
        )
    })

    let st = 'red';
    let hot = { 'color': st }


    let [gang, setgang] = useState({ color: 'red' });

    function changeGang() {
        console.log(gang);

        console.log('gang color: ' + gang.color)
        if (gang.color == 'blue') {
            console.log('blue')
            setgang({ color: 'red' })
        } else {
            console.log('red')
            setgang({ color: 'blue' })
        }
    }

    useEffect(() => {
        // const intv= setTimeout(changeGang(), 1000)
        const tm = setTimeout(changeGang, 1000)
        return () => {
            clearTimeout(tm);
        }
    }, [gang])


    return (

        <Container style={{ width: '100%', margin: '0', padding: '0' }}>
            <div className='trade-layout'>
                <div className='trade-sidebar'>
                    {/* 카테고리 영역 */}
                    <p style={{ fontWeight: 'bold', fontSize: '23px' }} onClick={() => navigate('/MainSecondHand')}>중고카테고리</p>
                    <p onClick={() => navigate('/trade-category/생활가전')}>생활/가전</p>
                    <p onClick={() => navigate('/trade-category/낚시용품')}>낚시용품</p>
                    <p onClick={() => navigate('/trade-category/IT기기')}>IT기기</p>
                    <p onClick={() => navigate('/trade-category/의류')}>의류</p>
                    <p onClick={() => navigate('/trade-category/반려용품')}>반려용품</p>
                    <p onClick={() => navigate('/trade-category/가구')}>가구</p>
                    <p onClick={() => navigate('/trade-category/장난감')}>장난감</p>
                    <p onClick={() => navigate('/trade-category/서적')}>서적</p>
                    <p onClick={() => navigate('/trade-category/굿즈')}>굿즈</p>
                    <p onClick={() => navigate('/trade-category/헬스')}>헬스</p>
                </div>


                {/* 오른쪽 구역 */}
                <div style={{
                    flex: 1,
                    paddingTop: "40px"
                }}>


                    <div className='trade-section'>
                        {/* 카드 목록 영역 */}
                        <p className='trade-fontstyle'>🔥인기상품<span style={gang}>HOT</span></p>


                        <div className="card-grid">
                            {datas
                                .slice(0, 4)
                                .map((data) => (
                                    <ProductCard
                                        key={data.id}
                                        image={data.img}
                                        title={data.제목}
                                        category={data.카테고리}
                                        price={data.가격}
                                        views={data.조회수}
                                        auction={false}
                                        onClick={() => navigate("/trade-detail/" + data.id)}
                                    />
                                ))}
                        </div>
                    </div>


                    <div className="trade-section">
                        <p className="trade-fontstyle">굿즈</p>

                        <div className="card-grid">
                            {babobabo
                                .slice(0, 4)
                                .map((data) => (
                                    <ProductCard
                                        key={data.id}
                                        image={data.img}
                                        title={data.제목}
                                        category={data.카테고리}
                                        price={data.가격}
                                        views={data.조회수}
                                        auction={false}
                                        onClick={() => navigate("/trade-detail/" + data.id)}
                                    />
                                ))}
                        </div>
                    </div>



                    <div className="trade-section">
                        <p className="trade-fontstyle">장난감</p>

                        <div className="card-grid">
                            {gg
                                .slice(0, 4)
                                .map((data) => (
                                    <ProductCard
                                        key={data.id}
                                        image={data.img}
                                        title={data.제목}
                                        category={data.카테고리}
                                        price={data.가격}
                                        views={data.조회수}
                                        auction={false}
                                        onClick={() => navigate("/trade-detail/" + data.id)}
                                    />
                                ))}
                        </div>
                    </div>


                </div>
            </div>

        </Container>



    );
}


export default MainSecondHand;