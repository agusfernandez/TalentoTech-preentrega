import styles from "./styles/Footer.module.css";

const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
        <ul className={styles.linksSection}>
            <li className={styles.link}><a href="/terminos">Términos y Condiciones</a></li>
            <li className={styles.link}><a href="/privacidad">Política de Privacidad</a></li>
        </ul>
        <p className={styles.copyright}>&copy; {currentYear} Nórdico. All rights reserved.</p>
    </footer>
  );
};

export default Footer;  