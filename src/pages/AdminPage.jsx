import { Container, Card, Button } from "react-bootstrap";
import { useState } from "react";
import '../csss/AdminPage.css';

function AdminPage() {

    let [inquiries, setInquiries] = useState(JSON.parse(localStorage.getItem("inquiries")) || []);

    return (
        <div>
            <h2>문의 내역 관리</h2>
            {
                inquiries.length === 0 ? <p>등록된 문의가 없습니다</p> : inquiries.map((item) => {
                    return (
                        <div className="admin-page-divStyle">
                            <p>닉네임:{item.nickName}</p>
                            <p>이메일{item.email}</p>
                            <p>문의내용:{item.content}</p>
                        </div>
                    );
                })
            }
        </div>
    )





}

export default AdminPage;