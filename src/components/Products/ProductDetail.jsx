import {useState, useEffect} from "react";
import { useParams, Link } from 'react-router-dom';
import styles from "./styles/ProductDetail.module.css";


const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [count, setCount] = useState(1);

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
                <Link to="/products" className={styles.backLink}>Volver a Productos</Link>

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

                            <button className={styles.addToCartButton}>Agregar al Carrito</button>
                        </div>



                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetail;