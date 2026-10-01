import {useState, useEffect} from "react";
import { useParams, Link } from 'react-router-dom';
import styles from "./styles/ProductDetail.module.css";


const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  useEffect(() => {

    fetch(`/public/data/products.json/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('No se encontró el producto');
        return res.json();
      })
      .then((datos) => setProduct(datos))
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
                    <div className={styles.productText}>
                        <h1 className={styles.productTitle}>{product.title}</h1>
                        <p className={styles.productPrice}>Precio: ${product.price}</p>
                        <p className={styles.productDescription}>{product.description}</p>
                    </div>
                    <button className={styles.addToCartButton}>Agregar al Carrito</button>
                </div>
            </div>
        </>
    )
}

export default ProductDetail;