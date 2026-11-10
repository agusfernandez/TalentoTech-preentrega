import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import Spinner from '../Spinner';
import styles from './styles/cupon.module.css';

const Cupon = () => {

    const [cupons, setCupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(  () => {
        const getCupons = async () => {
            try {
                console.log('Iniciando conexión con Firestore para cupones...');
                console.log('Firebase config - projectId:', import.meta.env.VITE_FIREBASE_PROJECTID);

                setLoading(true);

                const querySnapShot = await getDocs(collection(db, 'cupons'));

                const listCupons = querySnapShot.docs.map((docSnap) => ({
                    id: docSnap.id,
                    ...docSnap.data()
                }));

                console.log('Cupones mapeados:', listCupons);
                setCupons(listCupons);

            } catch (error) {
                console.error('❌ Error al traer cupones de Firestore:', error);
                console.error('Código de error:', error.code);
                console.error('Mensaje:', error.message);
                setError('Error al cargar los cupones. Por favor, inténtalo de nuevo más tarde.');
            } finally {
                setLoading(false);
            }
        };

        getCupons();
    }, []);

    if (loading) {
        return <Spinner />;
    }   

    if (error)  {
        return <p>{error}</p>;
    }


    return (
        <>
            <div className={styles.cuponsList}>
                <div>
                    { !loading  && !error && cupons.length==0 && (
                            <span>No hay cupones creados en la base de datos</span>
                    )} 
               </div>
               <div>
                    { !loading && !error && cupons.length>0 && (
                        cupons.map(cupon => (
                            <div key={cupon.id} className={styles.cardContainer}>
                                <div className={styles.infoCupon}>
                                    <h3 className={styles.cuponTitle}>{cupon.title}</h3>
                                    <p className={styles.cuponDescription}>{cupon.description}</p>
                                    <p className={styles.cuponDiscount}>Descuento: {cupon.discount}%</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    )


 }

 export default Cupon;