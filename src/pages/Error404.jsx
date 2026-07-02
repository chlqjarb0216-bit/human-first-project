import MainPage from "./MainPage";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";



function Error404(){

    let navigate = useNavigate();


    return(
        <div style={{display:'flex', flexDirection:'column',alignItems:'center', backgroundColor:'yellow'}}>
            <h1 style={{color:'red', textAlign:'center'}}>잘못된 접근입니다 not found in the system 404</h1>
            <Button variant="danger" onClick={() => navigate('/')}>메인 페이지로 이동</Button>
        </div>

    )
}

export default Error404;