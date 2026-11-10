import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import Spinner from './Spinner';
import styles from './styles/Products.module.css';
import {Link} from "react-router-dom";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProducts = async () => {
            try {
                console.log('Iniciando conexión con Firestore...');
                console.log('Firebase config - projectId:', import.meta.env.VITE_FIREBASE_PROJECTID);

                const productsRef = collection(db, 'products');

                const resp = await getDocs(productsRef);

                const listProducts = resp.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }));

                console.log('Productos mapeados:', listProducts);
                setProducts(listProducts);
            } catch (error) {
                console.error('❌ Error al traer productos de Firestore:', error);
                console.error('Código de error:', error.code);
                console.error('Mensaje:', error.message);
            } finally {
                setLoading(false);
            }
        };

        getProducts();


    }, []);

    if (loading) {
        return <Spinner />;
    }

    return (   
        <>
            <div className={styles.productsList}>


                {products.length === 0 ? (
                    <p>No hay productos habilitados.</p>
                ) : (
                    products.map(product => (
                        <div key={product.id} className={styles.cardContainer}>
                            <div className={styles.imageContainer}>
                                <img src={product.image} alt={product.title} className={styles.productImage} />
                                <span className={styles.categorylegend}>{product.category}</span>

                            </div>
                            <div className={styles.infoProduct}>
                                <Link to={`/product/${product.id}`} className={styles.productLink}>
                                    <h3 className={styles.productTitle}>{product.title}</h3>
                                </Link>
                                <p className={styles.price}>Precio: ${product.price}</p>
                                <p className={styles.description}>{product.description}</p>
                                <p className={styles.stock}>Stock: {product.stock}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        
        </>
    )

}

export default Products;