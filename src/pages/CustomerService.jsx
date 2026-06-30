import '../csss/CustomerService.css';


function customerService() {


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
                    <p>A. 로그인 후 글쓰기 버튼을 눌러 상품을 등록할 수 있습니다.</p>
                </div>

                <div className="faq-item">
                    <strong>Q. 거래는 어떻게 진행되나요?</strong>
                    <p>A. 상품 상세페이지에서 판매자 정보를 확인하고 직접 연락하여 거래합니다.</p>
                </div>

                <div className="faq-item">
                    <strong>Q. 신고는 어떻게 하나요?</strong>
                    <p>A. 문제가 있는 게시글은 고객센터를 통해 신고할 수 있습니다.</p>
                </div>
            </div>

            <div className="customer-box">
                <h4>문의하기</h4>

                <input type="text" placeholder="이름을 입력하세요" />
                <input type="email" placeholder="이메일을 입력하세요" />
                <textarea placeholder="문의 내용을 입력하세요"></textarea>

                <button>문의 보내기</button>
            </div>
        </div>

        </div>
    );








}


export default customerService;