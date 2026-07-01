//상단은 초기설정 및 데이터 바구니 ( ~ 59line)
// -> 필요한 도구를 가져오고, 사용자가 입력할 데이터를 저장할 공간을 만듦.

//state : 전체 페이지의 이미지 속의 UI를 실제로 작동하게 만드는 '두뇌'역할 중 상태들..

import { useRef, useState } from "react";
import { useNavigate } from "react-router";
//useState : 화면의 글자나 이미지 목록처럼 변하는 데이터를 담는 상자.
//useRef : HTML요소(숨겨진 파일 입력창)를 직접 가리킬 때 쓰는 집게..
import "../csss/PostRegister.css";
import nowDate from '../pure_functions/nowDate'
import storage from "../pure_functions/storage";
import keys from '../datas/localStorageKeys.json'

const categoryList = [
    "생활/가전",
    "낚시용품",
    "IT기기",
    "의류",
    "반려용품",
    "가구",
    "장난감",
    "서적",
    "굿즈",
    "헬스",
];

export default function PostRegister({loginUser}) {

    const navigate = useNavigate();

    const fileInputRef = useRef(null);

    const titleRef = useRef(null);      //제목입력창에 커서 바로 이동하게 추가..!

    const productRef = useRef(null);      //물품입력창에 커서 바로 이동하게 추가..!

    const categoryRef = useRef(null);  //카테고리 미선택시 바로 이동하게 추가..!

    const imageRef = useRef(null);      //이미지 미등록시 검사

    const priceRef = useRef(null);      //가격 미입력 검사 추가

    const textareaRef = useRef(null);    //상품 설명 미입력 검사 추가

    const tagRef = useRef(null);        //태그 미입력 검사 추가


    const [category, setCategory] = useState("");   //카테고리 css적용

    const [images, setImages] = useState([]);
    const [imgNames, setImgNames] = useState([]);

    const [instantTrade, setInstantTrade] = useState(false);    //즉시거래

    const [chatTrade, setChatTrade] = useState(true);           //채팅


    //이미지 업로드 로직
    // "이미지 추가" 박스를 눌렀을 때 일어나는 ~
    const handleImageClick = () => {
        //실제 파일 선택창(input type="file") 159line ~ 디자인하기 어려워서 hidden으로 숨겨두고
        // 디자인된 "이미지 추가" 박스를 클릭하면, 대신 파일창을 클릭해주는 함수..

        fileInputRef.current.click();

    };



    const handleImageUpload = (e) => {

        const files = Array.from(e.target.files);

        if (images.length + files.length > 9) {

            alert("이미지는 최대 9장까지 가능합니다.");

            return;

        }

        // const 들여쓴 이유~ URL. ..
        const preview = files.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));;

        const imgNames = files.map(file=>file.name)

        setImages(prev => [...prev, ...preview]);

        setImgNames(prev=>[...prev,...imgNames])

        e.target.value = "";

        /* 이런 형태로 저장됨..
        [
            {
                file: File,
                preview: "blob:http://localhost/..."
            },
            {
                file: File,
                preview: "blob:http://localhost/..."
            }
        ]
        */

    };



    const removeImage = (index) => {
        // X 버튼을 누르면 이미지를 목록에서 지움.

        URL.revokeObjectURL(images[index].preview);
        //메모리 낭비를 방지하기 위해 임시주소(생성했던)를 해제해 줌..

        setImages(images.filter((_, i) => i !== index));

    };


    // 검사 및 제출 로직
    const handleSubmit = (e) => {
        //"중고등록"버튼을 눌렀을 때 실행 됨.
        //물품명이 비어 있거나 카테고리를 선택하지 않았다면 alert 창을 띄워 사용자에게 알려줌.

        e.preventDefault();

        // 이미지 검사
        if (images.length === 0) {

            imageRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            alert("상품 이미지를 등록하세요.");

            return;
        }


        //제목 검사
        if (titleRef.current.value.trim() === "") {

            titleRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            titleRef.current.focus();   //빈칸 시 커서 이동

            alert("제목을 입력하세요.");

            return;

        }


        //물품명 검사
        if (productRef.current.value.trim() === "") {

            productRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            productRef.current.focus();   //빈칸 시 커서 이동

            alert("물품명을 입력하세요.");

            return;

        }

        //가격 검사
        const price = priceRef.current.value.replace(/,/g, "");

        if (price === "" || Number(price) <= 0) {

            priceRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            priceRef.current.focus();

            alert("판매 가격은 0원보다 크게 입력하세요.");

            return;
        }


        //태그 검사
        if (tagRef.current.value.trim() === "") {

            tagRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            tagRef.current.focus();   //빈칸 시 커서 이동

            alert("태그를 입력하세요.");

            return;







        }


        //카테고리 검사
        if (categoryRef.current.value === "") {

            categoryRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center"
            })

            categoryRef.current.focus();    //커서 이동 (셀렉창 색깔만 바뀜, 드롭다운X)

            alert("카테고리를 선택하세요.");

            return;

        }

        //상품 설명 검사
        if (textareaRef.current.value.trim() === "") {

            textareaRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center"
            })

            textareaRef.current.focus();

            alert("상품 설명을 입력하세요.");

            return;
        }

        //거래 형식 검사
        if (!instantTrade && !chatTrade) {

            alert("거래 형식을 하나 이상 선택하세요.");

            return;
        }


        alert("등록 완료");
        navigate(-1);




        let idNext = storage.get(keys.tradeItemIdNextKey,100)
        const tradeDataList = storage.get(keys.tradeItemListKey,[])
        const itemInfo = {
            "id":idNext++,
            "img":imgNames.length==1?imgNames[0]:imgNames,
            "즉시거래":shipping,
            "채팅":chattrade,
            "카테고리":categoryRef.current.value,
            "품목":titleRef.current.value,
            "제목":"LG 디오스 양문형 냉장고",
            "가격":priceRef.current.value,
            "태그":"LG,냉장고,양문형",
            "상세설명":descriptionRef.current.value,
            "조회수":0,
            "등록일시":nowDate(),
            "등록유저ID":loginUser.id
        }
        tradeDataList.push(itemInfo)

        storage.set(keys.tradeItemIdNextKey, idNext)
        storage.set(keys.tradeItemListKey,tradeDataList)

    };


    //화면 구성 - 상단 및 이미지 섹션
    // 실제 눈에 보이는 UI 구조
    return (

        <div className="register-container">

            <div className="register-card">

                <h2 className="register-title">

                    중고 물품 등록

                </h2>

                <p className="register-notice">

                    <span className="required">*</span>
                    필수 입력 항목입니다.

                </p>


                {/* bootstrap alert */}
                {/* {error && (
                    <div className="alert alert-danger error-alert" role="alert">
                        {error}
                    </div>
                )} */}

                <form onSubmit={handleSubmit}>


                    <div className="form-group">

                        <label className="form-label" htmlFor="img-upload">
                            {/* htmlFor - 📸버튼 말고 '상품 이미지*' 글자를 눌러도 업로드창 띄워짐 */}

                            상품 이미지

                            <span className="required">*</span>

                        </label>

                        <input id="img-upload" type="file"
                            //인풋타입 .. handleImageUpload (55 line)
                            multiple accept="image/*"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            hidden
                        />

                        <div className="image-list-wrapper">

                            <div
                                className="image-upload-box"
                                onClick={handleImageClick}
                                ref={imageRef}          //이미지 커서이동
                            >
                                📸 <br />
                                <br />
                                이미지 추가

                            </div>

                            {

                                images.map((img, index) => (
                                    //저장된 이미지 배열을 하나씩 꺼내서 화면에 미리보기 이미지와 삭제 버튼을 구현..

                                    <div
                                        key={index}
                                        className="preview-image-container"
                                    >

                                        <img
                                            src={img.preview}
                                            className="preview-image"
                                        />

                                        <button
                                            type="button"
                                            className="image-delete-btn"
                                            onClick={() => removeImage(index)}
                                        >

                                            ×

                                        </button>

                                    </div>

                                ))

                            }

                        </div>

                    </div>



                    {/* 제목 */}
                    <div className="form-group">

                        <label className="form-label">
                            {/* label : "제목*" 이라는 이름을 표시해줌. */}
                            제목
                            <span className="required">*</span>
                        </label>

                        <input type="text"  //input : 실제 글자를 입력하는 창
                            className="form-input"
                            placeholder="제목을 입력하세요."
                            maxLength={50}  //최대 50자 까지만 제한

                            //ref를 이용해 입력값을 검사.
                            ref={titleRef}  //제목 빈칸일때 커서 이동
                        />

                        <div className="char-count">
                            최대 50자
                            {/* 우측 하단에 현재 몇글자를 썼는지 숫자로 보여줌. */}
                        </div>

                    </div>



                    {/* 물품명 */}
                    <div className="form-group">

                        <label className="form-label">
                            물품명
                            <span className="required">*</span>
                        </label>

                        <input type="text"  //input : 실제 글자를 입력하는 창
                            className="form-input"
                            placeholder="물품명을 입력하세요."
                            maxLength={30}  //최대 30자 까지만

                            ref={productRef}  //물품명 빈칸일때 커서 이동
                        />

                        <div className="char-count">
                            최대 30자
                        </div>

                    </div>


                    {/* 가격 */}
                    <div className="form-group">
                        <label className="form-label">판매 가격
                            <span className="required">*</span>
                        </label>
                        <div className="price-input-wrapper">
                            <input
                                type='text'
                                className="form-input price-input"

                                //가격 콤마 추가
                                onInput={(e)=> {

                                    const value = e.target.value.replace(/[^0-9]/g, "");
                                    e.target.value = value
                                        ? Number(value).toLocaleString("ko-KR")
                                        : "";

                                }}

                                ref={priceRef}  //가격 미입력 검사
                                placeholder="판매가격을 입력하세요."
                            />
                            <span className="price-unit">원</span>
                        </div>

                    </div>


                    {/* 태그 */}
                    <div className="form-group">

                        <label className="form-label">태그
                            <span className="required">*</span>
                        </label>
                        
                        <div className="tag-input-wrapper">
                            <input
                                className="form-input"
                                placeholder="태그를 공백으로 구분하여 입력하세요."
                                ref={tagRef}    //커서 이동
                            />
                        </div>

                        <div className="char-count">
                            여러개 입력 시 공백을 사용해 주세요.
                        </div>

                    </div>


                    {/* 카테고리 */}
                    <div className="form-group">
                        <label className="form-label">
                            카테고리
                            <span className="required">*</span>
                        </label>

                        <select
                            className="form-input"
                            ref={categoryRef}
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            //카테고리 선택 전 회색 / 선택 후 검정
                            style={{ color: category === "" ? "#999" : "#333" }}
                        >
                            <option value="" disabled>
                                카테고리를 선택하세요.
                            </option>

                            {categoryList.map(item => (
                                <option key={item}
                                    value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>





                    {/* 상품 상태 */}

                    {/* <div className="form-group">

                        <label className="form-label">
                            상품 상태
                        </label>

                        <select
                            className="form-input"
                            value={condition}
                            onChange={(e) => setCondition(e.target.value)}
                        >
                            <option value="">선택하세요.</option>
                            <option value="new">새상품</option>
                            <option value="like-new">거의 새상품</option>
                            <option value="good">사용감 적음</option>
                            <option value="used">사용감 많음</option>
                        </select>

                    </div> */}



                    {/* 상세 설명 (검사 *추가) */}

                    <div className="form-group">

                        <label className="form-label">

                            상품 설명
                            <span className="required">*</span>

                        </label>

                        <textarea className="form-input"
                            rows={8}
                            placeholder="상품 상태, 구성품, 구매 시기 등을 입력하세요."

                            ref={textareaRef}    //상품 설명 미입력 검사

                        />

                    </div>



                    {/* 거래 형식 토글(체크박스) */}
                    <div className="form-group">
                        <label className="form-label">

                            거래 형식
                            <span className="required">*</span>

                        </label>



                        {/* 즉시거래 / 채팅 */}
                        <div className="trade-switch-group">
                            <div className="form-check form-switch">


                                <input className="form-check-input"
                                    type="checkbox"
                                    checked={instantTrade}
                                    onChange={(e) => setInstantTrade(e.target.checked)}
                                />
                                <label className="form-check-label">
                                    즉시 거래
                                </label>
                            </div>



                            <div className="form-check form-switch">

                                <input className="form-check-input"
                                    type="checkbox"
                                    checked={chatTrade}
                                    onChange={(e) => setChatTrade(e.target.checked)}
                                />

                                <label className="form-check-label">
                                    구매자와 대화
                                </label>

                            </div>
                        </div>

                        {/* 취소 / 등록 버튼 */}

                        <div className="form-actions">

                            <button type="button"
                                className="btn-cancel"
                                onClick={() => navigate("/")}
                            // onClick={() => window.history.back()}
                            >
                                취소
                            </button>

                            <button
                                type="submit"
                                className="btn-submit"
                            >
                                중고 등록
                            </button>

                        </div>
                    </div>
                </form>

            </div >

        </div >

    );
}