import estilos from "./styles/Spinner.module.css";

const Spinner = () => {
    return (
        <div className={estilos.spinnerOverlay} role="status" aria-label="Cargando">
            <div className={estilos.spinner}></div>
            <div className={estilos.spinnerDot}></div>
        </div>
    );
};

export default Spinner;