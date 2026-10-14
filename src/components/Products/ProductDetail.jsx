import {useState, useEffect} from "react";
import { useParams, Link } from 'react-router-dom';
import { useCart } from "../context/CartContext";
import styles from "./styles/ProductDetail.module.css";
import { MoveLeft } from 'lucide-react';


const ProductDetail = () => {
    const { id } = useParams();
    const {addToCart} = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [count, setCount] = useState(1);

    const manageAddToCart = () => {
        const formatProduct = {
            id: product.id,
            name: product.title,
            price: product.price,
            image: product.image
        };

        console.log("Agregar el Carrito:" ,{
            product: formatProduct,
            ammount: count
        })
        addToCart({product:formatProduct, ammount: count});
    }

    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    useEffect(() => {
        //setLoading(true);
        //setError(null);

        fetch(`/data/products.json`)
        .then((res) => {
            if (!res.ok) throw new Error('No se encontró el producto');
            return res.json();
        })
        .then((data) => {
            const foundProduct = data.find((item) => item.id === id);
            if (!foundProduct) throw new Error('Producto no encontrado');
            setProduct(foundProduct);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!product) return <p>Producto no encontrado</p>;


    return (
        <>
            <div className={styles.productDetail}>
                <div className={styles.goBack}><Link to="/products" className={styles.backLink}><MoveLeft strokeWidth={1} />Volver a Productos</Link></div>

                <div className={styles.productInfo}>
                    <div className={styles.productImageContainer}>
                        <img src={product.image} alt={product.title} className={styles.productImage}/>
                    </div>
                    <div className={styles.productInfoContainer}>
                        <div className={styles.productTextDetail}>
                            <h2 className={styles.productTitleDetail}>{product.title}</h2>
                            <p className={styles.productPriceDetail}>Precio: ${product.price}</p>
                            <p className={styles.productDescriptionDetail}>{product.description}</p>
                        </div>
                               
                        <div className={styles.actionsbottomDetail}>
                             <div className={styles.counterDetail}>
                                <button onClick={decrement} className={styles.buttondecrementDetail}>-</button>
                                <span className={styles.counterDetailInput}>{count}</span>
                                <button onClick={increment} className={styles.buttonincrementDetail}>+</button>
                            </div>

                            <button className={styles.addToCartButton} onClick={manageAddToCart}>Agregar al Carrito</button>
                        </div>



                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetail;