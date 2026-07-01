import '../csss/Footer.css';
import { FaFacebookF, FaInstagram, FaTwitter, FaComment } from "react-icons/fa";
import { useNavigate } from 'react-router';
import customerService from './CustomerService';
import MainSecondHand from './MainSecondHand';
import About from './about';


function Footer() {

    let navigate = useNavigate();

    return (

        <footer className="footer">

            <div className="footer-container">

                <div className="footer-left">

                    <h5>UM.HYUN.GUE</h5>

                    <p>상호 : (주)엄현규</p>
                    <p>대표자 : 엄현규</p>
                    <p>사업자등록번호 : 4882-4882-48824882</p>
                    <p>통신판매업신고번호 : 제4882-천안-4882호</p>
                    <p>전화 : 041-4882-4002</p>
                    <p>이메일 : umhyungue@google.com</p>
                    <p>주소 : 大阪府大阪市中央区宗右衛門町6 笠屋町ギャラクシービル 2F</p>

                </div>

                <div className="footer-center">

                    <p onClick={() => navigate('/MainSecondHand')}>중고 메인</p>
                    <p onClick={() => navigate('/customer-service')}>CUSTOMER SERVICE</p>                  
                    <p onClick={() => navigate('/about')}>ABOUT</p>

                </div>

                <div className="footer-right">

                    <FaFacebookF  onClick={()=>{window.open('https://www.facebook.com/DonaldTrump/',"_blank")}}/>
                    <FaInstagram onClick={()=>{window.open('https://www.instagram.com/zelenskyy_official/',"_blank")}}/>
                    <FaTwitter onClick={()=>{window.open('https://x.com/Claudiashein',"_blank")}}/>
                    <FaComment onClick={()=>{window.open('https://www.youtube.com/watch?v=gx8XOndq4uc',"_blank")}}/>

                </div>

            </div>

            <div className="footer-bottom">

                LionKing © 2026 UM STYLE. All Rights Reserved.

            </div>

        </footer>


    )

}


export default Footer;