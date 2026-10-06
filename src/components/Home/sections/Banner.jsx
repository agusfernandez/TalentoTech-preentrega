import styles from "../styles/Banner.module.css";

const Banner = () => {
    return (
        <>
            <section className={styles.homeBannerSection}>
                <div className={styles.homeBanner}>
                    <div className={styles.homeBannerContent}>
                        <h1 className={styles.homeBannerTitle}>El silencio visual de la forma y la materia.</h1>
                        <p className={styles.homeBannerDescription}>
                            Descubre nuestra colección de productos de alta calidad y diseño escandinavo.
                        </p>
                        <a  className={styles.homeBannerButton}>Explorar Productos</a>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Banner;