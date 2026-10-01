import styles from "./styles/Navbar.module.css";
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLogo}>
        <Link to="/" className={styles.logo}>Nórdico</Link>
      </div>
      <ul className={styles.navbarLinks}>
        <li><Link to="/" className={styles.link}>Inicio</Link></li>
        <li><Link to="/products" className={styles.link}>Productos</Link></li>
        <li><Link to="/contact" className={styles.link}>Contacto</Link></li>    
      </ul>
    </nav>
  );
};

export default Navbar;