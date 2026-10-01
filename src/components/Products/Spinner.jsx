import estilos from "./styles/Spinner.module.css";

const Spinner = () => {
    return (
        <div className={estilos.spinner}>
            <div className={estilos.doubleBounce1}></div>
            <div className={estilos.doubleBounce2}></div>
        </div>
    );
};

export default Spinner;