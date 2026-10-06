import styles from './styles/Form.module.css';

const FormContact = () => {


    return(
        <>
            <section className={styles.sectionForm}>
                <form>
                    <div className={styles.formgroupDouble}>
                        <label htmlFor="name">Nombre Completo</label>
                        <input type="text" name="name"  id="name" required placeholder="p.ej: Agustina Fernandez"></input>      
                    </div>
                    <div className={styles.formgroupDouble}>
                        <label htmlFor="email">Correo Electrónico</label>
                        <input type="email" name="email"  id="email" required placeholder="p.ej: agustina@example.com"></input>      
                    </div>
                    <div className={styles.formgroupDouble}>
                        <label htmlFor="phone">Telefono</label>
                        <input type="tel" name="phone"  id="phone" placeholder="p.ej: 1193849020"></input>      
                    </div>
                    <div className={styles.formgroupDouble}>
                        <label htmlFor="phone">Motivo de Consulta</label>
                        <select id="consult" required defaultValue="Atención al Público">
                            <option value="atencion">Atención al Público</option>
                            <option value="soporte">Soporte</option>
                        </select>
                    </div>
                    <div className={styles.formgroup}>
                        <label htmlFor="phone">Motivo de Consulta</label>
                        <textarea id="opinions" name="opinion" rows="10" cols="50">Ingrese su consulta...</textarea>
                    </div>

                    <button type="submit" className={styles.buttonSend}>Enviar</button>
          

                </form>
            </section>
        
        </>
    )


}

export default FormContact;