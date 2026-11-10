import {useState, useEffect} from "react";
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { useCart } from "../../../context/CartContext";
import styles from "./styles/ProductDetail.module.css";
import { MoveLeft } from 'lucide-react';
import Spinner from "../Spinner";



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
            description: product.description,
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
        const getProduct = async () => {
            try {
                // Si el ID es numérico, viene del JSON local
                const isNumericId = !isNaN(id);

                if (isNumericId) {
                    console.log('ID numérico detectado, buscando en JSON local...');
                    const res = await fetch('/data/products.json');
                    if (!res.ok) throw new Error('No se pudo cargar el archivo local');
                    const data = await res.json();
                    const foundProduct = data.find((item) => String(item.id) === String(id));
                    if (!foundProduct) throw new Error('Producto no encontrado en JSON local');
                    console.log('Producto encontrado en JSON:', foundProduct);
                    setProduct(foundProduct);
                } else {
                    console.log('ID de Firestore detectado, buscando en Firebase...');
                    const docRef = doc(db, 'products', id);
                    const docSnap = await getDoc(docRef);
                    if (!docSnap.exists()) throw new Error('Producto no encontrado en Firestore');
                    const foundProduct = { id: docSnap.id, ...docSnap.data() };
                    console.log('Producto encontrado en Firestore:', foundProduct);
                    setProduct(foundProduct);
                }
            } catch (err) {
                console.error('❌ Error al buscar el producto:', err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getProduct();
    }, [id]);

    if (loading) return <Spinner />;
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