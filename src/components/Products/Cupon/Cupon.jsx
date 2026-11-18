import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import Spinner from '../Spinner';
import styles from './styles/cupon.module.css';
import { Tag } from 'lucide-react';

const Cupon = () => {

    const [cupons, setCupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [copiedId, setCopiedId] = useState(null);

    useEffect(() => {
        const getCupons = async () => {
            try {
                setLoading(true);
                const querySnapShot = await getDocs(collection(db, 'cupons'));
                const listCupons = querySnapShot.docs.map((docSnap) => ({
                    id: docSnap.id,
                    ...docSnap.data()
                }));
                setCupons(listCupons);
            } catch (error) {
                console.error('❌ Error al traer cupones de Firestore:', error);
                setError('Error al cargar los cupones. Por favor, intentalo de nuevo.');
            } finally {
                setLoading(false);
            }
        };

        getCupons();
    }, []);

    const handleCopy = (cupon) => {
        navigator.clipboard.writeText(cupon.code).then(() => {
            setCopiedId(cupon.id);
            setTimeout(() => setCopiedId(null), 2000);
        });
    };

    if (loading) return <Spinner />;
    if (error)   return <p className={styles.errorMsg}>{error}</p>;

    return (
        <div className={styles.cuponsSection}>
            <div className={styles.sectionHeader}>
                <Tag size={18} strokeWidth={1.5} />
                <span>Cupones de descuento</span>
            </div>

            {cupons.length === 0 ? (
                <p className={styles.emptyMsg}>No hay cupones creados en la base de datos.</p>
            ) : (
                <div className={styles.cuponsList}>
                    {cupons.map(cupon => (
                        <div key={cupon.id} className={styles.cuponCard}>

                            {/* Lado izquierdo: descuento */}
                            <div className={styles.discountSide}>
                                <span className={styles.discountValue}>{cupon.discountValue}%</span>
                                <span className={styles.discountLabel}>OFF</span>
                            </div>

                            {/* Separador dentado */}
                            <div className={styles.divider} />

                            {/* Lado derecho: info */}
                            <div className={styles.infoSide}>
                                <h3 className={styles.cuponTitle}>{cupon.title}</h3>
                                {cupon.description && (
                                    <p className={styles.cuponDescription}>{cupon.description}</p>
                                )}
                                <div className={styles.codeRow}>
                                    <code className={styles.cuponCode}>{cupon.code}</code>
                                    <button
                                        className={`${styles.copyBtn} ${copiedId === cupon.id ? styles.copied : ''}`}
                                        onClick={() => handleCopy(cupon)}
                                    >
                                        {copiedId === cupon.id ? '✓ Copiado' : 'Copiar'}
                                    </button>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Cupon;
