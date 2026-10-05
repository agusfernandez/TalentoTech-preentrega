import styles from "./styles/Footer.module.css";

const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
        <div className={styles.newsletterSection}>
          <span className={styles.newslettersmall}>CORRESPONDENCIA ESCRITA</span>
          <h3>El boletín de calma y diseño</h3>
          <p>Reflexiones quincenales sobre arquitectura de interiores, ebanistería noble y lanzamientos de edición limitada.</p>
          <div className={styles.inputSection}>
            <input type='text'  placeholder="Ingrese su email" name="newsletter"/>
            <button>Subscribirse</button>
          </div>
        </div>
        <div className={styles.linksSection}>
          <ul className={styles.linksContent}>
              <li className={styles.link}><a href="/terminos">Términos y Condiciones</a></li>
              <li className={styles.link}><a href="/privacidad">Política de Privacidad</a></li>
          </ul>
          <p className={styles.copyright}>&copy; {currentYear} Nórdico. All rights reserved.</p>
        </div>
    </footer>
  );
};

export default Footer;  