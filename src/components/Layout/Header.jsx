import Navbar from "./Navbar";
import estilos from "./styles/Header.module.css";

const Header = () => {
    return (
        <>
            <header className={estilos.header}>
                <Navbar/>
            </header>
        
        </>
    );
};

export default Header;