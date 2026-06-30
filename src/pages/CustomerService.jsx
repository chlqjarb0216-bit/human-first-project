import '../csss/CustomerService.css';
import { useRef } from 'react';


function customerService({ loginUser }) {


    let inquiryRef = useRef(null);

    function sendInquiry() {

        if (loginUser == null) {
            alert("로그인 후 이용해주세요.");
            return;
        }

        if (inquiryRef.current.value.trim() === "") {
            alert("문의 내용을 입력하세요.");
            inquiryRef.current.focus();
            return;
        }

        const angry = new Intl.DateTimeFormat("fr-CA").format( new Date() );

        let newInquiry = {
            email: loginUser.email,
            nickName: loginUser.nickName,
            content: inquiryRef.current.value,
            inquiriedDate : angry,
        };

        let savedInquiries =
            JSON.parse(localStorage.getItem("inquiries")) || [];

        savedInquiries.push(newInquiry);

        localStorage.setItem(
            "inquiries",
            JSON.stringify(savedInquiries)
        );

        alert("문의가 접수되었습니다.");

        inquiryRef.current.value = "";
        inquiryRef.current.focus();
    }
    return (
        <div>
            <div>
                <h2 className="customer-title">고객센터</h2>
                <p className="customer-subtitle">
                    궁금한 점이 있으시면 아래 내용을 확인해주세요.
                </p>
            </div>

            <div className="customer-page">


                <div className="customer-box">
                    <h4>자주 묻는 질문</h4>

                    <div className="faq-item">
                        <strong>Q. 상품 등록은 어떻게 하나요?</strong>
                        <p>A. 로그인 후 중고 메인페이지에서 상품등록버튼을 통해 등록할수있습니다.</p>
                    </div>

                    <div className="faq-item">
                        <strong>Q. 거래는 어떻게 진행되나요?</strong>
                        <p>A. 상품 상세페이지에서 즉시구매나 판매자와의 대화를 통해 진행합니다.</p>
                    </div>

                    <div className="faq-item">
                        <strong>Q. 신고는 어떻게 하나요?</strong>
                        <p>A. 문제가 있는 게시글은 고객센터를 통해 신고할 수 있습니다.</p>
                    </div>
                </div>

                <div className="customer-box">
                    <h4>문의하기</h4>

                    <textarea ref={inquiryRef} placeholder="문의 내용을 입력하세요"></textarea>

                    <button onClick={sendInquiry}>문의 보내기</button>
                </div>
            </div>

        </div>
    );








}


export default customerService;