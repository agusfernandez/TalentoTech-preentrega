import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import Spinner from '../Products/Spinner';
import styles from './styles/categories.module.css';
import ItemList from '../Products/ItemList/ItemList';


const Categories = () => {
    const { idCategory } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);

                const querySnapshot = await getDocs(collection(db, 'products'));
                const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                const filteredProducts = docs.filter( product => product.category?.toLowerCase() === idCategory.toLowerCase());
                setProducts(filteredProducts);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if(idCategory) {
            fetchProducts();
        }

    }, [idCategory]);

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (

        <>
            <div className={styles.productsList}>
                <h3 className={styles.category}>{idCategory}</h3>
                {
                    loading ? (
                        <Spinner />
                    ) : (
                        products.length === 0 ? (
                            <p>No hay productos habilitados en esta categoría.</p>
                        ) : (
                           <ItemList products={products} />
                        )
                    )
                }


            </div>
        
        </>
    )

}

export default Categories;