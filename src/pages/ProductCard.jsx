import { Card } from "react-bootstrap";
import "../csss/ProductCard.css";

function ProductCard({
    image,
    title,
    category,
    price,
    views,
    auction = false,
    remainTime = "",
    onClick
}) {
    return (
        <Card className="product-card" onClick={onClick}>
            <Card.Img
                src={"images/" + image}
                className="product-image"
            />

            <Card.Body className="product-body">

                <div className="product-header">
                    <h5>{title}</h5>

                    {auction ? (
                        <span className="auction-badge">경매</span>
                    ) : (
                        <span className="used-badge">중고</span>
                    )}
                </div>

                <div className="product-category">
                    {category}
                </div>

                <div className="product-price">
                    ₩ {Number(price).toLocaleString()}
                </div>

                <div className="product-footer">

                    <span>👁 {views}</span>

                    {auction && (
                        <span>{remainTime}</span>
                    )}

                </div>

            </Card.Body>
        </Card>
    );
}

export default ProductCard;