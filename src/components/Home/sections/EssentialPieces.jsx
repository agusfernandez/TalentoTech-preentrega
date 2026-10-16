import {useState, useEffect} from 'react';
import styles from '../styles/EssentialPieces.module.css';
import { Link } from "react-router-dom";

const EssentialPieces = () => {
    const [productsEssential, setProducsEssential] = useState([]);
    const [loading, setLoading] = useState (true);
    const [error, setError] = useState (null);
    const  API= '/data/products.json'
    
   useEffect(() => {
   fetch(API)
        .then(response => {
            if (!response.ok) {
                throw new Error('Los productos no se pudieron cargar. Error 404');
            }
            return response.json();
        })
        .then(data => setProducsEssential(data.slice(0,3)))
        .catch(error => {
            console.error('Error fetching products:', error)
            setError(error.message);
        })
        .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Cargando Productos</p>
    if (error) return <p>Error</p>;

    return (
        <>
            <section className={styles.essentialSection}>
                <div className={`${styles.essentialSectionTitle} ${styles.sectionTitle}`}>
                    <h2 className={styles.essentialTitle}>Piezas Esenciales</h2>
                    <div><button><Link to="/products">Ver más Productos</Link></button></div>
                </div>
                <div className={styles.essentialDataSection}>
                    {productsEssential.map(product => (
                        <div key={product.id} className={styles.essentialCard}>
                            <Link to={`/product/${product.id}`}>  
                                <div className={styles.essentialImage}><img src={product.image}></img></div>
                                <div className={styles.essentialDetails}>
                                    <h3>{product.title}</h3>
                                    <span>${product.price}</span>
                                </div>
                            </Link>

                        </div>
                    ))}
                </div>
            </section>
      
            
        </>
    )
}

export default EssentialPieces;