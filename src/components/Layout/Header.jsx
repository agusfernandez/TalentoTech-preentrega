import Navbar from "./Navbar";
import styles from "./styles/Header.module.css";

const Header = () => {
    return (
        <>
            <header className={styles.header}>
                <Navbar/>
            </header>
        
        </>
    );
};

export default Header;