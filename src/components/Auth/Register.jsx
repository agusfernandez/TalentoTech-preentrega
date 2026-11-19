import { useState } from 'react';
import { db } from '../../firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Modal from '../Panel/Modal';
import styles from './styles/Register.module.css';



const Register = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const {signup} = useAuth();
    const [modal, setModal] = useState({isOpen:false, type:"success", title:"", message:"", onClose:null});

    const showModal = (type, title, message, onClose = null) =>
    setModal({ isOpen: true, type, title, message, onClose });

    const closeModal = () => {
        const callback = modal.onClose;
        setModal(prev => ({ ...prev, isOpen: false, onClose: null }));
        if (callback) callback();
    };


    const manageRegister = async (event) => {

        event.preventDefault();
        setError(null);

        try {
            const credentialUser = await signup(email, password);
            const user = credentialUser.user;

            await setDoc(doc(db, "users", user.uid), {
                name: name,
                surname: surname,
                rol: "user",
                email: email
            });

            showModal(
                'success',
                '¡Bienvenido!',
                'Te has registrado con éxito.',
                () => navigate('/')
            );

        } catch (error) {

            console.error("Error en el registro", error.code, error.message);

            const message = error.code === 'auth/email-already-in-use'
                ? 'Este correo electrónico ya está registrado. Iniciá sesión o usá otro email.'
                : 'Ocurrió un error al registrar el usuario. Verificá los datos e intentá de nuevo.';

            showModal('error', 'No pudimos registrarte', message);

        }

    }


    return (

        <>
            <form onSubmit={manageRegister}>
                <div className={styles.formGroup}>
                    <label>Nombre</label>
                    <input type="text" placeholder="Ingrese su nombre" value={name} onChange={(event)=> setName(event.target.value)} required></input>
                </div>
                <div className={styles.formGroup}>
                    <label>Apellido</label>
                    <input type="text" placeholder="Ingrese su apellido" value={surname} onChange={(event)=> setSurname(event.target.value)} required></input>
                </div>
                <div className={styles.formGroup}>
                    <label>Email</label>
                    <input type="email" placeholder="Ingrese su email" value={email} onChange={(event)=> setEmail(event.target.value)} required></input>
                </div>
                          <div className={styles.formGroup}>
                    <label>Password</label>
                    <input type="password"  placeholder="Ingrese su contraseña. Minimo de 6 caracteres" value={password} onChange={(event)=> setPassword(event.target.value)} required></input>
                </div>
                {error && <p className={styles.errorMessage}>{error}</p>}
                <button type="submit">Enviar</button>

            </form>


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

export default Register;