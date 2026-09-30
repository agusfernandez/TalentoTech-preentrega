import estilo from "./styles/Navbar.module.css";


const Nabvar = () => {
  return (
    <nav className={estilo.navbar}>
      <div className={estilo.navbarLogo}>
        <h1>Nórdico</h1>
      </div>
      <ul className={estilo.navbarLinks}>
        <li><a href="/">Inicio</a></li>
        <li><a href="/productos">Productos</a></li>
        <li><a href="/contacto">Contacto</a></li>
        <li><a href="/carrito">Carrito</a></li>
      </ul>
    </nav>
  );
};

export default Nabvar;