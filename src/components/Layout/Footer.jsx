import estilos from "./styles/Footer.module.css";

const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <footer className={estilos.footer}>
        <ul className={estilos.linksSection}>
            <li className={estilos.link}><a href="/terminos">Términos y Condiciones</a></li>
            <li className={estilos.link}><a href="/privacidad">Política de Privacidad</a></li>
        </ul>
        <p className={estilos.copyright}>&copy; {currentYear} My Company. All rights reserved.</p>
    </footer>
  );
};

export default Footer;  