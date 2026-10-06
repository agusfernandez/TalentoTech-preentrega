import {useState, useEffect} from 'react';
import styles from '../styles/EssentialPieces.module.css';


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
                    <div><button>Ver mas Productos</button></div>
                </div>
                <div className={styles.essentialDataSection}>
                    {productsEssential.map(product => (
                        <div key={product.id} className={styles.essentialCard}>
                            <div className={styles.essentialImage}><img src={product.image}></img></div>
                            <div className={styles.essentialDetails}>
                                <h3>{product.title}</h3>
                                <span>${product.price}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
      
            
        </>
    )
}

export default EssentialPieces;