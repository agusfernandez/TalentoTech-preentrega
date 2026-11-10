import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import Spinner from './Spinner';
import styles from './styles/Products.module.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const productsRef = await getDocs(collection(db, 'products'));
                const resp = await getDocs(productsRef);
                console.log('respuestas de firestore:', resp);

                const listProducts = resp.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }));

                setProducts(listProducts);
            } catch (error) {
                console.error('Error fetching products from Firestore:', error);
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
                        <div key={product.id} className={styles.productCard}>
                            <div className={styles.imageContainer}>
                                <img src={product.image} alt={product.title} className={styles.productImage} />
                            </div>
                            <h3>{product.title}</h3>
                            <p>Precio: ${product.price}</p>
                            <p>{product.description}</p>
                            <p>Stock: {product.stock}</p>
                            <p>Categoría: {product.category}</p>
                        </div>
                    ))
                )}
            </div>
        
        </>
    )

}

export default Products;