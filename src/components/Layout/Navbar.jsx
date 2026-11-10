import { useState, useEffect } from 'react';
import styles from "./styles/Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const { itemsInCart } = useCart();
  const totalItems = itemsInCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  const handleCategoryNav = (path) => {
    closeMenu();
    navigate(path);
  };

  // Cerrar con la tecla Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e) => e.key === 'Escape' && closeMenu();
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <>
      <nav className={styles.navbar}>
        {/* Logo */}
        <div className={styles.navbarLogo}>
          <Link to="/" className={styles.logo}>Nórdico</Link>
        </div>

        {/* Links principales */}
        <ul className={styles.navbarLinks}>
          <li><Link to="/" className={styles.link} onClick={closeMenu}>Inicio</Link></li>
          <li><Link to="/contact" className={styles.link} onClick={closeMenu}>Contacto</Link></li>

          {/* Botón hamburguesa */}
          <li>
            <button
              className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
              onClick={toggleMenu}
              aria-label="Abrir menú de categorías"
              aria-expanded={menuOpen}
              aria-controls="menu-categorias"
            >
              <span className={styles.bar}></span>
              <span className={styles.bar}></span>
              <span className={styles.bar}></span>
            </button>
          </li>

          {/* Carrito */}
          <li className={styles.cartLink}>
            <Link to="/cart" onClick={closeMenu}>
              <ShoppingCart strokeWidth={1} />
              {totalItems > 0 && <span className={styles.shoppingCount}>{totalItems}</span>}
            </Link>
          </li>
        </ul>

        {/* Drawer: AHORA DENTRO DEL NAV */}
        <div
          id="menu-categorias"
          className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`}
        >
          <div className={styles.drawerHeader}>
            <span className={styles.drawerTitle}>Categorías</span>
            <button className={styles.closeBtn} onClick={closeMenu} aria-label="Cerrar menú">✕</button>
          </div>
          <ul className={styles.drawerLinks}>
            <li>
              <a onClick={() => handleCategoryNav('/new')} className={styles.drawerLink}>
                Novedades
              </a>
            </li>
            <li>
              <a onClick={() => handleCategoryNav('/products')} className={styles.drawerLink}>
                Productos
              </a>
            </li>
            <li>
              <a onClick={() => handleCategoryNav('/decoración')} className={styles.drawerLink}>
                Decoración
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Overlay: queda afuera del nav */}
      {menuOpen && <div className={styles.overlay} onClick={closeMenu} />}
    </>
  );
};

export default Navbar;