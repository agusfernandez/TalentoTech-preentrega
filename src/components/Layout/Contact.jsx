import Form from './FormContact'
import styles from './styles/Contact.module.css';
import {MapPin, Clock, Phone, Mail} from  'lucide-react';

const Contact = () => {
    return(
        <>
            <section className={styles.contactSection}>
                <div className={styles.contactEmployees}>
                    <div className={`${styles.sectionTitle}, ${styles.sectionSpace}`}><span>Maestria Humana</span><h3>El equipo detrás de cada pieza</h3></div>
                    <div className={styles.employeesCards}>
                        <div className={styles.employeeCard}>
                            <div className={styles.employeeCardInfo}>
                                <div className={`${styles.employeeImage} ${styles.employeeImageOne}`}></div>
                                <div className={styles.employeeData}>
                                    <h4>Mateo Valls</h4>
                                    <span>Maestro Ebanista & Co-Fundador</span>
                                </div>
                            </div>
                        
                            <div className={styles.employeeDescription}>
                                <p>Custodio de las uniones de cola de milano y el pulido al aceite orgánico en piezas de nogal y roble macizo.</p>
                            </div>
                        </div>

                        <div className={styles.employeeCard}>
                            <div className={styles.employeeCardInfo}>
                                <div className={`${styles.employeeImage} ${styles.employeeImageTwo}`}></div>
                                <div className={styles.employeeData}>
                                    <h4>Sofia Lindqvist</h4>
                                    <span>Directora Creativa & Interiorismo</span>
                                </div>
                            </div>
                        
                            <div className={styles.employeeDescription}>
                                <p>Custodio de las uniones de cola de milano y el pulido al aceite orgánico en piezas de nogal y roble macizo.</p>
                            </div>
                        </div>

                        <div className={styles.employeeCard}>
                            <div className={styles.employeeCardInfo}>
                               <div className={`${styles.employeeImage} ${styles.employeeImageThree}`}></div>
                                <div className={styles.employeeData}>
                                    <h4>Clara Menéndez</h4>
                                    <span>Sostenibilidad & Materiales Nobles</span>
                                </div>
                            </div>
                        
                            <div className={styles.employeeDescription}>
                                <p>Custodio de las uniones de cola de milano y el pulido al aceite orgánico en piezas de nogal y roble macizo.</p>
                            </div>
                        </div>
                     
                    </div>
                </div>
                
                <div className={styles.contactCards}>
                    <div className={`${styles.formSection}, ${styles.cards}`}>
                        <div className={styles.sectionTitle}>
                            <span>Atelier y Asesoria</span>
                            <h3>Conversemos sobre tu espacio</h3>
                            <p>Tanto si buscas una pieza única para tu hogar como si desarrollas un proyecto de interiorismo completo, nuestro equipo de diseñadores y artesanos está a tu disposición.</p>
                        </div>
                        <Form/>
                        
                    </div>

                    <div className={styles.cardsContact}>
                        <div className={styles.contactBox}>
                            <span className={styles.legend}>
                                Sede Principal
                            </span>
                            <h3>Showroom Buenos Aires</h3>
                            <div className={styles.contactInformation}>
                                <div className={styles.detailContact}><MapPin strokeWidth={1} size={18} color={"#715A42"} /><span>Av Cabildo 2443</span></div>
                                <div className={styles.detailContact}><Clock strokeWidth={1} size={18} color={"#715A42"}/>
                                    <div className={styles.detailHour}>
                                        <span>Martes, Miércoles y Jueves: 8:30hs-19:00hs</span>
                                    </div>
                                </div>
                                <div className={styles.detailContactRow}>
                                   <div className={styles.detailContact}><Phone strokeWidth={1} size={18} color={"#715A42"}/><span>+542323299392</span></div>
                                   <div className={styles.detailContact}><Mail strokeWidth={1} size={18} color={"#715A42"} /><span>nomada@example.com</span></div>
                                </div>
                            </div>
                        </div>
                         <div className={styles.contactBox}>
                            <span className={styles.legend}>
                                Sede Principal
                            </span>
                            <h3>Showroom San Vicente</h3>
                            <div className={styles.contactInformation}>
                                <div className={styles.detailContact}><MapPin strokeWidth={1} size={18} color={"#715A42"} /><span>Av Cabildo 2443</span></div>
                                <div className={styles.detailContact}><Clock strokeWidth={1} size={18} color={"#715A42"}/>
                                    <div className={styles.detailHour}>
                                        <span>Martes, Miércoles y Jueves: 8:30hs-19:00hs</span>
                                    </div>
                                </div>
                                <div className={styles.detailContactRow}>
                                   <div className={styles.detailContact}><Phone strokeWidth={1} size={18} color={"#715A42"}/><span>+542323299392</span></div>
                                   <div className={styles.detailContact}><Mail strokeWidth={1} size={18} color={"#715A42"} /><span>nomada@example.com</span></div>
                                </div>
                            </div>
                        </div>

                    </div>
            


                </div>


            </section>
        
        </>
    )
}

export default Contact;