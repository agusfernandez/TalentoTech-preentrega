import { useState, useEffect, useRef } from 'react';
import styles from "./styles/Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from "../../context/AuthContext";


const Navbar = () => {
  const { user, logout } = useAuth();
  const { itemsInCart } = useCart();
  const totalItems = itemsInCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef(null);

  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  const toggleAccount = () => setAccountOpen(prev => !prev);
  const closeAccount = () => setAccountOpen(false);

  const handleCategoryNav = (path) => {
    closeMenu();
    navigate(path);
  };

  const handleLogout = () =>{
    closeAccount();
    logout();
  }

  // Cerrar con la tecla Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e) => e.key === 'Escape' && closeMenu();
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    if(!accountOpen) return;
    const onKeyDown = (e) => e.key === "Escape" && closeAccount();
    const onClickOutside = (e) => {
      if(accountRef.current && !accountRef.current.contains(e.target)) closeAccount()

    }

    document.addEventListener('keydown',onKeyDown),
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('keydown',onKeyDown),
      document.removeEventListener('mousedown', onClickOutside);
    }


  }), [accountOpen]

   const linkClass = ({ isActive }) =>
    `${styles.link} ${isActive ? styles.active : ''}`;

  return (
    <>
      <nav className={styles.navbar}>
        {/* Logo */}
        <div className={styles.navbarLogo}>
          <Link to="/" className={styles.logo}>Nórdico</Link>
        </div>

        <div className={styles.navbarColumnRight}>
          {/* Links principales */}
          <div className={styles.navbarLinks}>
            <li><Link to="/" end className={linkClass} onClick={closeMenu}>Inicio</Link></li>
            <div className={styles.userLink}>
                  {/* Cuenta y acciones */}
                <ul className={styles.navbarActions}>
                  {user ? (
                    <li className={styles.account} ref={accountRef}>
                      <button
                        type="button"
                        className={styles.accountTrigger}
                        onClick={toggleAccount}
                        aria-haspopup="menu"
                        aria-expanded={accountOpen}
                        aria-controls="menu-cuenta"
                      >
                        <User strokeWidth={1.2} size={22} />
                        <span className={styles.greeting}>Hola, {user.email}</span>
                        <ChevronDown
                          size={16}
                          strokeWidth={1.5}
                          className={`${styles.chevron} ${accountOpen ? styles.chevronOpen : ''}`}
                        />
                      </button>

                      {accountOpen && (
                        <div id="menu-cuenta" className={styles.accountMenu} role="menu">
                          {user.rol === "admin" && (
                            <Link
                              to="/panel"
                              role="menuitem"
                              className={styles.accountItem}
                              onClick={closeAccount}
                            >
                              Panel
                            </Link>
                          )}
                          <button
                            type="button"
                            role="menuitem"
                            className={`${styles.accountItem} ${styles.accountItemDanger}`}
                            onClick={handleLogout}
                          >
                            Cerrar sesión
                          </button>
                        </div>
                      )}
                    </li>
                  ) : (
                    <li>
                      <Link to="/login" aria-label="Iniciar sesión">
                        <User strokeWidth={1.2} />
                      </Link>
                    </li>
                  )}
                </ul>
            </div>        


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
          </div>

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
              <li>
                <a onClick={() => handleCategoryNav('/iluminación')} className={styles.drawerLink}>
                  Iluminación
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Overlay: queda afuera del nav */}
      {menuOpen && <div className={styles.overlay} onClick={closeMenu} />}
    </>
  );
};

export default Navbar;