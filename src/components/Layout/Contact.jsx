import Form from './FormContact';
import styles from './styles/Contact.module.css';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';

// Verificá la cantidad de ../ según la carpeta donde esté Contact.jsx
import avatarOne from '../../assets/Avatar/Mateo_Valls.png';
import avatarTwo from '../../assets/Avatar/Sofia_Lindqvist.png';
import avatarThree from '../../assets/Avatar/Clara_Menendez.png';

const team = [
  {
    id: 1,
    name: 'Mateo Valls',
    role: 'Maestro Ebanista & Co-Fundador',
    description:
      'Custodio de las uniones de cola de milano y el pulido al aceite orgánico en piezas de nogal y roble macizo.',
    avatar: avatarOne,
  },
  {
    id: 2,
    name: 'Sofia Lindqvist',
    role: 'Directora Creativa & Interiorismo',
    description:
      'Especialista en arquitectura interior cálida, proporciones funcionales y selección de textiles naturales.',
    avatar: avatarTwo,
  },
  {
    id: 3,
    name: 'Clara Menéndez',
    role: 'Sostenibilidad & Materiales Nobles',
    description:
      'Responsable de trazabilidad de maderas certificadas y procesos artesanales de bajo impacto ambiental.',
    avatar: avatarThree,
  },
];

const Contact = () => {
  return (
    <section className={styles.contactSection}>
      <div className={styles.contactEmployees}>
        <div className={`${styles.sectionTitle} ${styles.sectionSpace}`}>
          <span>Maestría Humana</span>
          <h3>El equipo detrás de cada pieza</h3>
        </div>

        <div className={styles.employeesCards}>
          {team.map((member) => (
            <div key={member.id} className={styles.employeeCard}>
              <div className={styles.employeeCardInfo}>
                <div className={styles.employeeImage}>
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className={styles.avatarImg}
                  />
                </div>
                <div className={styles.employeeData}>
                  <h4>{member.name}</h4>
                  <span>{member.role}</span>
                </div>
              </div>

              <div className={styles.employeeDescription}>
                <p>{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.contactCards}>
        <div className={`${styles.formSection} ${styles.cards}`}>
          <div className={styles.sectionTitle}>
            <span>Atelier y Asesoría</span>
            <h3>Conversemos sobre tu espacio</h3>
            <p>
              Tanto si buscas una pieza única para tu hogar como si desarrollas
              un proyecto de interiorismo completo, nuestro equipo de
              diseñadores y artesanos está a tu disposición.
            </p>
          </div>
          <Form />
        </div>

        <div className={styles.cardsContact}>
          <div className={styles.contactBox}>
            <span className={styles.legend}>Sede Principal</span>
            <h3>Showroom Buenos Aires</h3>
            <div className={styles.contactInformation}>
              <div className={styles.detailContact}>
                <MapPin strokeWidth={1} size={18} color="#715A42" />
                <span>Av Cabildo 2443</span>
              </div>
              <div className={styles.detailContact}>
                <Clock strokeWidth={1} size={18} color="#715A42" />
                <div className={styles.detailHour}>
                  <span>Martes, Miércoles y Jueves: 8:30hs-19:00hs</span>
                </div>
              </div>
              <div className={styles.detailContactRow}>
                <div className={styles.detailContact}>
                  <Phone strokeWidth={1} size={18} color="#715A42" />
                  <span>+542323299392</span>
                </div>
                <div className={styles.detailContact}>
                  <Mail strokeWidth={1} size={18} color="#715A42" />
                  <span>nomada@example.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.contactBox}>
            <span className={styles.legend}>Taller & Showroom</span>
            <h3>Showroom San Vicente</h3>
            <div className={styles.contactInformation}>
              <div className={styles.detailContact}>
                <MapPin strokeWidth={1} size={18} color="#715A42" />
                <span>Av Cabildo 2443</span>
              </div>
              <div className={styles.detailContact}>
                <Clock strokeWidth={1} size={18} color="#715A42" />
                <div className={styles.detailHour}>
                  <span>Martes, Miércoles y Jueves: 8:30hs-19:00hs</span>
                </div>
              </div>
              <div className={styles.detailContactRow}>
                <div className={styles.detailContact}>
                  <Phone strokeWidth={1} size={18} color="#715A42" />
                  <span>+542323299392</span>
                </div>
                <div className={styles.detailContact}>
                  <Mail strokeWidth={1} size={18} color="#715A42" />
                  <span>nomada@example.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;