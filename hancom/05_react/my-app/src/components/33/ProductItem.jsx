import {useState} from "react";
import './ProductItem.css'

const ProductItem = ({name}) => {
    const [count, setCount] = useState(0)
    return (
        <div>
            <svg width="60" height="30" viewBox="0 0 60 30">
            </svg>

            <div style={{margin: "25px", padding: "25px"}}>
                <img src="../public/Logo_NIKE.svg" alt="Nike" style={{width: "25%", height: "auto"}} />
            </div>
            <div className="product">
                <h3>{name}</h3>
                <p>{count}개 담음</p>
            </div>
            <button onClick={() => setCount(c=>c+1)}>
                Product 담기
            </button>
        </div>
    )
}

export default ProductItem
