import styles from '../styles/InformationSection.module.css';

const InformationSection = () => {

    return (
        <>
            <section className={styles.sectionInfo}>
                <h3 className={styles.sectionTitle}>Nuesta Responsabilidad</h3>
                <div className={styles.sectionInfoCard}>
                    <div className={styles.sectionsCard}>
                            <div>
                                <div className={styles.iconCardOne}></div>
                                <span>01 / TRAZABILIDAD</span>
                                <h4>Maderas Certificadas FSC</h4>
                                <p>Troncos seleccionados de robledales sostenibles europeos. Cada veta cuenta la historia pausada de un crecimiento de más de ochenta inviernos.</p>
                            </div>
                    </div>
    
                        <div className={styles.sectionsCard}>
                            <div>
                                <div className={styles.iconCardTwo}></div>
                                 <span>02 / MAESTRÍA</span>
                                <h4>Ebanistería Lenta y Manual</h4>
                                <p>Ensambles japoneses tradicionales de espiga oculta sin tornillería sintética visible. Aceites naturales aplicados con paño de algodón puro.</p>
                            </div>
                        </div>
               
                        <div className={styles.sectionsCard}>
                             <div>
                                <div className={styles.iconCardThree}></div>
                                 <span>03 / REVERENCIA</span>
                                <h4>Entrega con Montaje Cuidadoso</h4>
                                <p>Servicio propio de guante blanco.Calibramos y nivelamos cada objeto en su estancia final con fundas protectoras reutilizables de cáñamo.</p>
                             </div>
                        </div>
                   
                </div>
            </section>
        
        </>
    )
}

export default InformationSection;