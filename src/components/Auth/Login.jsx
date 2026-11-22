import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Modal from '../Panel/Modal';
import styles from './styles/Login.module.css';


const Login = () => {
    const [email , setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {login} = useAuth();
    const [modal, setModal] = useState({isOpen:false, type:"success", title:"", message:"", onClose:null});


    const showModal = (type, title, message, onClose = null) =>
    setModal({ isOpen: true, type, title, message, onClose });

    const closeModal = () => {
        const callback = modal.onClose;
        setModal(prev => ({ ...prev, isOpen: false, onClose: null }));
        if (callback) callback();
    };

    const manageLogin = async (event) =>{
        event.preventDefault();
        try {
            await login(email, password);
             showModal(
                'success',
                '¡Bienvenido!',
                'Iniciaste sesión con éxito.',
                () => navigate('/')
            );
        } catch(error) {
            console.error("Error en el login", error.code, error.message);
             showModal(
                'error',
                'No pudimos iniciar sesión',
                'El correo o la contraseña son incorrectos. Intentá de nuevo.'
            );

        }
    }   

    return (
        <>  
            <section className={`${styles.formLogin} ${styles.mainContainer}`}>
                <h3>Por favor, inicie sesión</h3>
                <form onSubmit={manageLogin} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label>Ingrese su email</label>
                        <input type="email" placeholder="ingrese su correo electrónico" value={email} onChange={(event) => setEmail(event.target.value)}></input>
                        </div>

                    <div className={styles.formGroup}>
                        <label>Ingrese su contraseña</label>
                        <input type="password" placeholder="ingrese su contraseña" value={password} onChange={(event) => setPassword(event.target.value)}></input>

                    </div>
                    <button type="submit" className={styles.submitButton}>Enviar</button>
                    <span className={styles.legendLink}>¿No esta registrado? <Link to="/register">Registrese</Link></span>
                </form>
            </section>
            <Modal 
                isOpen={modal.isOpen}
                type={modal.type}
                title={modal.title}
                message={modal.message}
                onClose={closeModal}
            
            />
        
        </>
    )

}

export default Login;