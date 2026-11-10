import styles from "./styles/Navbar.module.css";
import { Link } from "react-router-dom";
import { ShoppingCart } from 'lucide-react';
import { useCart} from '../../context/CartContext';

const Navbar = () => {
  const {itemsInCart} = useCart();
  const totalItems = itemsInCart();
  console.log("Valor de itemsInCart en Navbar:", itemsInCart);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLogo}>
        <Link to="/" className={styles.logo}>Nórdico</Link>
      </div>
      <ul className={styles.navbarLinks}>
        <li><Link to="/" className={styles.link}>Inicio</Link></li>
        <li><Link to="/new" className={styles.link}>Novedades</Link></li>
        <li><Link to="/products" className={styles.link}>Productos</Link></li>
        <li className={styles.cartLink}><Link to="/cart"><ShoppingCart strokeWidth={1} />{totalItems > 0 && <span className={styles.shoppingCount}>{totalItems}</span>}</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;