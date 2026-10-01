import Header from './Header';
import Footer from './Footer';
import { Outlet } from "react-router-dom";
import styles from "./styles/Layout.module.css";



const Layout = () => {
  return (
    <>
        <div className={styles.mainWrapper}>
          <Header />
            <main className={styles.content}>
              <Outlet />
            </main>
          <Footer />
      </div>
    </>
  );
};

export default Layout;